
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import { Task, User } from '../../types';
import { tasksApi } from '../../services/api';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { TaskFormProvider } from './TaskFormContext';
import TaskBasicDetails from './TaskBasicDetails';
import TaskProjectAssignment from './TaskProjectAssignment';
import TaskAssigneeSelect from './TaskAssigneeSelect';
import TaskStatusPriority from './TaskStatusPriority';
import TaskDueDateDepartment from './TaskDueDateDepartment';

interface TaskFormProps {
  existingTask?: Task;
  onSuccess?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ existingTask, onSuccess }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const onSubmit = async (values: any) => {
    try {
      // Validation: Ensure a project is selected
      if (!values.projectId || values.projectId === "no-project") {
        toast.error('A project must be selected to create a task');
        return;
      }
      
      setIsSubmitting(true);
      
      // For debugging - remove in production
      console.log("Creating task with values:", values);
      console.log("Current user:", user);
      
      if (existingTask) {
        await tasksApi.update(existingTask.id, {
          ...values,
          createdBy: existingTask.createdBy
        });
        toast.success('Task updated successfully');
      } else {
        // Make sure the created_by value is a proper UUID from the database
        // For now, we'll use a placeholder UUID that matches Supabase's format
        const createdById = user?.id || '00000000-0000-0000-0000-000000000000';
        
        const newTask = await tasksApi.create({
          title: values.title,
          description: values.description,
          projectId: values.projectId,
          assigneeId: values.assigneeId === "unassigned" ? undefined : values.assigneeId,
          status: values.status,
          priority: values.priority,
          dueDate: values.dueDate,
          department: values.department,
          createdBy: createdById
        });
        
        if (!newTask) throw new Error('Failed to create task');
        toast.success('Task created successfully');
      }
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/tasks');
      }
    } catch (error) {
      console.error('Error saving task:', error);
      toast.error('Failed to save task');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{existingTask ? 'Edit Task' : 'Create New Task'}</CardTitle>
      </CardHeader>
      <CardContent>
        <TaskFormProvider existingTask={existingTask} onSubmit={onSubmit}>
          <TaskBasicDetails />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <TaskProjectAssignment required={true} />
            <TaskAssigneeSelect />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <TaskStatusPriority />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <TaskDueDateDepartment />
          </div>
          
          <CardFooter className="flex justify-end gap-2 px-0 mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/tasks')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              form="task-form" // Connect to the form ID in the context
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {existingTask ? 'Update Task' : 'Create Task'}
            </Button>
          </CardFooter>
        </TaskFormProvider>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
