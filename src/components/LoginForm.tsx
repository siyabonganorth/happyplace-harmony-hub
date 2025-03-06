
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LucideLoader2 } from 'lucide-react';
import Logo from './Logo';

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

  return (
    <div className="w-full max-w-sm px-8 py-10 mx-auto glass-panel animate-fade-in">
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
      
      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>For demo, use:</p>
        <p>Email: admin@vybecartel.com</p>
        <p>Password: password</p>
      </div>
    </div>
  );
};

export default LoginForm;
