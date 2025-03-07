
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { tasksApi, usersApi, dependenciesApi } from '../services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Clock, Edit, Trash2, AlertCircle, Link } from 'lucide-react';
import TaskForm from '../components/tasks/TaskForm';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Task } from '../types';
import { useAuth } from '../context/AuthContext';

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const { data: task, isLoading } = useQuery({
    queryKey: ['task', id],
    queryFn: () => tasksApi.getById(id!),
    enabled: !!id
  });
  
  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: usersApi.getAll
  });
  
  const { data: dependencies } = useQuery({
    queryKey: ['task-dependencies', id],
    queryFn: () => dependenciesApi.getByTask(id!),
    enabled: !!id
  });
  
  const assignee = task?.assigneeId 
    ? users.find(user => user.id === task.assigneeId) 
    : null;
  
  const handleDeleteTask = async () => {
    try {
      if (!id) return;
      
      const success = await tasksApi.delete(id);
      
      if (success) {
        toast.success('Task deleted successfully');
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
        navigate('/tasks');
      } else {
        throw new Error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };
  
  const canEdit = user?.role === 'admin' || user?.role === 'director' || user?.role === 'head' || 
                 (task?.assigneeId === user?.id) || (task?.createdBy === user?.id);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (!task) {
    return (
      <div className="container mx-auto py-6 text-center">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold">Task Not Found</h1>
        <p className="text-muted-foreground mt-2">The task you're looking for doesn't exist or has been deleted.</p>
        <Button onClick={() => navigate('/tasks')} className="mt-4">
          Return to Tasks
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-6">
      {isEditing ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Edit Task</h1>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel Editing
            </Button>
          </div>
          <TaskForm 
            existingTask={task} 
            onSuccess={() => {
              setIsEditing(false);
              queryClient.invalidateQueries({ queryKey: ['task', id] });
              queryClient.invalidateQueries({ queryKey: ['tasks'] });
            }} 
          />
        </>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="capitalize bg-primary/10 text-primary">
                  {task.department}
                </Badge>
                <Badge variant="outline" className={`
                  ${task.priority === 'low' ? 'bg-blue-100 text-blue-800' : 
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                    task.priority === 'high' ? 'bg-orange-100 text-orange-800' : 
                    'bg-red-100 text-red-800'}
                `}>
                  {task.priority}
                </Badge>
                <Badge variant="outline" className={`
                  ${task.status === 'todo' ? 'bg-gray-100 text-gray-800' : 
                    task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
                    task.status === 'review' ? 'bg-purple-100 text-purple-800' : 
                    'bg-green-100 text-green-800'}
                `}>
                  {task.status === 'in-progress' ? 'In Progress' : 
                   task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold mt-2">{task.title}</h1>
            </div>
            
            <div className="flex gap-2 self-end sm:self-auto">
              {canEdit && (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
              
              {(user?.role === 'admin' || user?.role === 'director' || task.createdBy === user?.id) && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the task
                        and remove it from the system.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteTask}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Task Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                      <p className="mt-1">
                        {task.description || 'No description provided.'}
                      </p>
                    </div>
                    
                    {task.dueDate && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Due Date</h3>
                        <div className="flex items-center mt-1">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{format(task.dueDate, 'MMMM d, yyyy')}</span>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
                      <div className="flex items-center mt-1">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{format(task.createdAt, 'MMMM d, yyyy')}</span>
                      </div>
                    </div>
                    
                    <Tabs defaultValue="dependencies">
                      <TabsList>
                        <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
                      </TabsList>
                      <TabsContent value="dependencies" className="pt-4">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium mb-2">This task depends on:</h3>
                            {dependencies?.parentTasks.length ? (
                              <div className="space-y-2">
                                {dependencies.parentTasks.map((parentTask) => (
                                  <Card key={parentTask.id} className="p-3">
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <h4 className="font-medium">{parentTask.title}</h4>
                                        <p className="text-sm text-muted-foreground">
                                          {parentTask.department} - {parentTask.status}
                                        </p>
                                      </div>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => navigate(`/tasks/${parentTask.id}`)}
                                      >
                                        <Link className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </Card>
                                ))}
                              </div>
                            ) : (
                              <p className="text-muted-foreground text-sm">This task has no dependencies</p>
                            )}
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium mb-2">Tasks that depend on this:</h3>
                            {dependencies?.dependentTasks.length ? (
                              <div className="space-y-2">
                                {dependencies.dependentTasks.map((dependentTask) => (
                                  <Card key={dependentTask.id} className="p-3">
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <h4 className="font-medium">{dependentTask.title}</h4>
                                        <p className="text-sm text-muted-foreground">
                                          {dependentTask.department} - {dependentTask.status}
                                        </p>
                                      </div>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => navigate(`/tasks/${dependentTask.id}`)}
                                      >
                                        <Link className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </Card>
                                ))}
                              </div>
                            ) : (
                              <p className="text-muted-foreground text-sm">No tasks depend on this</p>
                            )}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Assignment</CardTitle>
                </CardHeader>
                <CardContent>
                  {assignee ? (
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={assignee.avatar} />
                        <AvatarFallback>
                          {assignee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{assignee.name}</p>
                        <p className="text-sm text-muted-foreground">{assignee.email}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">This task is not assigned to anyone.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskDetail;
