const express = require('express');
const httpProxy = require('http-proxy');
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config();

const BASE_PATH = process.env.BASE_PATH;

console.log("BASE",BASE);
const PORT = 8000;

const app = express();
app.use(bodyParser.json())

const proxy = httpProxy.createProxy();


app.use((req,res)=>{
    const hostName = req.hostname;
    const subdomain = hostName.split('.')[0];
    console.log("HOSTNAME : ",hostName)
    console.log("SUBDOMAIN: ",subdomain)
    
    const resolvesTo = `${BASE_PATH}/${subdomain}`
    
    console.log("Resolves To : ",resolvesTo)
    return proxy.web(req,res,{target:resolvesTo,changeOrigin:true})
    
})

proxy.on('proxyReq', (proxyReq, req, res) => {
    const url = req.url;
    if (url === '/')
        proxyReq.path += 'index.html'

})


app.listen(PORT,()=>console.log(`Proxy Running at ${PORT}`));
