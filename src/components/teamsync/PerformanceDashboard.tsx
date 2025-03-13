
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, PieChart } from '@/components/ui/chart';
import { BarChart3, PieChart as PieChartIcon, TrendingUp, AlertCircle } from 'lucide-react';

const PerformanceDashboard: React.FC = () => {
  // Sample data for charts
  const departmentPerformanceData = {
    labels: ['Audiophiles', 'Vismasters', 'adVYBE'],
    datasets: [
      {
        label: 'Projects Completed',
        data: [12, 8, 5],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      }
    ],
  };
  
  const taskCompletionData = {
    labels: ['On-Time', 'Late', 'Incomplete'],
    datasets: [
      {
        data: [70, 20, 10],
        backgroundColor: [
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(255, 99, 132)',
        ],
        hoverOffset: 4
      }
    ]
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Performance Tracking & Reporting</h2>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Overall Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">87%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Missed Deadlines
            </CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">6</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Productivity Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">8.4/10</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChartIcon className="h-4 w-4" />
              Team Morale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4.2/5</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Completed projects by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <BarChart data={departmentPerformanceData} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Task Completion Status</CardTitle>
            <CardDescription>Overall task completion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <PieChart data={taskCompletionData} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Performance Reports</CardTitle>
          <CardDescription>Performance reports submitted by department heads</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No performance reports available yet. This feature is in development.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceDashboard;
