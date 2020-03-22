const cheerio = require('cheerio');
const request = require('request');
const moment  = require('moment');

const GITHUB_URL  = "https://github.com/";

const targets = (process.argv[2])? process.argv[2].split(",") : "";

let resultMsg = "";

if(targets.length == 0){
    resultMsg = "ERROR : no targets";
    console.log(resultMsg);
    return;
}

const week = [];

for(let i = 0 ; i < 7; i++){
    week[6-i] = moment().add(-i, 'days').format("YYYY-MM-DD"); 
}

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
                        total += commit;
                    }
                })
            }
            if(total > 0){
                console.log("[" + targets[i] + "] : total commit count : " + total);
            }else{
                console.log("[" + targets[i] + "] : no commit :)");
            }
        }
    });
}

// TODO::코드 함수로 분리
// TODO::기본 사용자 세팅 OR 설정파일에서 불러오기
