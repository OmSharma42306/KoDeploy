import { AuthForm } from '@/components/auth/AuthForm';
import { Rocket } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 text-2xl font-bold">
            <Rocket className="h-8 w-8 text-primary" />
            <span>KoDeploy</span>
          </Link>
        </div>
        <AuthForm type="login" />
      </div>
    </div>
  );
}