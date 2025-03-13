
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Users, Heart, BarChart3, FileSpreadsheet, Calendar } from 'lucide-react';
import RecruitmentDashboard from '../components/teamsync/RecruitmentDashboard';
import ContractsDashboard from '../components/teamsync/ContractsDashboard';
import BenefitsDashboard from '../components/teamsync/BenefitsDashboard';
import PerformanceDashboard from '../components/teamsync/PerformanceDashboard';
import BudgetRequestsDashboard from '../components/teamsync/BudgetRequestsDashboard';
import AttendanceDashboard from '../components/teamsync/AttendanceDashboard';

const TeamSyncDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to regular dashboard if not TeamSync department
  if (user?.department !== 'TeamSync') {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">TeamSync Dashboard</h1>
          <p className="text-muted-foreground">Team Coordination, Recruitment, and Culture Management</p>
        </div>
        <Button onClick={() => navigate('/dashboard')} variant="outline">
          View Main Dashboard
        </Button>
      </div>

      <Tabs defaultValue="recruitment" className="w-full">
        <TabsList className="grid grid-cols-6 w-full mb-4">
          <TabsTrigger value="recruitment" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Recruitment</span>
          </TabsTrigger>
          <TabsTrigger value="contracts" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span>Contracts</span>
          </TabsTrigger>
          <TabsTrigger value="benefits" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span>Benefits</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Performance</span>
          </TabsTrigger>
          <TabsTrigger value="budget" className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            <span>Budget Requests</span>
          </TabsTrigger>
          <TabsTrigger value="attendance" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Attendance</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recruitment" className="mt-0">
          <RecruitmentDashboard />
        </TabsContent>

        <TabsContent value="contracts" className="mt-0">
          <ContractsDashboard />
        </TabsContent>

        <TabsContent value="benefits" className="mt-0">
          <BenefitsDashboard />
        </TabsContent>

        <TabsContent value="performance" className="mt-0">
          <PerformanceDashboard />
        </TabsContent>
        
        <TabsContent value="budget" className="mt-0">
          <BudgetRequestsDashboard />
        </TabsContent>
        
        <TabsContent value="attendance" className="mt-0">
          <AttendanceDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamSyncDashboard;
