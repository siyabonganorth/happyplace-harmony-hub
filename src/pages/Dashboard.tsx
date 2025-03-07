
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
import { PlusCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check user permissions
  const canCreateTask = !!user;
  const canCreateProject = user?.role === 'director' || user?.role === 'head' || user?.role === 'admin';
  const canCreateAnnouncement = user?.role === 'director' || user?.role === 'head' || user?.role === 'admin';

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const [projectsData, tasksData, announcementsData] = await Promise.all([
          projectsApi.getAll(),
          tasksApi.getAll(),
          announcementsApi.getActive()
        ]);
        
        // Filter projects by department if user is not a director
        let filteredProjects = projectsData;
        if (user && user.role !== 'director') {
          filteredProjects = projectsData.filter(p => 
            p.department === user.department || 
            p.assignees.includes(user.id)
          );
        }
        
        // Filter tasks by department/assignment
        let filteredTasks = tasksData;
        if (user && user.role !== 'director') {
          filteredTasks = tasksData.filter(t => 
            t.department === user.department || 
            t.assigneeId === user.id
          );
        }
        
        setProjects(filteredProjects);
        setTasks(filteredTasks);
        setAnnouncements(announcementsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.name}
            {user?.role && <span className="ml-1">({user.role})</span>}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {canCreateTask && (
            <Button 
              onClick={() => navigate('/tasks/create')}
              variant="outline"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              New Task
            </Button>
          )}
          
          {canCreateProject && (
            <Button 
              onClick={() => navigate('/projects/create')}
              variant="outline"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              New Project
            </Button>
          )}
          
          <CreateQuoteButton />
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid place-items-center h-64">
          <div className="animate-spin w-10 h-10 border-4 border-vybe/30 border-t-vybe rounded-full"></div>
        </div>
      ) : (
        <>
          <Announcements 
            announcements={announcements} 
            canCreate={canCreateAnnouncement} 
          />
          
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
