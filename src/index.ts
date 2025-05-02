import express from "express";
import {Request,Response} from "express"

const app = express();
const PORT = 3000;


// Initializing an Endpoint for user to send repo url


app.post('/send-repo-url',async (req:Request,res:Response)=>{
    
    try{
        const repoUrl = req.body.repoUrl;
        
        
        
        
        
        res.json({msg:"Done"})

    }catch(error){
        res.json({error});
    }
    
    
    return;
})






app.listen(PORT,()=>{
    console.log(`Server Started at PORT: ${PORT}`);
});


