
import React, { createContext, useContext } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Department, Task } from '../../types';
import { useAuth } from '../../context/AuthContext';

// Define the schema for task form validation
const taskSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long' }),
  description: z.string().optional(),
  projectId: z.string(), // Required now - validation moved to form submit
  assigneeId: z.string().optional(),
  status: z.enum(['todo', 'in-progress', 'review', 'completed']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  dueDate: z.date().optional(),
  department: z.enum(['Audiophiles', 'Vismasters', 'adVYBE', 'TeamSync'])
});

export type TaskFormValues = z.infer<typeof taskSchema>;

interface TaskFormContextProps {
  existingTask?: Task;
  onSubmit: (values: TaskFormValues) => Promise<void>;
}

interface TaskFormContextValue {
  form: ReturnType<typeof useForm<TaskFormValues>>;
  onSubmit: (values: TaskFormValues) => Promise<void>;
}

const TaskFormContext = createContext<TaskFormContextValue | null>(null);

export const useTaskForm = () => {
  const context = useContext(TaskFormContext);
  if (!context) {
    throw new Error('useTaskForm must be used within a TaskFormProvider');
  }
  return context;
};

export const TaskFormProvider: React.FC<TaskFormContextProps & { children: React.ReactNode }> = ({ 
  existingTask, 
  onSubmit, 
  children 
}) => {
  const { user } = useAuth();
  
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: existingTask?.title || '',
      description: existingTask?.description || '',
      projectId: existingTask?.projectId || '',
      assigneeId: existingTask?.assigneeId || '',
      status: existingTask?.status || 'todo',
      priority: existingTask?.priority || 'medium',
      dueDate: existingTask?.dueDate,
      department: existingTask?.department || (user?.department as Department) || 'Audiophiles'
    }
  });

  const handleSubmit = form.handleSubmit(onSubmit);
  
  return (
    <TaskFormContext.Provider value={{ form, onSubmit }}>
      <FormProvider {...form}>
        <form id="task-form" onSubmit={handleSubmit} className="space-y-6">
          {children}
        </form>
      </FormProvider>
    </TaskFormContext.Provider>
  );
};
