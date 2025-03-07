
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardStats from '../components/dashboard/DashboardStats';
import RecentProjects from '../components/dashboard/RecentProjects';
import DepartmentBreakdown from '../components/dashboard/DepartmentBreakdown';
import UpcomingTasks from '../components/dashboard/UpcomingTasks';
import Announcements from '../components/dashboard/Announcements';
import CreateQuoteButton from '../components/quotes/CreateQuoteButton';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { announcementsApi, projectsApi, tasksApi } from '../services/api';
import { Project, Task, Announcement } from '../types';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const [projectsData, tasksData, announcementsData] = await Promise.all([
          projectsApi.getAll(),
          tasksApi.getAll(),
          announcementsApi.getActive()
        ]);
        
        setProjects(projectsData);
        setTasks(tasksData);
        setAnnouncements(announcementsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const goToDepartment = () => {
    if (user?.department) {
      navigate(`/department/${user.department.toLowerCase()}`);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, {user?.name}</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={goToDepartment}
            className="bg-vybe"
          >
            My Department
          </Button>
          
          <CreateQuoteButton />
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid place-items-center h-64">
          <div className="animate-spin w-10 h-10 border-4 border-vybe/30 border-t-vybe rounded-full"></div>
        </div>
      ) : (
        <>
          <Announcements announcements={announcements} />
          
          <DashboardStats projects={projects} tasks={tasks} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentProjects projects={projects} />
            </div>
            <div>
              <UpcomingTasks tasks={tasks} />
            </div>
          </div>
          
          <div>
            <DepartmentBreakdown projects={projects} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
