var {page, poLine, poGlLine, additionalEntries, addGlLine} = require("../templates/invoice")



const modifyPoGlLines = (line) => {
    let jsonPoGlLine = poGlLine()
    jsonPoGlLine.GLLine.GL2 = line["Dept"]
    jsonPoGlLine.GLLine.GL1 = line["GL Code"]
    jsonPoGlLine.GLLine.LineAmount = line["Invoice Amount"]
    
    return jsonPoGlLine
}

const modifyAdditionalEntries = () => {
    let jsonAddlEntries = additionalEntries()
    jsonAddlEntries.AddlEntry.GLLines.push(modifyAdditionalGlLines)
    return jsonAddlEntries
}

const modifyAdditionalGlLines = () => {
    let jsonAddGlLines = addGlLine()

    return jsonAddGlLines
}
module.exports = {modifyPoGlLines, modifyAdditionalEntries, modifyAdditionalGlLines}


