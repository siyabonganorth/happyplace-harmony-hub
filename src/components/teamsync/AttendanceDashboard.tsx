
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CheckSquare, XSquare, AlertTriangle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AttendanceDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Attendance & Accountability</h2>
        <Button className="gap-2">
          <CheckSquare className="h-4 w-4" />
          Record Meeting Attendance
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-4 w-4" />
              Active Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">24</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              Meeting Attendance
            </CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">86%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <XSquare className="h-4 w-4" />
              Missed Meetings
            </CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">8</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Consistently Absent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Meetings</CardTitle>
          <CardDescription>Attendance records for recent team meetings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">Weekly All-Hands Meeting</h3>
                  <p className="text-sm text-muted-foreground">Monday, June 10, 2024 • 10:00 AM</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Attendance: 20/24</p>
                  <p className="text-sm text-muted-foreground">83% attended</p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Absent Members:</h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">John Doe</Button>
                  <Button variant="outline" size="sm">Jane Smith</Button>
                  <Button variant="outline" size="sm">Alex Johnson</Button>
                  <Button variant="outline" size="sm">Sarah Wilson</Button>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">Audiophiles Department Sync</h3>
                  <p className="text-sm text-muted-foreground">Wednesday, June 5, 2024 • 2:00 PM</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Attendance: 8/8</p>
                  <p className="text-sm text-muted-foreground">100% attended</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">Vismasters Project Review</h3>
                  <p className="text-sm text-muted-foreground">Tuesday, June 4, 2024 • 11:00 AM</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Attendance: 6/7</p>
                  <p className="text-sm text-muted-foreground">86% attended</p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Absent Members:</h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">Maria Rodriguez</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceDashboard;
