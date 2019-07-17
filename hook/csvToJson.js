function csvToJson(file){
    var output = []
    let lines = file.split("\r\n")
    let header = lines[0].split(",")
    var keyObj = {}
    for(key of header){
        keyObj[key] = ""
    }
    for(line of lines.slice(1)){
      let lineData = line.split(",")
      let lineObj = {}
      let idx = 0
      for(column of line){
          lineObj[lines[0][idx]] = column.trim()
      }
      for(key in keyObj){
         lineObj[key] = lineData[idx]
         idx++
        
      }
      if(["#REF!",""].includes(lineData[0])) continue
    
      output.push(lineObj)
    
    }
    return output
}

module.exports = {
    csvToJson
}