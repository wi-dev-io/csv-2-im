const page = () => {
        return {"page": {
          "IC_DocType": "",
          "InvoiceType": "",
          "CompanyNumHdr": "10",
          "CompanyNameHdr": "New Hanover Regional Medical Center",
          "CountryKey": "",
          "LanguageCode": "",
          "LocationCode": "",
          "LocationName": "",
          "PONumber": "",
          "BlanketPONumbers": "",
          "POSeparator": "",
          "POAmount": ".00",
          "POCurrency": "",
          "MatchedPO": "",
          "VendorName": "",
          "VendorID": "",
          "VendorGroup": "",
          "RemitTo": "",
          "VendorAddress": "",
          "VendorStreet1": "",
          "VendorStreet2": "",
          "VendorCity": "",
          "VendorState": "",
          "VendorZipCode": "",
          "VendorLocation": "",
          "VendorLocationName": "",
          "VendorShortName": "",
          "VendorPaymentTerms": "",
          "VendorVAT": "",
          "VendorField1": "",
          "VendorField2": "",
          "VendorCountryCode": "",
          "InvoiceNumber": "",
          "InvoiceDate": "",
          "InvoiceDueDate": "",
          "InvoicePostingDate": "",
          "TotalAmount": ".00",
          "MdseAmount": ".00",
          "APUser": "",
          "EntryDate": "",
          "TaxAmount": ".00",
          "SUTCode": "",
          "SUTCodeName": "",
          "SUTApplyCode": "",
          "SUTApplyCodeName": "",
          "UUTCode": "",
          "TaxExempt": "",
          "FreightAmount": ".00",
          "Terms": "",
          "MiscCharge": ".00",
          "AddlAmt1": ".00",
          "AddlAmt2": ".00",
          "AddlAmt3": ".00",
          "AddlAmt4": ".00",
          "AddlAmt5": ".00",
          "AddlAmt6": ".00",
          "AddlAmt7": ".00",
          "AddlAmt8": ".00",
          "POInvoiceGLTotalAmt": ".00",
          "POAcctAssignmentAmt": ".00",
          "VendorVATID": "",
          "SoldToVATID": "",
          "VATCompliant": "false",
          "Comments": "",
          "PayImmediately": "false",
          "EnclosureFlag": "false",
          "AutomaticTaxCalc": "true",
          "jsonMoreResultsCachedData": "",
          "jsonConfigCachedData": "",
          "jsonPOLineData": "",
          "jsonVendorLoc": "",
          "TempStatus": "",
          "ExportDate": "",
          "HdrValid": "ERR_NOT_VALIDATED",
          "DetailValid": "ERR_NOT_VALIDATED",
          "CustomValid": "",
          "Currency": "",
          "CurrencyName": "",
          "PayGroup": "",
          "SpecialHandling": "",
          "SpecialHandlingName": "",
          "POLineMatching": "false",
          "GLLineMatching": "true",
          "UsingPct": "",
          "Hdr1": "",
          "Hdr2": "",
          "Hdr3": "",
          "Hdr4": "",
          "Hdr5": "",
          "Hdr6": "",
          "Hdr7": "",
          "Hdr8": "",
          "Hdr9": "",
          "Hdr10": "",
          "InvoiceReferenceNumber": "",
          "CreditMemoReason": "",
          "POLineTaxableSelectAll": "",
          "GLLineTaxableSelectAll": "",
          "POLineMatchSelectAll": "",
          "LineCrIndicator": "",
          "POLines": {
              "POLine": poLine()
          },
          "AddlEntries": [],
          "VATSummaryLines": {
            "VATSummaryLine": {
              "VATSummaryCode": "",
              "VATSummaryBase": ".00",
              "VATSummaryAmount": ".00"
            }
          },
          "VATSummaryTotal": ".00"
        }
    }
}

const additionalEntries = () => {
    return {
        "AddlEntry": {
            "Description": "",
            "AOCCode": "",
            "AOCDescription": "",
            "UsingPct": "",
            "GLLineTaxableSelectAll": "",
            "GLLines": [],
                "GLLine": [],
            
        }
    }
  }

  const addGlLine = () => {
    return{
        "GlLines":{
            "MatchGLLine": "false",
            "GLLineTaxable": "",
            "CompanyName": "",
            "CompanyNum": "",
            "GLUnit": "",
            "GLAcct": "",
            "GLAcctDesc": "",
            "SubAcct": "",
            "DeptNumber": "",
            "LineTaxAmount": "",
            "LinePct": "",
            "GLDrCrInd": "",
            "LineQuantity": ".00",
            "LineUOM": "",
            "LinePriceQuantity": ".00",
            "LinePriceUOM": "",
            "LineUOMConvFactor": "",
            "LineAmount": ".00",
            "GLVATJurisdiction": "",
            "GLVATCode": "",
            "GLVATRate": "",
            "GLVATAmount": ".00",
            "Project": "",
            "Activity": "",
            "Category": "",
            "Product": "",
            "AssetProfile": "",
            "GL1": "",
            "GL1Desc": "",
            "GL2": "",
            "GL2Desc": "",
            "GL3": "",
            "GL3Desc": "",
            "GL4": "",
            "GL4Desc": "",
            "GL5": "",
            "GL5Desc": "",
            "GL6": "",
            "GL6Desc": "",
            "GL7": "",
            "GL7Desc": "",
            "GL8": "",
            "GL8Desc": "",
            "GL9": "",
            "GL9Desc": "",
            "GL10": "",
            "GL10Desc": "",
            "GL11": "",
            "GL11Desc": "",
            "GL12": "",
            "GL12Desc": "",
            "GL13": "",
            "GL13Desc": "",
            "GL14": "",
            "GL14Desc": "",
            "GL15": "",
            "GL15Desc": "",
            "GL16": "",
            "GL16Desc": "",
            "GL17": "",
            "GL17Desc": "",
            "GL18": "",
            "GL18Desc": "",
            "GL19": "",
            "GL19Desc": "",
            "GL20": "",
            "GL20Desc": "",
            "GL21": "",
            "GL21Desc": "",
            "GL22": "",
            "GL22Desc": "",
            "GL23": "",
            "GL23Desc": "",
            "GL24": "",
            "GL24Desc": "",
            "ValidGL": "",
            "GLAcct5": "",
            "GLAcct6": "",
            "GLAcct7": "",
            "GLAcct8": "",
            "AcctDataPONumber": "",
            "AcctDataPOLineNumber": "",
            "AcctDataPOItemNumber": "",
            "AcctDataSerialNumber": "",
            "UnplannedAcctAssmt": "",
            "LineDistribPercentage": ""
        }
    }
  }

const poLine = () => {
    return {
        "LinePONumber": "",
        "LineNumber": "",
        "ItemNumber": "",
        "MaterialNumber": "",
        "ItemDescription": "",
        "Quantity": "",
        "UOM": "",
        "POPriceQuantity": "",
        "POPriceUOM": "",
        "UOMConvFactor": "",
        "UnitPrice": "",
        "PriceUnit": "",
        "ExtendedAmount": "",
        "POLVATJurisdiction": "",
        "POLVATCode": "",
        "POLVATRate": "",
        "POLVATAmount": ".00",
        "GRDocument": "",
        "GRFiscalYear": "",
        "GRItem": "",
        "ItemCategory": "",
        "PO1": "",
        "PO2": "",
        "PO3": "",
        "PO4": "",
        "PO5": "",
        "PO6": "",
        "PO7": "",
        "PO8": "",
        "PO9": "",
        "PO10": "",
        "UpdateHost": "false",
        "POLineTaxable": "",
        "PO_LineNumber": "",
        "PO_LinePONumber": "",
        "PO_ItemNumber": "",
        "PO_MaterialNumber": "",
        "PO_ItemDesc": "",
        "PO_Quantity": "",
        "PO_OpenQuantity": "",
        "PO_UOM": "",
        "PO_POPriceQuantity": "",
        "PO_POPriceUOM": "",
        "PO_UOMConvFactor": "",
        "PO_UnitPrice": "",
        "PO_PriceUnit": "",
        "PO_ExtendedAmount": "",
        "PO_OpenAmount": "",
        "PO_VATJurisdiction": "",
        "PO_VATCode": "",
        "PO_VATRate": "",
        "PO_GRDocument": "",
        "PO_GRFiscalYear": "",
        "PO_GRItem": "",
        "PO_ItemCategory": "",
        "PO_PO1": "",
        "PO_PO2": "",
        "PO_PO3": "",
        "PO_PO4": "",
        "PO_PO5": "",
        "PO_PO6": "",
        "PO_PO7": "",
        "PO_PO8": "",
        "PO_PO9": "",
        "PO_PO10": "",
        "ValidPO": "",
        "GLLines": []     
    }
  }

const poGlLine = () => {
    return{
        "GLLine":{
            "GLLineTaxable": "",
            "CompanyName": "",
            "CompanyNum": "",
            "GLUnit": "",
            "GLAcct": "",
            "GLAcctDesc": "",
            "SubAcct": "",
            "DeptNumber": "",
            "LineTaxAmount": "",
            "LinePct": "",
            "GLDrCrInd": "",
            "LineAmount": ".00",
            "GLVATJurisdiction": "",
            "GLVATCode": "",
            "GLVATRate": "",
            "GLVATAmount": ".00",
            "Project": "",
            "Activity": "",
            "Category": "",
            "Product": "",
            "AssetProfile": "",
            "GL1": "",
            "GL1Desc": "",
            "GL2": "",
            "GL2Desc": "",
            "GL3": "",
            "GL3Desc": "",
            "GL4": "0",
            "GL4Desc": "",
            "GL5": "",
            "GL5Desc": "",
            "GL6": "",
            "GL6Desc": "",
            "GL7": "",
            "GL7Desc": "",
            "GL8": "",
            "GL8Desc": "",
            "GL9": "",
            "GL9Desc": "",
            "GL10": "",
            "GL10Desc": "",
            "GL11": "",
            "GL11Desc": "",
            "GL12": "",
            "GL12Desc": "",
            "GL13": "",
            "GL13Desc": "",
            "GL14": "",
            "GL14Desc": "",
            "GL15": "",
            "GL15Desc": "",
            "GL16": "",
            "GL16Desc": "",
            "GL17": "",
            "GL17Desc": "",
            "GL18": "",
            "GL18Desc": "",
            "GL19": "",
            "GL19Desc": "",
            "GL20": "",
            "GL20Desc": "",
            "GL21": "",
            "GL21Desc": "",
            "GL22": "",
            "GL22Desc": "",
            "GL23": "",
            "GL23Desc": "",
            "GL24": "",
            "GL24Desc": "",
            "ValidGL": "",
            "GLAcct5": "",
            "GLAcct6": "",
            "GLAcct7": "",
            "GLAcct8": "",
            "AcctDataPONumber": "",
            "AcctDataPOLineNumber": "",
            "AcctDataPOItemNumber": "",
            "AcctDataSerialNumber": "",
            "UnplannedAcctAssmt": ""
        }  
    }
  }


  module.exports={
      page,
      poLine,
      poGlLine,
      additionalEntries,
      addGlLine
  }