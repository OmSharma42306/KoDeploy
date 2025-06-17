"use client";
import {DeployForm} from '@/components/deploy/DeployForm'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import axios from "axios";

interface DeployConfig {
  repoUrl: string;
  branch: string;
  framework: string;
  buildCommand: string;
  outputDirectory: string;
  environmentVariables: Record<string, string>;
}

export default function DeployPage() {
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'deploying' | 'success' | 'failed'>('idle');
  const [deployedUrl, setDeployedUrl] = useState('');
  const [channelName,setChannelName] = useState<string>('');
  const [socket,setSocket] = useState<WebSocket|null>(null);
  const [logs,setLogs] = useState<any[]>([]);
  useEffect(()=>{
   const socket = new WebSocket('ws://localhost:9001');
    if(!socket){
      return;
    }
  socket.onopen = () =>{
    console.log("Socket connected");
    setSocket(socket);
  }
  },[deploymentStatus]);

  if(!socket) return;
  socket.onmessage = (data:any) =>{

    const dd:any = JSON.parse(data.data);
    const f = JSON.parse(dd.msg);
    setLogs(prevLogs=>[...prevLogs,f])
    

  }  

  const handleDeploy = async (config: DeployConfig) => {
    setDeploymentStatus('deploying');
    socket?.send(JSON.stringify({"subscibe":"OmkaChannel"}));
    const response = await axios.post(`http://localhost:9000/deploy-project`,{repoUrl:config.repoUrl});
    
    console.log(response.data);
  
    setTimeout(() => {
      setDeploymentStatus('success');
        setDeployedUrl(response.data.url);
    }, 62000);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container py-8">
        <div className="space-y-8">
          {/* <div>
            <h1 className="text-3xl font-bold">Deploy New Project</h1>
            <p className="text-muted-foreground mt-2">
              Import your Git repository and deploy it to the edge in seconds.
            </p>
          </div> */}

          {deploymentStatus === 'idle' && (
            <DeployForm onDeploy={handleDeploy} />
          )}

          {deploymentStatus === 'deploying' && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-yellow-500 animate-spin" />
                  <span>Deploying Your Project</span>
                </CardTitle>
                <CardDescription>
                  Please wait while we build and deploy your application...
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Repository cloned</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Dependencies installed</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-yellow-500 animate-spin" />
                      <span className="text-sm">Building application...</span>
                    </div>
                    <div className="flex items-center space-x-2 opacity-50">
                      <div className="h-4 w-4 rounded-full border-2 border-muted" />
                      <span className="text-sm text-muted-foreground">Deploying to edge</span>
                    </div>
                  </div>
                    {/*  Realtime Log Viewer */}
        <div className="mt-4 bg-black text-green-400 text-xs rounded p-3 max-h-72 overflow-y-auto font-mono">
          {logs.length === 0 ? (
            <p className="text-muted-foreground">Waiting for logs...</p>
          ) : (
            logs.map((log, index) => (
              <div key={index}>{log.logs}</div>
            ))
          )}
        </div>
                </div>
              </CardContent>
            </Card>
          )}

          {deploymentStatus === 'success' && (
            <Card className="max-w-2xl mx-auto border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-700 dark:text-green-300">
                  <CheckCircle className="h-5 w-5" />
                  <span>Deployment Successful!</span>
                </CardTitle>
                <CardDescription className="text-green-600 dark:text-green-400">
                  Your application has been deployed and is now live.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border">
                    <p className="text-sm text-muted-foreground mb-2">Your application is live at:</p>
                    <a 
                      href={deployedUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      {deployedUrl}
                    </a>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Build Time:</span>
                      <p className="font-medium">2m 34s</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Deploy Time:</span>
                      <p className="font-medium">12s</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {deploymentStatus === 'failed' && (
            <Card className="max-w-2xl mx-auto border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-700 dark:text-red-300">
                  <AlertCircle className="h-5 w-5" />
                  <span>Deployment Failed</span>
                </CardTitle>
                <CardDescription className="text-red-600 dark:text-red-400">
                  There was an error during the deployment process.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border">
                    <p className="text-sm font-medium mb-2">Error Details:</p>
                    <code className="text-xs text-red-600 dark:text-red-400">
                      Build failed: Module not found
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}