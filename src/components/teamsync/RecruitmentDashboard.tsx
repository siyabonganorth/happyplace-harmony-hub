
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { UserPlus, Users, FileCheck, Clock } from 'lucide-react';

const RecruitmentDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Recruitment & Onboarding</h2>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Post New Position
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              New Applications
            </CardTitle>
            <CardDescription>Pending initial review</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Scheduled Interviews
            </CardTitle>
            <CardDescription>Next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileCheck className="h-4 w-4" />
              Test Tasks
            </CardTitle>
            <CardDescription>Awaiting results</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">7</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-4 w-4" />
              New Hires
            </CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="applications" className="w-full">
        <TabsList>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="test-tasks">Test Tasks</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
        </TabsList>
        
        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Review and manage incoming applications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No applications data available yet. This feature is in development.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="interviews">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Interviews</CardTitle>
              <CardDescription>Manage upcoming interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No interview data available yet. This feature is in development.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="test-tasks">
          <Card>
            <CardHeader>
              <CardTitle>Test Tasks</CardTitle>
              <CardDescription>Track and evaluate test tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No test tasks data available yet. This feature is in development.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="onboarding">
          <Card>
            <CardHeader>
              <CardTitle>Onboarding</CardTitle>
              <CardDescription>Manage new hire onboarding process</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No onboarding data available yet. This feature is in development.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecruitmentDashboard;
