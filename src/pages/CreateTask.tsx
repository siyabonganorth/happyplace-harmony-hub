
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '../services/api';
import TaskForm from '../components/tasks/TaskForm';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth } from '../context/AuthContext';

const CreateTask: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hasProjects, setHasProjects] = useState(true);
  
  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: projectsApi.getAll
  });
  
  // Check if there are projects for the user's department
  useEffect(() => {
    if (projects.length > 0 && user) {
      const departmentProjects = projects.filter(p => 
        p.department === user.department || user.role === 'director'
      );
      setHasProjects(departmentProjects.length > 0);
    }
  }, [projects, user]);
  
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Create New Task</h1>
      
      {!hasProjects && (
        <Alert className="mb-6">
          <AlertTitle>No projects found</AlertTitle>
          <AlertDescription>
            Tasks must be associated with a project. Please create a project first.
            <div className="mt-4">
              <Button onClick={() => navigate('/projects/create')}>
                <PlusCircle className="h-5 w-5 mr-2" />
                Create Project
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      <TaskForm />
    </div>
  );
};

export default CreateTask;
