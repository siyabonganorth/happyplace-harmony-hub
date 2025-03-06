
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { departmentMetrics } from '../../data/mockData';

const chartData = [
  {
    name: 'Audiophiles',
    active: departmentMetrics.Audiophiles.activeProjects,
    completed: departmentMetrics.Audiophiles.completedThisMonth,
  },
  {
    name: 'Vismasters',
    active: departmentMetrics.Vismasters.activeProjects,
    completed: departmentMetrics.Vismasters.completedThisMonth,
  },
  {
    name: 'adVYBE',
    active: departmentMetrics.adVYBE.activeProjects,
    completed: departmentMetrics.adVYBE.completedThisMonth,
  },
];

const colors = {
  active: 'hsl(267, 70%, 60%)',   // vybe color
  completed: 'hsl(156, 70%, 50%)'  // green
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-md border text-sm">
        <p className="font-medium">{label}</p>
        <div className="mt-1 space-y-1">
          <p className="flex items-center">
            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors.active }}></span>
            Active: {payload[0].value}
          </p>
          <p className="flex items-center">
            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors.completed }}></span>
            Completed: {payload[1].value}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

const DepartmentBreakdown: React.FC = () => {
  return (
    <Card className="shadow-subtle">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Department Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
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
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="active" name="Active Projects">
                {chartData.map((entry, index) => (
                  <Cell key={`active-${index}`} fill={colors.active} />
                ))}
              </Bar>
              <Bar dataKey="completed" name="Completed Projects">
                {chartData.map((entry, index) => (
                  <Cell key={`completed-${index}`} fill={colors.completed} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
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
      </CardContent>
    </Card>
  );
};

export default DepartmentBreakdown;
