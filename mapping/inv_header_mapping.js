function createInvoiceHeaderMapping(line, currentVendorAddr){
    const mapping = [
        {
            data_source:line,
            source_field:"Vendor",
            output_field:"VendorID"
        },
        {
            data_source:line,
            source_field:"Header Vendor Name",
            output_field:"VendorName"
        },
        {
            data_source:line,
            source_field:"Company",
            output_field:"CompanyNumHdr"
        },
        {
            data_source:line,
            source_field:"Invoice Date",
            output_field:"InvoiceDate"
        },
        {
            data_source:line,
            source_field:"Remit",
            output_field:"RemitTo"
        },
        {
            data_source:line,
            source_field:"Header Vendor Name",
            output_field:"Vendor Name"
        },
        {
            data_source:line,
            source_field:"Invoice Number",
            output_field:"InvoiceNumber"
        },
        {
            data_source:currentVendorAddr,
            source_field:"venNum",
            output_field:"Vendor"
        },
        {
            data_source:currentVendorAddr,
            source_field:"ADDR1",
            output_field:"VendorStreet1"
        },
        {
            data_source:currentVendorAddr,
            source_field:"ADDR2",
            output_field:"VendorStreet2"
        },
        {
            data_source:currentVendorAddr,
            source_field:"CITY_ADDR5",
            output_field:"VendorCity"
        },
        {
            data_source:currentVendorAddr,
            source_field:"STATE_PROV",
            output_field:"VendorState"
        },
        {
            data_source:currentVendorAddr,
            source_field:"POSTAL_CODE",
            output_field:"VendorZipCode"
        },
        {
            output_field:"InvoiceType",
            value:"nopo"
        },
        {
            output_field:"Amount",
            value:0
        },
        {
            output_field:"CompanyNameHdr",
            function_to_run:setCompanyName
        }
       
    ]   
    return mapping
}

function setCompanyName(CoNum){
    if(CoNum == "10"){
        return "New Hanover Regional Medical Center"
    }
    else if(CoNum == "50"){
        return "Pender Memorial Hospital"
    }
    else if (CoNum == "25"){
        return "Physicians Quality Partners"
    }
    else if (CoNum == "20"){
        return "Carolina Healthcare Associates"
    }
    else if (CoNum == "60"){
        return "NHRMC - Home Care"
    }
}

module.exports = createInvoiceHeaderMapping