const express = require('express');
const randomSlug = require('random-word-slugs');
const dotenv = require('dotenv')
const {WebSocketServer} = require('ws');
const Redis = require('ioredis')
const cors = require('cors');

dotenv.config();
const {RunTaskCommand,ECSClient} = require('@aws-sdk/client-ecs')

const ecsClient =  new ECSClient({
    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
    }
})


const app = express();
const PORT = 9000;

app.use(express.json())
app.use(cors())

app.post('/deploy-project',async (req,res)=>{
    
    const repoUrl = req.body.repoUrl;
    const projectId = randomSlug.generateSlug(4);
    console.log(projectId);

    // ECS STUFF

    const command = new RunTaskCommand({
        cluster:process.env.cluster,
        taskDefinition:process.env.taskDefinition,
        launchType:"FARGATE",
        networkConfiguration:{
            awsvpcConfiguration:{
                subnets:process.env.subnets.split(','),
                assignPublicIp:"ENABLED"
            }
        },
        overrides:{
            containerOverrides:[
                {
                    name:process.env.imageName,
                    environment:[
                        {name:"GIT_REPO_URL" , value:repoUrl},
                        {name:"projectId",value:projectId},
                        {name:"REDIS_SERVICE_URI",value:process.env.REDIS_SERVICE_URI}
                    ]
                }
            ]
        }
    });

    await ecsClient.send(command);

    res.json({msg:"Deployment Started!",url : `http://${projectId}.localhost:8000/`})

})



app.listen(PORT,()=>console.log(`Server Started at ${PORT}`))


// Redis Subscriber 

const subscriber = new Redis(process.env.REDIS_SERVICE_URI)

// socket server

const socketServer = new WebSocketServer({port:9001});

let subscibeChannel;
socketServer.on('connection',(ws)=>{
    // console.log("Client",ws);
    ws.on('error',console.error);

    ws.on('message',(data)=>{

        const {subscibe} = JSON.parse(data);
        const channel = subscibe
        console.log("Channel : ",channel);
        subscibeChannel = ws;   
        ws.send(`Subscribed to ${channel}`);
    })

     ws.send('hiiii')
})


async function initRedisSubsciber(){
    subscriber.psubscribe('logs:*')
    subscriber.on('pmessage',(pattern,channel,message)=>{
        // send that message to 
        console.log("Channel name",channel)
        console.log("message: ",message);
        // console.log("Subscribe Channel : ",subscibeChannel);
        subscibeChannel.send(JSON.stringify({msg:message}));
    })
}

initRedisSubsciber();