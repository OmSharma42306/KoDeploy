const path = require('path');
const fs = require('fs')
const {exec} = require('child_process');
const util = require('util')
const fsp = fs.promises;
const dotenv = require('dotenv')
const mime = require('mime-types');
const Redis = require('ioredis');


const publisher = new Redis(process.env.REDIST_SERVICE_URI);

async function publishLogs(logs){
    publisher.publish(`logs:${projectId}`,JSON.stringify({logs}));
}   

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
        publishLogs(`Running Command ! : ${command}`)
        const {stdout,stderr} = await execPromise(command);
        if(stderr){
            console.error("STDERROR",stderr);
            publishLogs(`STDERROR ${stderr}`)
            return;
        }
        
        console.log("STDOUT: ");
        
        return stdout;
    }catch(error){
        console.error(error);
        publishLogs(error);
    }
}


async function uploadToS3(filesPath,projectId){
    const distContents = fs.readdirSync(filesPath,{recursive:true});

    for(const file of distContents){
        const fullPath = path.join(filesPath,file);
        
        if(fs.lstatSync(fullPath).isDirectory()) continue;
        // upload to s3 stuff..
        console.log("Upload to S3 this File : ",file);
        // publishing to redis
        publishLogs(`Upload to S3 this File : ${file}`,);

        const fileStream = fs.createReadStream(fullPath);
        const s3Key = `__outputs/${projectId}/${file}`
        publishLogs(`FILE FULL PATH : ${fullPath}`)
        console.log("OMSSSSSSSSSSSSs",fullPath)
        const uploadCommand = new PutObjectCommand({
            Bucket:process.env.S3_BUCKET_NAME,
            Key:s3Key,
            Body:fileStream,
            ContentType: mime.lookup(fullPath)

        })

        await s3Client.send(uploadCommand);
        console.log(`${file} uploaded Success !`);
        publishLogs(`${file} uploaded Success !`)
    }
    console.log("Files Uploaded Successfully!");
    publishLogs("Files Uploaded Successfully!")

}


 const projectId = process.env.projectId;
async function readContent(mainDir){
    
    // just checking for correct files.
    await fs.readdir(mainDir,(err,files)=>{
        if(err){
            console.log(err);
            publishLogs(err)
        }        
        console.log(files)
        publishLogs(files)
    });

    process.chdir(mainDir)
    
    publishLogs("Build Started ....")
    await runCommnad(`ls`);    
    await runCommnad(`ls`);
    await runCommnad("npm install");
    await runCommnad('npx update-browserslist-db@latest')
    await runCommnad("npm run build");  

    const distPath = path.join(mainDir,"dist");
   
    await uploadToS3(distPath,projectId);

}


readContent(mainDir);






