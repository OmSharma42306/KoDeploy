"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Github, 
  GitBranch, 
  Globe, 
  Settings, 
  Rocket, 
  CheckCircle,
  AlertCircle,
  Loader2,
  ExternalLink
} from 'lucide-react';

interface DeployFormProps {
  onDeploy?: (config: DeployConfig) => void;
}

interface DeployConfig {
  repoUrl: string;
  branch: string;
  framework: string;
  buildCommand: string;
  outputDirectory: string;
  environmentVariables: Record<string, string>;
}

const frameworks = [
  { id: 'nextjs', name: 'Next.js', buildCommand: 'npm run build', outputDir: '.next' },
  { id: 'react', name: 'React', buildCommand: 'npm run build', outputDir: 'build' },
  { id: 'vue', name: 'Vue.js', buildCommand: 'npm run build', outputDir: 'dist' },
  { id: 'angular', name: 'Angular', buildCommand: 'ng build', outputDir: 'dist' },
  { id: 'svelte', name: 'Svelte', buildCommand: 'npm run build', outputDir: 'public' },
  { id: 'static', name: 'Static HTML', buildCommand: '', outputDir: '.' },
];

export function DeployForm({ onDeploy }: DeployFormProps) {
  const [repoUrl, setRepoUrl] = useState('');
  const [branch, setBranch] = useState('main');
  const [selectedFramework, setSelectedFramework] = useState('');
  const [buildCommand, setBuildCommand] = useState('');
  const [outputDirectory, setOutputDirectory] = useState('');
  const [envVars, setEnvVars] = useState<Record<string, string>>({});
  const [isValidating, setIsValidating] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [validationStatus, setValidationStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const validateRepo = async (url: string) => {
    if (!url) {
      setValidationStatus('idle');
      return;
    }

    setIsValidating(true);
    
    // Simulate API validation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const isValid = url.includes('github.com') || url.includes('gitlab.com') || url.includes('bitbucket.org');
    setValidationStatus(isValid ? 'valid' : 'invalid');
    setIsValidating(false);
  };

  const handleFrameworkChange = (frameworkId: string) => {
    setSelectedFramework(frameworkId);
    const framework = frameworks.find(f => f.id === frameworkId);
    if (framework) {
      setBuildCommand(framework.buildCommand);
      setOutputDirectory(framework.outputDir);
    }
  };

  const handleDeploy = async () => {
    if (!repoUrl || validationStatus !== 'valid') return;

    setIsDeploying(true);
    
    const config: DeployConfig = {
      repoUrl,
      branch,
      framework: selectedFramework,
      buildCommand,
      outputDirectory,
      environmentVariables: envVars,
    };

    // Simulate deployment
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onDeploy?.(config);
    setIsDeploying(false);
  };

  const addEnvVar = () => {
    const key = `ENV_VAR_${Object.keys(envVars).length + 1}`;
    setEnvVars(prev => ({ ...prev, [key]: '' }));
  };

  const updateEnvVar = (oldKey: string, newKey: string, value: string) => {
    setEnvVars(prev => {
      const updated = { ...prev };
      if (oldKey !== newKey) {
        delete updated[oldKey];
      }
      updated[newKey] = value;
      return updated;
    });
  };

  const removeEnvVar = (key: string) => {
    setEnvVars(prev => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Rocket className="h-5 w-5 text-primary" />
            <span>Deploy New Project</span>
          </CardTitle>
          <CardDescription>
            Import your Git repository and deploy it instantly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Repository URL */}
          <div className="space-y-2">
            <Label htmlFor="repoUrl">Git Repository URL</Label>
            <div className="relative">
              <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="repoUrl"
                placeholder="https://github.com/username/repository"
                value={repoUrl}
                onChange={(e) => {
                  setRepoUrl(e.target.value);
                  validateRepo(e.target.value);
                }}
                className="pl-10 pr-10"
              />
              <div className="absolute right-3 top-3">
                {isValidating && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                {!isValidating && validationStatus === 'valid' && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
                {!isValidating && validationStatus === 'invalid' && (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                )}
              </div>
            </div>
            {validationStatus === 'invalid' && (
              <p className="text-sm text-red-500">
                Please enter a valid Git repository URL
              </p>
            )}
          </div>

          {/* Branch Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              <div className="relative">
                <GitBranch className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="branch"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Framework Detection */}
            <div className="space-y-2">
              <Label>Framework Preset</Label>
              <Select value={selectedFramework} onValueChange={handleFrameworkChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Auto-detect framework" />
                </SelectTrigger>
                <SelectContent>
                  {frameworks.map((framework) => (
                    <SelectItem key={framework.id} value={framework.id}>
                      {framework.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="space-y-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center space-x-2 p-0 h-auto"
            >
              <Settings className="h-4 w-4" />
              <span>Advanced Settings</span>
            </Button>

            {showAdvanced && (
              <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="buildCommand">Build Command</Label>
                    <Input
                      id="buildCommand"
                      placeholder="npm run build"
                      value={buildCommand}
                      onChange={(e) => setBuildCommand(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="outputDir">Output Directory</Label>
                    <Input
                      id="outputDir"
                      placeholder="dist"
                      value={outputDirectory}
                      onChange={(e) => setOutputDirectory(e.target.value)}
                    />
                  </div>
                </div>

                {/* Environment Variables */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Environment Variables</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addEnvVar}>
                      Add Variable
                    </Button>
                  </div>
                  
                  {Object.entries(envVars).map(([key, value]) => (
                    <div key={key} className="flex space-x-2">
                      <Input
                        placeholder="KEY"
                        value={key}
                        onChange={(e) => updateEnvVar(key, e.target.value, value)}
                        className="flex-1"
                      />
                      <Input
                        placeholder="value"
                        value={value}
                        onChange={(e) => updateEnvVar(key, key, e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEnvVar(key)}
                        className="px-2"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Deploy Button */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {validationStatus === 'valid' && (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Repository validated successfully</span>
                </div>
              )}
            </div>
            
            <Button
              onClick={handleDeploy}
              disabled={validationStatus !== 'valid' || isDeploying}
              className="min-w-[120px]"
            >
              {isDeploying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deploying...
                </>
              ) : (
                <>
                  <Rocket className="mr-2 h-4 w-4" />
                  Deploy
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Deployment Preview */}
      {validationStatus === 'valid' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-primary" />
              <span>Deployment Preview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Repository:</span>
                <p className="font-medium truncate">{repoUrl}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Branch:</span>
                <Badge variant="secondary">{branch}</Badge>
              </div>
              {selectedFramework && (
                <>
                  <div>
                    <span className="text-muted-foreground">Framework:</span>
                    <p className="font-medium">
                      {frameworks.find(f => f.id === selectedFramework)?.name}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Build Command:</span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {buildCommand || 'Auto-detected'}
                    </code>
                  </div>
                </>
              )}
              
            </div>
     
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <ExternalLink className="h-4 w-4" />
              <span>Your app will be available at: </span>
              <code className="bg-muted px-2 py-1 rounded">
                https://your-project.kodeploy.app
              </code>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}