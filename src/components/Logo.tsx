
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  variant = 'dark',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  const variantClasses = {
    light: 'text-white',
    dark: 'text-slate-900'
  };

  return (
    <div className={`font-display font-bold flex items-center ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      <span className="bg-vybe text-white px-1.5 py-0.5 rounded mr-1.5">VYBE</span>
      <span className="tracking-tight">Happyplace</span>
    </div>
  );
};

export default Logo;
