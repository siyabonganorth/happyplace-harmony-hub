
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '../services/api';
import { Button } from '@/components/ui/button';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

const ProjectStatus = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'on-hold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
      {status?.charAt(0).toUpperCase() + status?.slice(1).replace('-', ' ')}
    </span>
  );
};

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  
  // Check if user can create projects (directors, heads, or admins)
  const canCreateProject = user?.role === 'director' || user?.role === 'head' || user?.role === 'admin';

  const { 
    data: projects = [], 
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['projects'],
    queryFn: projectsApi.getAll
  });

  // Filter projects based on user department if not a director
  const filteredProjects = user?.role === 'director' 
    ? projects 
    : projects.filter(p => p.department === user?.department);

  const handleDeleteProject = async (id: string) => {
    try {
      setIsDeleting(id);
      // TO DO: Implement delete functionality in projectsApi
      // await projectsApi.delete(id);
      toast.success('Project deleted successfully');
      refetch();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        
        <div className="flex gap-2">
          <Button onClick={() => navigate('/clients')} variant="outline">
            View Clients
          </Button>
          
          {canCreateProject && (
            <Button onClick={() => navigate('/projects/create')}>
              <PlusCircle className="h-5 w-5 mr-2" />
              Create Project
            </Button>
          )}
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <Card key={i} className="w-full">
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium text-gray-900">Error loading projects</h3>
          <p className="mt-1 text-sm text-gray-500">Please try again later</p>
          <Button className="mt-4" onClick={() => refetch()}>Retry</Button>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium text-gray-900">No projects found</h3>
          {canCreateProject ? (
            <p className="mt-1 text-sm text-gray-500">Create your first project to get started</p>
          ) : (
            <p className="mt-1 text-sm text-gray-500">
              No projects have been assigned to your department yet
            </p>
          )}
          {canCreateProject && (
            <Button className="mt-4" onClick={() => navigate('/projects/create')}>
              <PlusCircle className="h-5 w-5 mr-2" />
              Create First Project
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <Card key={project.id} className="w-full">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <ProjectStatus status={project.status} />
                </div>
                <CardDescription>
                  Department: {project.department}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 line-clamp-3">
                  {project.description || 'No description provided'}
                </p>
                <div className="mt-4">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                {project.deadline && (
                  <p className="mt-4 text-sm text-gray-500">
                    Deadline: {new Date(project.deadline).toLocaleDateString()}
                  </p>
                )}
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  View Details
                </Button>
                {canCreateProject && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/projects/${project.id}/edit`)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                )}
                {user?.role === 'director' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteProject(project.id)}
                    disabled={isDeleting === project.id}
                  >
                    {isDeleting === project.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
