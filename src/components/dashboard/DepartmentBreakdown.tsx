
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Project, Department, ProjectStatus } from '../../types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DepartmentMetrics {
  name: Department;
  active: number;
  completed: number;
  failed: number;
  canceled: number;
}

interface DepartmentBreakdownProps {
  projects: Project[];
}

const colors = {
  active: 'hsl(267, 70%, 60%)',    // vybe color
  completed: 'hsl(156, 70%, 50%)',  // green
  failed: 'hsl(0, 70%, 50%)',       // red
  canceled: 'hsl(39, 70%, 50%)'     // orange
};

const CustomTooltip = ({ active, payload, label, chartType }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-md border text-sm">
        <p className="font-medium">{label}</p>
        <div className="mt-1 space-y-1">
          {chartType === 'progress' && (
            <>
              <p className="flex items-center">
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors.active }}></span>
                Active: {payload[0].value}
              </p>
              <p className="flex items-center">
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors.completed }}></span>
                Completed: {payload[1].value}
              </p>
            </>
          )}
          {chartType === 'problems' && (
            <>
              <p className="flex items-center">
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors.failed }}></span>
                Failed: {payload[0].value}
              </p>
              <p className="flex items-center">
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors.canceled }}></span>
                Canceled: {payload[1].value}
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return null;
};

const DepartmentBreakdown: React.FC<DepartmentBreakdownProps> = ({ projects }) => {
  const [activeTab, setActiveTab] = useState('progress');
  
  // Process projects to get department metrics
  const departmentMetrics: DepartmentMetrics[] = [
    { name: 'Audiophiles', active: 0, completed: 0, failed: 0, canceled: 0 },
    { name: 'Vismasters', active: 0, completed: 0, failed: 0, canceled: 0 },
    { name: 'adVYBE', active: 0, completed: 0, failed: 0, canceled: 0 }
  ];
  
  // Count projects for each department by status
  projects.forEach(project => {
    const departmentIndex = departmentMetrics.findIndex(d => d.name === project.department);
    if (departmentIndex !== -1) {
      if (project.status === 'completed') {
        departmentMetrics[departmentIndex].completed += 1;
      } else if (project.status === 'failed' as ProjectStatus) {
        departmentMetrics[departmentIndex].failed += 1;
      } else if (project.status === 'canceled' as ProjectStatus) {
        departmentMetrics[departmentIndex].canceled += 1;
      } else {
        departmentMetrics[departmentIndex].active += 1;
      }
    }
  });

  return (
    <Card className="shadow-subtle">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Department Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="progress" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="problems">Failed & Canceled</TabsTrigger>
          </TabsList>
          
          <TabsContent value="progress" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentMetrics}
                margin={{
                  top: 20,
                  right: 20,
                  left: -10,
                  bottom: 5,
                }}
                barGap={5}
                barSize={24}
              >
                <XAxis 
                  dataKey="name" 
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={(props) => <CustomTooltip {...props} chartType="progress" />} />
                <Bar dataKey="active" name="Active Projects">
                  {departmentMetrics.map((entry, index) => (
                    <Cell key={`active-${index}`} fill={colors.active} />
                  ))}
                </Bar>
                <Bar dataKey="completed" name="Completed Projects">
                  {departmentMetrics.map((entry, index) => (
                    <Cell key={`completed-${index}`} fill={colors.completed} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            
            <div className="mt-6 flex justify-center space-x-6">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: colors.active }}></div>
                <span className="text-sm">Active Projects</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: colors.completed }}></div>
                <span className="text-sm">Completed Projects</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="problems" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentMetrics}
                margin={{
                  top: 20,
                  right: 20,
                  left: -10,
                  bottom: 5,
                }}
                barGap={5}
                barSize={24}
              >
                <XAxis 
                  dataKey="name" 
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={(props) => <CustomTooltip {...props} chartType="problems" />} />
                <Bar dataKey="failed" name="Failed Projects">
                  {departmentMetrics.map((entry, index) => (
                    <Cell key={`failed-${index}`} fill={colors.failed} />
                  ))}
                </Bar>
                <Bar dataKey="canceled" name="Canceled Projects">
                  {departmentMetrics.map((entry, index) => (
                    <Cell key={`canceled-${index}`} fill={colors.canceled} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            
            <div className="mt-6 flex justify-center space-x-6">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: colors.failed }}></div>
                <span className="text-sm">Failed Projects</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: colors.canceled }}></div>
                <span className="text-sm">Canceled Projects</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DepartmentBreakdown;
