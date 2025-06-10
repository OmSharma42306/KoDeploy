const express = require('express');
const randomSlug = require('random-word-slugs');
const dotenv = require('dotenv')
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
                        {name:"projectId",value:projectId}

                    ]
                }
            ]
        }
    });

    await ecsClient.send(command);

    res.json({msg:"Deployment Started!",url : `http://${projectId}.localhost:8000/`})

})



app.listen(PORT,()=>console.log(`Server Started at ${PORT}`))