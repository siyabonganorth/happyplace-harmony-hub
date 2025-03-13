
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { BarChart3, PieChart as PieChartIcon, TrendingUp, AlertCircle } from 'lucide-react';

const PerformanceDashboard: React.FC = () => {
  // Sample data for charts
  const departmentPerformanceData = [
    { name: 'Audiophiles', completed: 12 },
    { name: 'Vismasters', completed: 8 },
    { name: 'adVYBE', completed: 5 },
  ];
  
  const taskCompletionData = [
    { name: 'On-Time', value: 70, color: 'rgb(75, 192, 192)' },
    { name: 'Late', value: 20, color: 'rgb(255, 205, 86)' },
    { name: 'Incomplete', value: 10, color: 'rgb(255, 99, 132)' },
  ];

  // Sample data for team members
  const teamMembersData = [
    { id: 1, name: 'Joshua Mboya', position: 'Senior Designer', performance: 8.7, lastReview: '2023-12-10' },
    { id: 2, name: 'Thabo Ndlovu', position: 'Sound Engineer', performance: 9.1, lastReview: '2023-11-25' },
    { id: 3, name: 'Lerato Molefe', position: 'Marketing Specialist', performance: 7.8, lastReview: '2023-12-05' },
    { id: 4, name: 'Grace Nkosi', position: 'Project Manager', performance: 8.9, lastReview: '2023-12-01' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Performance Tracking & Reporting</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      <Tabs defaultValue="charts" className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="charts">Performance Charts</TabsTrigger>
          <TabsTrigger value="team-members">Team Members</TabsTrigger>
          <TabsTrigger value="reports">Performance Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="charts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Completed projects by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentPerformanceData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completed" fill="#4f46e5" name="Projects Completed" />
                    </BarChart>
                  </ResponsiveContainer>
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
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={taskCompletionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {taskCompletionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="team-members">
          <Card>
            <CardHeader>
              <CardTitle>Team Member Performance</CardTitle>
              <CardDescription>Individual performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 bg-muted p-3 font-medium">
                  <div>Name</div>
                  <div>Position</div>
                  <div>Performance</div>
                  <div>Last Review</div>
                </div>
                {teamMembersData.map((member) => (
                  <div key={member.id} className="grid grid-cols-4 p-3 border-t">
                    <div>{member.name}</div>
                    <div>{member.position}</div>
                    <div className="flex items-center">
                      <span className={`inline-flex ${member.performance >= 8.5 ? 'text-green-600' : member.performance >= 7.5 ? 'text-amber-600' : 'text-red-600'}`}>
                        {member.performance}/10
                      </span>
                    </div>
                    <div>{new Date(member.lastReview).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Recent Performance Reports</CardTitle>
              <CardDescription>Performance reports submitted by department heads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex justify-between">
                    <div className="font-medium">Audiophiles Q4 Performance Summary</div>
                    <div className="text-sm text-muted-foreground">Submitted on: 2023-12-15</div>
                  </div>
                  <div className="mt-2 text-sm">
                    Overall team productivity increased by 12% this quarter. Notable achievements include completing the Maboneng Studios project ahead of schedule.
                  </div>
                </div>
                
                <div className="rounded-md border p-4">
                  <div className="flex justify-between">
                    <div className="font-medium">Vismasters Performance Improvements</div>
                    <div className="text-sm text-muted-foreground">Submitted on: 2023-12-10</div>
                  </div>
                  <div className="mt-2 text-sm">
                    Team has shown significant improvement in meeting deadlines. The new collaborative workflow has reduced revision cycles by 30%.
                  </div>
                </div>
                
                <div className="rounded-md border p-4">
                  <div className="flex justify-between">
                    <div className="font-medium">adVYBE Marketing Campaigns Report</div>
                    <div className="text-sm text-muted-foreground">Submitted on: 2023-12-05</div>
                  </div>
                  <div className="mt-2 text-sm">
                    The team successfully launched 5 major campaigns this quarter with a 25% increase in client engagement metrics compared to Q3.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceDashboard;
