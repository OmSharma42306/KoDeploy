import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Zap, 
  Shield, 
  Globe, 
  BarChart3, 
  GitBranch, 
  Smartphone 
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Deploy in seconds with our optimized build pipeline and global CDN.'
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    description: 'Built-in SSL, DDoS protection, and enterprise-grade security.'
  },
  // {
  //   icon: Globe,
  //   title: 'Global Edge Network',
  //   description: 'Serve your apps from 100+ locations worldwide for optimal performance.'
  // },
  // {
  //   icon: BarChart3,
  //   title: 'Real-time Analytics',
  //   description: 'Monitor your deployments with detailed metrics and insights.'
  // },
  {
    icon: GitBranch,
    title: 'Git Integration',
    description: 'Seamless integration with GitHub, GitLab, and Bitbucket.'
  },
  // {
  //   icon: Smartphone,
  //   title: 'Mobile Optimized',
  //   description: 'Automatic mobile optimization and progressive web app support.'
  // }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to deploy
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features that make deployment simple, fast, and reliable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}