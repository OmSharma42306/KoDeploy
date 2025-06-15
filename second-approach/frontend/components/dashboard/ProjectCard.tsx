import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, ExternalLink, GitBranch, Calendar, Activity } from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string;
    status: 'deployed' | 'building' | 'failed';
    url: string;
    branch: string;
    lastDeployed: string;
    framework: string;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed':
        return 'bg-green-500';
      case 'building':
        return 'bg-yellow-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'deployed':
        return 'Ready';
      case 'building':
        return 'Building';
      case 'failed':
        return 'Failed';
      default:
        return 'Unknown';
    }
  };

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors">
            {project.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <ExternalLink className="mr-2 h-4 w-4" />
              Visit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Activity className="mr-2 h-4 w-4" />
              View Deployments
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{project.framework}</Badge>
          <div className="flex items-center space-x-2">
            <div className={`h-2 w-2 rounded-full ${getStatusColor(project.status)}`} />
            <span className="text-sm font-medium">{getStatusText(project.status)}</span>
          </div>
        </div>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <GitBranch className="h-3 w-3" />
            <span>{project.branch}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-3 w-3" />
            <span>{project.lastDeployed}</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="flex-1">
            <ExternalLink className="mr-2 h-3 w-3" />
            Visit
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <GitBranch className="mr-2 h-3 w-3" />
            Deploy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}