
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';

const Login: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // If already authenticated, redirect to dashboard
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-vybe/5 to-slate-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-vybe/10 rounded-full filter blur-3xl opacity-70 animate-float"></div>
        <div className="absolute top-40 -right-20 w-60 h-60 bg-vybe/10 rounded-full filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-40 left-20 w-72 h-72 bg-vybe/10 rounded-full filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-md w-full animate-fade-in">
        <LoginForm />
      </div>
      
      <div className="fixed bottom-4 text-center text-xs text-muted-foreground animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <p>© {new Date().getFullYear()} VYBE Cartel. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;
