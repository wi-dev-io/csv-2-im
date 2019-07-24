const oracle = require("@wi-dev/oracle")
const fs = require("fs")
const {csvToJson} = require("@wi-dev/csv2json")
const checkError = require("./lib/checkError")
const {modifyPoGlLines, modifyAdditionalEntries, modifyAdditionalGlLines} = require("./lib/jsonHelper")

const moment = require("moment")
const xml2js = require("xml2js")
const fetch = require("node-fetch")
const createInvoiceHeaderMapping = require("./mapping/inv_header_mapping")
var file = fs.readFileSync("C://dev//bestcsv//original.csv", "utf8")
var csvData = csvToJson(file)
var builder = new xml2js.Builder()
var {page, poLine, poGlLine, additionalEntries, addGlLine} = require("./templates/invoice")

var venAddrHolder = []
var invNumHolder = {}
var xmlHolder = {}
var htmlHolder = {}

module.exports = (async () => {
    const lawson = await oracle.connect({
        user: "prod9",
        password: "lawson",
        connectString: "LAWPROD2"
    })
    console.log("Rachel")
    //check folder to see if files exist
    var sourceFolder = fs.readdirSync("X:\\inserver6\\temp\\NHRMC\\Files for ImageNow\\Import\\Physician Fees2")
    for(file of sourceFolder){
        var csvData = readFile(file)
        var errors = await checkError(csvData,lawson)

        for(line of csvData){
            let currentVendorAddr = await setCurrentVendor(line, lawson)
            if(currentVendorAddr.err) throw currentVendorAddr.err

            
            let inv_identifier = `${line["Company"]}.${line["Vendor"]}.${line["Invoice Number"]}`
            let inv_header_mapping = createInvoiceHeaderMapping(line, currentVendorAddr)
        

            if(!invNumHolder[inv_identifier]) createInvoiceHolder(inv_identifier,inv_header_mapping)         

        //this totals the invoice amount
        invNumHolder[inv_identifier].page.TotalAmount += Number(line["Invoice Amount"])
        invNumHolder[inv_identifier].page.POLines.POLine.GLLines.push(modifyPoGlLines(line))
        invNumHolder[inv_identifier].page.AddlEntries.push(modifyAdditionalEntries())
     
    }
    for(inv in invNumHolder){
        var currentInvoice = invNumHolder[inv]
        var invoiceHeader = setHeaderInfo(currentInvoice)
        var invoiceLines = setLineInfo(currentInvoice)

        //create xml push into xmlHolder
        var xml = new xml2js.Builder().buildObject(invNumHolder[inv])
        xmlHolder[inv] = xml
        
        //information to pass to html

        var htmlInvoice = 
            {
                invoiceHeader,
                invoiceLines
            }
  
        htmlHolder[inv] = htmlInvoice

    }
    return {
        json: invNumHolder,
        xml: xmlHolder,
        html: htmlHolder
    }
}
       
    oracle.disconnect(lawson)
})

function readFile(file){
    var currentFile = fs.readFileSync(`X:\\inserver6\\temp\\NHRMC\\Files for ImageNow\\Import\\Physician Fees2\\${file}`, 'utf8')
    return csvToJson(currentFile)
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

        venAddrHolder.push(currentVendorAddr.rows[0]) 
        return currentVendorAddr.rows[0]
    }catch(err){
        return err
    }
}


function createInvoiceHolder (inv_identifier,inv_header_mapping){
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

