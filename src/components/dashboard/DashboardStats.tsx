
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarClock, BarChart3, CheckCircle2, AlertCircle } from 'lucide-react';
import { Project, Task, ProjectStatus, TaskStatus } from '../../types';
import { isAfter, isBefore, addDays } from 'date-fns';

interface StatCardProps {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  description, 
  icon, 
  trend 
}) => {
  return (
    <Card className="shadow-subtle hover:shadow-elevated transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="bg-secondary p-2 rounded-full">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend && (
          <div className={`flex items-center mt-2 text-xs ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
            <span>{trend.positive ? '↑' : '↓'} {trend.value}%</span>
            <span className="ml-1">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface DashboardStatsProps {
  projects: Project[];
  tasks: Task[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ projects, tasks }) => {
  // Calculate active projects
  const activeProjects = projects.filter(
    project => project.status === 'in-progress' || project.status === 'planning'
  ).length;
  
  // Calculate completed projects in last 30 days
  const thirtyDaysAgo = addDays(new Date(), -30);
  const completedProjects = projects.filter(
    project => project.status === 'completed' && isAfter(project.updatedAt, thirtyDaysAgo)
  ).length;
  
  // Calculate upcoming deadlines in next 7 days
  const sevenDaysFromNow = addDays(new Date(), 7);
  const upcomingDeadlines = projects.filter(
    project => 
      project.deadline && 
      isAfter(project.deadline, new Date()) && 
      isBefore(project.deadline, sevenDaysFromNow)
  ).length;
  
  // Calculate overdue tasks
  const overdueTasks = tasks.filter(
    task => 
      task.status !== 'completed' && 
      task.dueDate && 
      isBefore(task.dueDate, new Date())
  ).length;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Active Projects"
        value={activeProjects}
        description="Across all departments"
        icon={<BarChart3 className="h-4 w-4 text-vybe" />}
        trend={{
          value: 12,
          positive: true
        }}
      />
      <StatCard
        title="Completed Projects"
        value={completedProjects}
        description="In the last 30 days"
        icon={<CheckCircle2 className="h-4 w-4 text-green-600" />}
        trend={{
          value: 8,
          positive: true
        }}
      />
      <StatCard
        title="Upcoming Deadlines"
        value={upcomingDeadlines}
        description="In the next 7 days"
        icon={<CalendarClock className="h-4 w-4 text-amber-500" />}
      />
      <StatCard
        title="Overdue Tasks"
        value={overdueTasks}
        description="Requires attention"
        icon={<AlertCircle className="h-4 w-4 text-red-500" />}
        trend={{
          value: 5,
          positive: false
        }}
      />
    </div>
  );
};

export default DashboardStats;
