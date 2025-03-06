
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { CalendarDays, ChevronRight } from 'lucide-react';
import { Project } from '../../types';
import { projects, users } from '../../data/mockData';
import { format } from 'date-fns';

interface ProjectCardProps {
  project: Project;
}

const statusColors = {
  'planning': 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-amber-100 text-amber-800',
  'review': 'bg-purple-100 text-purple-800',
  'completed': 'bg-green-100 text-green-800',
  'on-hold': 'bg-gray-100 text-gray-800'
};

const departmentColors = {
  'Audiophiles': 'bg-red-100 text-red-800',
  'Vismasters': 'bg-blue-100 text-blue-800',
  'adVYBE': 'bg-green-100 text-green-800'
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const statusClass = statusColors[project.status];
  const departmentClass = departmentColors[project.department];
  
  // Get assignee info from users
  const assigneeAvatars = project.assignees.map(id => {
    const user = users.find(u => u.id === id);
    return user;
  }).filter(Boolean);

  return (
    <Card className="overflow-hidden shadow-subtle hover:shadow-elevated transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex space-x-2 mb-2">
              <Badge variant="outline" className={departmentClass}>
                {project.department}
              </Badge>
              <Badge variant="outline" className={statusClass}>
                {project.status.replace('-', ' ')}
              </Badge>
            </div>
            <CardTitle className="text-lg font-semibold">{project.title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex space-x-1">
              {assigneeAvatars.map((user, i) => (
                <Avatar key={i} className="h-6 w-6 border border-background -ml-2 first:ml-0">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="text-[10px] bg-vybe text-white">
                    {user?.name?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="flex items-center text-muted-foreground">
              <CalendarDays className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">{format(project.deadline, 'MMM d, yyyy')}</span>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Progress</span>
              <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-1.5" />
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            <span>{project.tasks.length} tasks</span>
          </div>
          <Button variant="ghost" size="sm" className="text-vybe">
            View details
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const RecentProjects: React.FC = () => {
  const recentProjects = [...projects].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  ).slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Recent Projects</h3>
        <Button variant="ghost" size="sm" className="text-vybe">
          View all
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
