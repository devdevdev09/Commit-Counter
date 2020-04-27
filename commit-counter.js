const cheerio = require("cheerio");
const request = require("request");
const moment  = require("moment");
const jparser = require("./json-parser");
const fs = require("fs");

const GITHUB_URL  = "https://github.com/";

const targets = (process.argv[2]) ? process.argv[2].split(",") 
                    : (jparser.getJsonData("github")) ? jparser.getJsonData("github").split(",") 
                        : "";

const fileName = "file.txt";
const fileExt = "utf8";

let resultMsg = "";

if(targets.length == 0){
    resultMsg = "ERROR : no targets";
    console.log(resultMsg);
    return;
}

const today = moment().day();

const week = [];

let resultmsg = "";

for(let i = 0 ; i < 7; i++){
    week[6-i] = moment().add(- (i + today), 'days').format("YYYY-MM-DD"); 
}

let saveData = {
    date : week[0] + " ~ " + week[6]
}

// saveData.test = {"test":"tst22"};
// delete saveData.date
// console.log(saveData);

for(let i = 0 ; i < targets.length; i++){
    request(GITHUB_URL + targets[i], function(error, response, body){
        status = response.statusCode;
        
        if(error || status != "200"){
            console.log("[" + targets[i] + "] : error!! STATUS=" + response.statusCode);
        }else{
            const test = cheerio.load(body);
            let total  = 0;
            
            for(let i = 0 ; i < week.length; i++){
                test('[data-date=' + week[i] +']').each(function(){
                    const commit = test(this).data("count");
                    if( commit > 0){
                        total += 1;
                    }
                })
            }
            if(total > 0){
                console.log("[" + targets[i] + "] : total commit count : " + total);
                fileAppend(JSON.stringify({ 
                        date : week[0] + " ~ " + week[6],
                        name : targets[i],
                        count : total
                    }) + ","
                );
            }else{
                console.log("[" + targets[i] + "] : no commit :)");
            }
        }
    });
}

const fileWrite = function(data){
    fs.writeFileSync(fileName, data, fileExt);
}

const fileAppend = function(data){
    fs.appendFile(fileName, data, function(){

    });
}

