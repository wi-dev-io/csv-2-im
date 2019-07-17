const moment = require("moment")
const oracle = require("@wi-dev/oracle")

module.exports = async (csvData,lawson) => {
    try{
        for(line of csvData){
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
        }
        return false 
    } catch(err) {
        return err
    }
     
}