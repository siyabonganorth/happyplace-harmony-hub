
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateQuoteButton: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Button 
      onClick={() => navigate('/quotes/create')}
      className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
    >
      <FileText className="mr-2 h-4 w-4" />
      Create Quote
    </Button>
  );
};

export default CreateQuoteButton;
