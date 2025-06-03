import express from "express";
import {Request,Response} from "express"
import cors from "cors";
import simpleGit from "simple-git";
const app = express();
const PORT = 3000;

// Neccessary Middlewares.
app.use(cors())
app.use(express.json());
// Initializing an Endpoint for user to send repo url

function generate(){
    const subset = "123456789qwertyuiopasdfghjklzxcvbnm";
    const length = 5;
    let id = "";
    for(let i = 0;i<length;i++){
        id += subset[Math.floor(Math.random()*subset.length)]
    }
    return id;  
}


app.post('/send-repo-url',async (req:Request,res:Response)=>{
    
    try{
        const repoUrl = req.body.repoUrl;
        // added generate function get generate id.
        const id = generate();
        await simpleGit().clone(repoUrl,`output/${id}`);
        res.json({msg:"Done"})

    }catch(error){
        res.json({error});
    }
    
    
    return;
})






app.listen(PORT,()=>{
    console.log(`Server Started at PORT: ${PORT}`);
});


