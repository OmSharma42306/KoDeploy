const path = require('path');
const fs = require('fs')
const {exec} = require('child_process');
const util = require('util')
const fsp = fs.promises;
const dotenv = require('dotenv')
const {S3Client,PutObjectCommand} = require('@aws-sdk/client-s3');

dotenv.config();

console.log(process.env.AWS_ACCESS_KEY_ID);

const s3Client = new S3Client({
    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
    }
})


const execPromise = util.promisify(exec)
const mainDir = path.join(__dirname,"output");

async function runCommnad(command){
    try{
        console.log("Running Command ! : ",command);
        const {stdout,stderr} = await execPromise(command);
        if(stderr){
            console.error("STDERROR",stderr);
            return;
        }
        
        console.log("STDOUT: ");
        return stdout;
    }catch(error){
        console.error(error);
    }
}


async function uploadToS3(filesPath){
    const distContents = fs.readdirSync(filesPath,{recursive:true});

    for(const file of distContents){
        console.log("File : ",file);
        const fullPath = path.join(filesPath,file);
        if(fs.lstatSync(fullPath).isDirectory()) continue;
        // upload to s3 stuff..
        console.log("Upload to S3 this File : ",file);
        
        const fileStream = fs.createReadStream(fullPath);
        
        const uploadCommand = new PutObjectCommand({
            Bucket:process.env.S3_BUCKET_NAME,
            Key:file,
            Body:fileStream,

        })

        await s3Client.send(uploadCommand);
        console.log(`${file} uploaded Success !`);
    }
    console.log("Files Uploaded Successfully!");

}



async function readContent(mainDir){
    console.log("i am in")
    await fs.readdir(mainDir,(err,files)=>{
        if(err){
            console.log(err);
        }
        console.log("CONTENTS : ",files);
        
    });

    process.chdir(mainDir)
    console.log("CURRENT WKI DIR : ",process.cwd());
    
    await runCommnad(`ls`);    
    await runCommnad(`ls`);
    await runCommnad("npm install");
    await runCommnad('npx update-browserslist-db@latest')
    await runCommnad("npm run build");  

    const distPath = path.join(mainDir,"dist");
    console.log("DIST PATH : ",distPath);
    await uploadToS3(distPath);

}

console.log("MAIN DIR ",mainDir);

readContent(mainDir);






