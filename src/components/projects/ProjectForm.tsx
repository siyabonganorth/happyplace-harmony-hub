import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { projectsApi } from '../../services/api';
import { Department, Project, ProjectStatus } from '../../types';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { MultiSelect } from '../ui/multi-select';

const projectStatusValues = ['planning', 'in-progress', 'review', 'completed', 'on-hold', 'failed', 'canceled'] as const;

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  clientId: z.string().min(1, 'Client is required'),
  department: z.enum(['Audiophiles', 'Vismasters', 'adVYBE']), // Only allowing project departments
  status: z.enum(projectStatusValues),
  progress: z.number().min(0).max(100),
  deadline: z.date().optional(),
  assignees: z.array(z.string()).optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  existingProject?: Project;
  onCancel?: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ existingProject, onCancel }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues: Partial<ProjectFormValues> = {
    title: existingProject?.title || '',
    description: existingProject?.description || '',
    clientId: existingProject?.clientId || '',
    // TeamSync members aren't allowed to create department-specific projects 
    // Default to Audiophiles if the user is from TeamSync
    department: existingProject?.department || 
      (user?.department === 'TeamSync' ? 'Audiophiles' : user?.department as 'Audiophiles' | 'Vismasters' | 'adVYBE') || 'Audiophiles',
    status: existingProject?.status || 'planning',
    progress: existingProject?.progress || 0,
    deadline: existingProject?.deadline,
    assignees: existingProject?.assignees || [],
  };

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  const onSubmit = async (values: ProjectFormValues) => {
    setIsLoading(true);
    try {
      if (existingProject) {
        // Update existing project
        await projectsApi.update(existingProject.id, values);
        toast.success('Project updated successfully!');
      } else {
        // Create new project
        await projectsApi.create(values);
        toast.success('Project created successfully!');
      }
      navigate('/projects');
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error(error?.message || 'Failed to save project. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{existingProject ? 'Edit Project' : 'Create New Project'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detailed project description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Client ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Audiophiles">Audiophiles</SelectItem>
                      <SelectItem value="Vismasters">Vismasters</SelectItem>
                      <SelectItem value="adVYBE">adVYBE</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {projectStatusValues.map((status) => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="progress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Progress</FormLabel>
                  <FormControl>
                    <Slider
                      defaultValue={[field.value]}
                      max={100}
                      step={1}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Deadline</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assignees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assignees</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={[
                        { value: 'user1', label: 'User 1' },
                        { value: 'user2', label: 'User 2' },
                        { value: 'user3', label: 'User 3' },
                      ]}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter>
              <div className="flex justify-end gap-2">
                {onCancel && (
                  <Button variant="secondary" onClick={onCancel}>
                    Cancel
                  </Button>
                )}
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Project'}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
