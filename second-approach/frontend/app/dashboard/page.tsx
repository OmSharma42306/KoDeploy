"use client";

import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Button } from '@/components/ui/button';
import { Plus, Zap, Globe, BarChart3, Clock } from 'lucide-react';

const projects = [
  {
    id: '1',
    name: 'my-awesome-app',
    description: 'A modern web application built with Next.js and TypeScript',
    status: 'deployed' as const,
    url: 'https://my-awesome-app.kodeploy.com',
    branch: 'main',
    lastDeployed: '2 hours ago',
    framework: 'Next.js'
  },
  {
    id: '2',
    name: 'portfolio-site',
    description: 'Personal portfolio website showcasing my work',
    status: 'building' as const,
    url: 'https://portfolio-site.kodeploy.com',
    branch: 'main',
    lastDeployed: '1 day ago',
    framework: 'React'
  },
  {
    id: '3',
    name: 'api-service',
    description: 'RESTful API service for mobile application',
    status: 'failed' as const,
    url: 'https://api-service.kodeploy.com',
    branch: 'development',
    lastDeployed: '3 days ago',
    framework: 'Node.js'
  },
  {
    id: '4',
    name: 'blog-platform',
    description: 'A full-featured blogging platform with CMS',
    status: 'deployed' as const,
    url: 'https://blog-platform.kodeploy.com',
    branch: 'main',
    lastDeployed: '1 week ago',
    framework: 'Nuxt.js'
  }
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, John</h1>
              <p className="text-muted-foreground mt-2">
                Here's what's happening with your projects today.
              </p>
            </div>
            <Button className="mt-4 md:mt-0">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Projects"
              value="12"
              description="+2 from last month"
              icon={<Globe className="h-4 w-4 text-muted-foreground" />}
            />
            <StatsCard
              title="Active Deployments"
              value="8"
              description="Currently running"
              icon={<Zap className="h-4 w-4 text-muted-foreground" />}
            />
            <StatsCard
              title="This Month"
              value="45"
              description="Total deployments"
              icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
            />
            <StatsCard
              title="Avg. Build Time"
              value="2.4m"
              description="-30s from last week"
              icon={<Clock className="h-4 w-4 text-muted-foreground" />}
            />
          </div>

          {/* Projects Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Recent Projects</h2>
              <Button variant="outline">View All</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}