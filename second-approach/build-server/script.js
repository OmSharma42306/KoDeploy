const path = require('path');
const fs = require('fs')
const mainDir = path.join(__dirname,"output");
const targetPath = `/home/app/build`
async function readContent(){
    console.log("i am in")
    await fs.readdir(mainDir,(err,files)=>{
        if(err){
            console.log(err);
        }
        console.log("CONTENTS : ",files);
        
    });
    
}

console.log("MAIN DIR ",mainDir);

readContent(mainDir);






