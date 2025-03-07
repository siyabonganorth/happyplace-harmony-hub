
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LucideLoader2 } from 'lucide-react';
import Logo from './Logo';
import { DEMO_CREDENTIALS } from '../data/mockUsers';
import { Card, CardContent } from './ui/card';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password');
  };

  return (
    <div className="w-full max-w-md px-8 py-10 mx-auto glass-panel animate-fade-in">
      <div className="text-center mb-8">
        <Logo size="lg" className="justify-center mb-6" />
        <h2 className="text-lg text-slate-600 font-medium">Welcome to VYBE Cartel</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="youremail@vybecartel.com"
            className="glass-input"
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <a href="#" className="text-xs text-vybe hover:underline underline-animated">
              Forgot password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="glass-input"
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-vybe hover:bg-vybe/90 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
      
      <div className="mt-8">
        <h3 className="text-center text-sm font-medium mb-4">Demo Accounts</h3>
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto">
              {DEMO_CREDENTIALS.map((cred, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  size="sm" 
                  className="justify-start"
                  onClick={() => handleDemoLogin(cred.email)}
                >
                  <div className="truncate">
                    <span className="font-medium">{cred.role}</span>
                    <span className="text-xs ml-2 opacity-70">{cred.email}</span>
                  </div>
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Password for all demo accounts: <span className="font-medium">password</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
