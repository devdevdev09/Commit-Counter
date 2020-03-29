const fs = require("fs");

const FILE_NAME = "info.json";
const FILE_EXT = "UTF8";

const jsonFileRead = function(){
    const fileData = fs.readFileSync(FILE_NAME, FILE_EXT);
    
    if(!fileData){
        return null;
    }

    return JSON.parse(fileData);
}


const getData = function(target){
    const data = jsonFileRead();

    if(!data){
        return null;
    }

    let result = "";

    // TODO::map, reduce, for of ...
    for(obj in data){
        result += data[obj][target];
        if(obj != data.length -1)
            result += ",";
    }

    return result;
}

exports.getJsonData = getData;
