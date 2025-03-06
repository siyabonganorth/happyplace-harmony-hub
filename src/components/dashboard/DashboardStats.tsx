
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarClock, BarChart3, CheckCircle2, AlertCircle } from 'lucide-react';

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

const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon, trend }) => {
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

const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Active Projects"
        value={16}
        description="Across all departments"
        icon={<BarChart3 className="h-4 w-4 text-vybe" />}
        trend={{
          value: 12,
          positive: true
        }}
      />
      <StatCard
        title="Completed Projects"
        value={24}
        description="In the last 30 days"
        icon={<CheckCircle2 className="h-4 w-4 text-green-600" />}
        trend={{
          value: 8,
          positive: true
        }}
      />
      <StatCard
        title="Upcoming Deadlines"
        value={7}
        description="In the next 7 days"
        icon={<CalendarClock className="h-4 w-4 text-amber-500" />}
      />
      <StatCard
        title="Overdue Tasks"
        value={3}
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
