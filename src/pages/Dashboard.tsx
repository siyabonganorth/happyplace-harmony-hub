
import React from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardStats from '../components/dashboard/DashboardStats';
import RecentProjects from '../components/dashboard/RecentProjects';
import DepartmentBreakdown from '../components/dashboard/DepartmentBreakdown';
import UpcomingTasks from '../components/dashboard/UpcomingTasks';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back, {user?.name}</p>
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentProjects />
        </div>
        <div>
          <UpcomingTasks />
        </div>
      </div>
      
      <div>
        <DepartmentBreakdown />
      </div>
    </div>
  );
};

export default Dashboard;
