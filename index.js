const fs = require("fs")
const moment = require("moment")
const xml2js = require("xml2js")
const fetch = require("node-fetch")
const {csvToJson} = require("./hook/csvToJson")
const oracle = require("./packages/oracle")
const createInvoiceHeaderMapping = require("./mapping/inv_header_mapping")
var file = fs.readFileSync("C://dev//bestcsv//original.csv", "utf8")
var apInv = fs.readFileSync("C://dev//bestcsv//AP_Invoice.xml", "utf8")
var csvData = csvToJson(file)
var parser = new xml2js.Parser({explicitArray:false})
var builder = new xml2js.Builder()
var {page, poLine, poGlLine, additionalEntries, addGlLine} = require("./templates/invoice")
// parser.parseString(apInv,(err,data)=>{
//     if(err) console.log(err)
//     fs.writeFileSync("C://dev//bestcsv//AP_CSV.json", JSON.stringify(data, null, 2))
// })
var csvJson = page()
var venAddrHolder = []
var invNumHolder = {}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

main()
async function main(){
    var lawson = await oracle.connect({
        user: "prod9",
        password: "lawson",
        connectString: "LAWPROD2" 
    })

    for(line of csvData){
       
       
        //ETHANS VALIDITY CHECKS
        var errors = checkErrorStatus(line,lawson)
        if (errors.err){
            console.log("Errors found. Stopping script")
            return
        }
            

        //checking if vendor exists and pulling back vendor info
        

        let currentVendorAddr = await setCurrentVendor(line, lawson)
        venAddrHolder.push(currentVendorAddr)
        if (currentVendorAddr.err){
            console.log("Errors found. Stopping script")
            return
        }


        let inv_identifier = `${line["Company"]}.${line["Vendor"]}.${line["Invoice Number"]}`
        let inv_header_mapping = createInvoiceHeaderMapping(line, currentVendorAddr)
        

        if(!invNumHolder[inv_identifier]){ 
            invNumHolder[inv_identifier] = page()
            for(map of inv_header_mapping){
                if (map.value){
                    invNumHolder[inv_identifier].page[map.output_field] = map.value
                }

                if (map.function_to_run){
                    invNumHolder[inv_identifier].page[map.output_field] = map.function_to_run(line["Company"])
                }

                if (map.source_field){
                    invNumHolder[inv_identifier].page[map.output_field]= map.data_source[map.source_field]
                }

            }
        }
        //console.log(invNumHolder)
       
               
       //check invoice object holder
       if(!invNumHolder[`${line["Company"]}.${line["Vendor"]}.${line["Invoice Number"]}`]){
        console.log('here')        
    }

    //setting the invoice info to be used for xml
    invNumHolder[`${line["Company"]}.${line["Vendor"]}.${line["Invoice Number"]}`].page.TotalAmount += Number(line["Invoice Amount"])
    
        let jsonPoGlLine = poGlLine()
        let jsonAddlEntries = additionalEntries()
        let jsonAddGlLines = addGlLine()
        jsonPoGlLine.GLLine.GL2 = line["Dept"]
        jsonPoGlLine.GLLine.GL1 = line["GL Code"]
        jsonPoGlLine.GLLine.LineAmount = line["Invoice Amount"]
        invNumHolder[`${line["Company"]}.${line["Vendor"]}.${line["Invoice Number"]}`].page.POLines.POLine.GLLines.push(jsonPoGlLine)
        invNumHolder[`${line["Company"]}.${line["Vendor"]}.${line["Invoice Number"]}`].page.AddlEntries.push(jsonAddlEntries)
        jsonAddlEntries.AddlEntry.GLLines.push(jsonAddGlLines)    
        
        fs.writeFileSync("C://dev//bestcsv//next.json", JSON.stringify(csvJson,null,2))
        var xml = builder.buildObject(csvJson);
        fs.writeFileSync(`C://dev//bestcsv//${csvJson.page.InvoiceNumber}.xml`, xml)
       

        
    }
    for(inv in invNumHolder){
        var currentInvoice = invNumHolder[inv]
        var invoiceHeader = setHeaderInfo(currentInvoice)
        console.log(invoiceHeader)
        var invoiceLines = setLineInfo(currentInvoice)
        console.log(invoiceLines)

        //information to pass to html
        var htmlInvoice = [
            {
                invoiceHeader,
                invoiceLines
            }
        ]
        
        //pushing xml info into ImageNow
        var xml = builder.buildObject(invNumHolder[inv]);
        fs.writeFileSync(`C://dev//bestcsv//${csvJson.page.InvoiceNumber}.xml`, xml)
        let response = await fetch('https://imgnwweb1/integrationserver/v1/document',
        {
            method:'POST',
            headers:{
                'X-IntegrationServer-Username':'an691894',
                'X-IntegrationServer-Password':'TncmscAi69!$',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                info:{
                    keys:{
                       drawer: "Accounts Payable",
                       field1: '10',
                       field2: 'EK TEST',
                       field3: '',
                       field4: '',
                       field5: '',
                       documentType: 'Invoice'
                    }
                }
            })
        })
        //console.log(response)
        var docId = ""
        if(response.headers.get('x-integrationserver-error-message')){
            console.log(response.headers.get('x-integrationserver-error-message'))
            return
        } else {
            docId = response.headers.get('location').split('https://imgnwweb1.nhrmc.local/integrationserver/v1/document/')[1]
        } 
        var formResponse = await fetch(`https://imgnwweb1/integrationserver/v1/form/301YT9M_00005C33P00000L/document/${docId}?version=1`, {method: "PUT", headers:{'X-IntegrationServer-Username': 'an691894','X-IntegrationServer-Password': 'TncmscAi69!$', 'Content-Type': 'application/octet-stream'}, body: Buffer.from(xml).toString()}) 
        fs.writeFile('AP_Invoice.xml', currentInvoice)
        

    }
}

async function checkErrorStatus(line,lawson){
    try{
        //is this a valid date?
        if(!moment(line["Invoice Date"],'MM/DD/YYYY').isValid()) return {err: `Invalid Date of ${line["Invoice Date"]} was found. Please correct.`}
        if(moment().add(10,'days').format() < moment(line["Invoice Date"],'MM/DD/YYYY').format()) return {err: `Invoice Date of ${line["Invoice Date"]} is greater than 10 days`}
        
        //checking if the Department or account is blank
        if(line["Dept"]=== "" || line["GL Code"]===""){
            return{err: 'Account information is incomplete.'}
        }

        //checking if the Department or account doesn't exist
        if(!line["Dept"] || !line["GL Code"]){
            return{err: 'Account information is missing'}
        }

        let thisDept = await oracle.query(lawson, "select acct_unit, account, company ACTIVE_STATUS from GLMASTER where trim(company)=:co and trim(acct_unit)=:dept and trim(account)=:GL_code",[line["Company"],line["Dept"],line["GL Code"]])

        //does more than one department come back
        if(thisDept.rows.length > 1){
            return{err: "There cannot be more than one department"}
        }

        //this department and account combination deosn't exist
        if(thisDept.rows.length < 1){
            return{err: "This department doesn't exist"}
        }

        //Does this invoice number already exist in Lawson
        let dupInvoice = await oracle.query(lawson,"select invoice, VENDOR from apinvoice where trim(INVOICE)=:inv and trim(VENDOR)=:vendor",
        [line["Invoice Number"],line["Vendor"]])

        if(dupInvoice.rows.length !== 0){
            return{err: 'Invoice Number ${line["Invoice Number"]} already exists'}
        }


        return false
    } catch(err){
        return err
    }
     
}

async function setCurrentVendor(line, lawson){
    try{
        let currentVendorAddr
        
        if(venAddrHolder.length > 0){
            currentVendorAddr = venAddrHolder.find(a => a.VENDOR.trim() == line["Vendor"] && a.LOCATION_CODE.trim() == line["Remit"])
        }

        if(!currentVendorAddr && line["Remit"].length > 0) {
            currentVendorAddr = await oracle.query(lawson,"select * from apvenaddr where trim(apvenaddr.vendor)=:vendor and trim(LOCATION_CODE)=:remit",[line["Vendor"], line["Remit"]])
        }else{
            currentVendorAddr = await oracle.query(lawson,"select * from apvenaddr where trim(apvenaddr.vendor)=:vendor and trim(LOCATION_CODE) IS NULL OR trim(LOCATION_CODE) = ''",[line["Vendor"]])
        }
        if(currentVendorAddr.rows.length > 1){
            return{err: 'There is more than one vendor'}
        }
        
        if(currentVendorAddr.rows.length < 1){
            return{err: `Vendor ${line["Vendor"]} does not exist`}
        }

        return currentVendorAddr.rows[0]
    }catch(err){
        return err
    }
}

function setHeaderInfo(inv){
    var invoiceHeader = {
        VendorName: inv.page.VendorName,
        VendorStreet1: inv.page.VendorStreet1,
        VendorStreet2: inv.page.VendorStreet2,
        VendorCity: inv.page.VendorCity,
        VendorState: inv.page.VendorState,
        VendorZipCode: inv.page.VendorZipCode,
        TotalAmount: inv.page.TotalAmount,
        InvoiceNumber: inv.page.InvoiceNumber
    }
    return invoiceHeader
}

function setLineInfo(inv){
    var invLines = inv.page.POLines.POLine.GLLines

    if(inv.page.POLines.POLine.length>1){
        return {err: 'There is more than one PO Line'}
    }

    for (inv of invLines){        
        var invoiceLines = [
                {
                    department: inv.GLLine.GL2,
                    glAccount: inv.GLLine.GL1,
                    lineAmount: inv.GLLine.LineAmount
                }
            ]
    }
    return invoiceLines
}





