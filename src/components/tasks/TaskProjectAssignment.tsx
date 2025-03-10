
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { projectsApi } from '../../services/api';
import { useTaskForm } from './TaskFormContext';

interface TaskProjectAssignmentProps {
  required?: boolean;
}

const TaskProjectAssignment: React.FC<TaskProjectAssignmentProps> = ({ required = false }) => {
  const form = useFormContext();
  const department = form.watch('department');
  
  const { data: projects = [], isLoading: isLoadingProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: projectsApi.getAll
  });
  
  const departmentProjects = projects.filter(p => p.department === department);
  
  // If "required" is true and no project is selected, update form to show error
  useEffect(() => {
    if (required && form.formState.isSubmitted) {
      const projectId = form.getValues('projectId');
      if (!projectId || projectId === 'no-project') {
        form.setError('projectId', { 
          type: 'manual', 
          message: 'A project is required to create a task' 
        });
      }
    }
  }, [form.formState.isSubmitted, required, form]);
  
  return (
    <FormField
      control={form.control}
      name="projectId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{required ? 'Project *' : 'Project'}</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            value={field.value}
            disabled={isLoadingProjects}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {!required && <SelectItem value="no-project">No project</SelectItem>}
              {departmentProjects.length === 0 ? (
                <SelectItem value="create-project" disabled>
                  No projects available - create one first
                </SelectItem>
              ) : (
                departmentProjects.map(project => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.title}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          {required && (
            <p className="text-sm text-muted-foreground">A project is required to create a task</p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TaskProjectAssignment;
