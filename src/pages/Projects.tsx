
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '../services/api';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Check if user can create projects (directors, heads, or admins)
  const canCreateProject = user?.role === 'director' || user?.role === 'head' || user?.role === 'admin';

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        
        {canCreateProject && (
          <Button onClick={() => navigate('/projects/create')}>
            <PlusCircle className="h-5 w-5 mr-2" />
            Create Project
          </Button>
        )}
      </div>
      
      {/* Projects content would go here */}
      <div>
        <p>Projects will be displayed here...</p>
      </div>
    </div>
  );
};

export default Projects;
