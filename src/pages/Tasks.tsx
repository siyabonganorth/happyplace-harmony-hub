
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { tasksApi } from '../services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Department, Task, TaskPriority, TaskStatus } from '../types';
import { PlusCircle, Calendar, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';

const PriorityBadge = ({ priority }: { priority: TaskPriority }) => {
  const colorMap = {
    low: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    medium: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    high: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
    urgent: 'bg-red-100 text-red-800 hover:bg-red-200'
  };
  
  return (
    <Badge variant="outline" className={colorMap[priority]}>
      {priority}
    </Badge>
  );
};

const StatusBadge = ({ status }: { status: TaskStatus }) => {
  const colorMap = {
    todo: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    'in-progress': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    review: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
    completed: 'bg-green-100 text-green-800 hover:bg-green-200'
  };
  
  return (
    <Badge variant="outline" className={colorMap[status]}>
      {status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const TaskCard = ({ task }: { task: Task }) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => navigate(`/tasks/${task.id}`)}
    >
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-medium text-lg">{task.title}</h3>
          <PriorityBadge priority={task.priority} />
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {task.description || 'No description provided.'}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto items-center justify-between">
          <StatusBadge status={task.status} />
          
          {task.dueDate && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{format(task.dueDate, 'MMM d, yyyy')}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Tasks: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Department | 'all'>(user?.department || 'all');
  
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: tasksApi.getAll
  });
  
  const filteredTasks = activeTab === 'all' 
    ? tasks 
    : tasks.filter(task => task.department === activeTab);
  
  const todoTasks = filteredTasks.filter(task => task.status === 'todo');
  const inProgressTasks = filteredTasks.filter(task => task.status === 'in-progress');
  const reviewTasks = filteredTasks.filter(task => task.status === 'review');
  const completedTasks = filteredTasks.filter(task => task.status === 'completed');
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Button onClick={() => navigate('/tasks/create')}>
          <PlusCircle className="h-5 w-5 mr-2" />
          Create Task
        </Button>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as Department | 'all')}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="Audiophiles">Audiophiles</TabsTrigger>
          <TabsTrigger value="Vismasters">Vismasters</TabsTrigger>
          <TabsTrigger value="adVYBE">adVYBE</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    To Do
                    <Badge variant="outline" className="ml-2 bg-muted">
                      {todoTasks.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {todoTasks.length > 0 ? (
                    todoTasks.map(task => <TaskCard key={task.id} task={task} />)
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No tasks to do</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    In Progress
                    <Badge variant="outline" className="ml-2 bg-muted">
                      {inProgressTasks.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {inProgressTasks.length > 0 ? (
                    inProgressTasks.map(task => <TaskCard key={task.id} task={task} />)
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No tasks in progress</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    Review
                    <Badge variant="outline" className="ml-2 bg-muted">
                      {reviewTasks.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {reviewTasks.length > 0 ? (
                    reviewTasks.map(task => <TaskCard key={task.id} task={task} />)
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No tasks in review</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    Completed
                    <Badge variant="outline" className="ml-2 bg-muted">
                      {completedTasks.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {completedTasks.length > 0 ? (
                    completedTasks.map(task => <TaskCard key={task.id} task={task} />)
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No completed tasks</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tasks;
