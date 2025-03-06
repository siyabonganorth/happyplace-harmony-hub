
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, CalendarClock } from 'lucide-react';
import { Task } from '../../types';
import { tasks, users, projects } from '../../data/mockData';
import { format, isPast, isFuture } from 'date-fns';

const priorityColors = {
  'low': 'bg-blue-100 text-blue-800',
  'medium': 'bg-amber-100 text-amber-800',
  'high': 'bg-orange-100 text-orange-800',
  'urgent': 'bg-red-100 text-red-800'
};

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const priorityClass = priorityColors[task.priority];
  const assignee = users.find(user => user.id === task.assigneeId);
  const project = projects.find(p => p.id === task.projectId);
  
  const isOverdue = task.dueDate ? isPast(new Date(task.dueDate)) && task.status !== 'completed' : false;
  const isUpcoming = task.dueDate ? isFuture(new Date(task.dueDate)) : false;
  
  return (
    <div className="py-3 border-b last:border-0 group">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          {task.status === 'completed' ? (
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-green-600" />
            </div>
          ) : (
            <div className={`w-5 h-5 rounded-full border-2 ${task.status === 'in-progress' ? 'border-vybe bg-vybe/10' : 'border-gray-300'}`}></div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h4 className={`font-medium text-sm ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
              {task.title}
            </h4>
            <Badge variant="outline" className={priorityClass + ' text-[10px] h-5'}>
              {task.priority}
            </Badge>
          </div>
          
          {project && (
            <p className="text-xs text-muted-foreground mt-1">
              {project.title}
            </p>
          )}
          
          <div className="flex justify-between items-center mt-2">
            {assignee && (
              <div className="flex items-center">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={assignee.avatar} />
                  <AvatarFallback className="text-[10px] bg-vybe text-white">
                    {assignee.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground ml-1.5">{assignee.name}</span>
              </div>
            )}
            
            {task.dueDate && (
              <div className={`flex items-center text-xs ${
                isOverdue ? 'text-red-600' : (isUpcoming ? 'text-amber-600' : 'text-muted-foreground')
              }`}>
                <CalendarClock className="w-3 h-3 mr-1" />
                <span>{format(new Date(task.dueDate), 'MMM d')}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const UpcomingTasks: React.FC = () => {
  // Get tasks sorted by due date (upcoming first)
  const sortedTasks = [...tasks]
    .filter(task => task.dueDate && task.status !== 'completed')
    .sort((a, b) => {
      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0;
      return dateA - dateB;
    })
    .slice(0, 5);

  return (
    <Card className="shadow-subtle">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Upcoming Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-0 divide-y">
          {sortedTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingTasks;
