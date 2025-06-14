"use client";

import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      
      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium">
              ✨ Introducing KoDeploy
            </div>
          </div>
          
          <h1 className="mb-6 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Deploy apps{' '}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              instantly
            </span>
          </h1>
          
          <p className="mx-auto mb-8 max-w-2xl text-lg md:text-xl text-muted-foreground">
            Build, deploy, and scale your applications with zero configuration. 
            From hobby projects to enterprise applications, KoDeploy has you covered.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" asChild className="text-base px-8">
              <Link href="/signup">
                Start Deploying
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8">
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>

          {/* Dashboard Preview */}
          <div className="relative mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-xl border bg-background/50 backdrop-blur shadow-2xl">
              <div className="p-4 border-b">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-24 rounded-lg bg-muted animate-pulse" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}