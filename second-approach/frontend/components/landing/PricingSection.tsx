import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for hobby projects and getting started',
    features: [
      '3 projects',
      '100 GB bandwidth',
      'Community support',
      'Basic analytics',
      '10 team members'
    ],
    popular: false
  },
  {
    name: 'Pro',
    price: '$20',
    description: 'Best for professional developers and small teams',
    features: [
      'Unlimited projects',
      '1 TB bandwidth',
      'Priority support',
      'Advanced analytics',
      'Unlimited team members',
      'Custom domains',
      'Environment variables'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large teams and organizations',
    features: [
      'Everything in Pro',
      'Unlimited bandwidth',
      'SLA guarantee',
      'Dedicated support',
      'Advanced security',
      'SSO integration',
      'Custom infrastructure'
    ],
    popular: false
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-muted/50">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that's right for you. All plans include our core features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-muted-foreground">/month</span>}
                </div>
                <CardDescription className="mt-4">{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full mt-6" 
                  variant={plan.popular ? 'default' : 'outline'}
                  asChild
                >
                  <Link href="/signup">
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}