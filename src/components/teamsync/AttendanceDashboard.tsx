
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, Users, UserCheck, Activity, Search, Filter, Calendar } from 'lucide-react';
import { format, startOfWeek, addDays, isToday, isWeekend, parseISO } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Department } from '@/types';

interface EmployeeAttendance {
  id: string;
  employeeName: string;
  employeeId: string;
  department: Department;
  position: string;
  avatar?: string;
  clockInTime?: string;
  clockOutTime?: string;
  attendanceStatus: 'present' | 'absent' | 'late' | 'leave' | 'remote' | 'not-recorded';
  date: string;
  notes?: string;
}

interface LeaveRequest {
  id: string;
  employeeName: string;
  employeeId: string;
  leaveType: 'annual' | 'sick' | 'family' | 'study' | 'other';
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
  createdAt: string;
}

// Sample attendance data for the current week
const today = new Date();
const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Start on Monday

const generateWeekAttendance = () => {
  const employees = [
    { 
      employeeName: 'Mntungwa', 
      employeeId: 'audio-head-1', 
      department: 'Audiophiles' as Department, 
      position: 'Department Head' 
    },
    { 
      employeeName: 'Neo', 
      employeeId: 'vis-head-1', 
      department: 'Vismasters' as Department, 
      position: 'Department Head' 
    },
    { 
      employeeName: 'Lungile', 
      employeeId: 'ad-head-1', 
      department: 'adVYBE' as Department, 
      position: 'Department Head' 
    },
    { 
      employeeName: 'Audio Team Member 1', 
      employeeId: 'audio-member-1', 
      department: 'Audiophiles' as Department, 
      position: 'Sound Engineer' 
    },
    { 
      employeeName: 'Visual Team Member 1', 
      employeeId: 'vis-member-1', 
      department: 'Vismasters' as Department, 
      position: 'Visual Designer' 
    }
  ];

  const attendanceData: EmployeeAttendance[] = [];

  employees.forEach(employee => {
    // Generate attendance for the week
    for (let i = 0; i < 7; i++) {
      const date = addDays(weekStart, i);
      const dateStr = format(date, 'yyyy-MM-dd');
      
      // Don't record weekend attendance unless it's today (for demo purposes)
      if (isWeekend(date) && !isToday(date)) {
        continue;
      }
      
      // For dates in the past or today
      if (date <= today) {
        // Random attendance status with higher probability of being present
        const statuses: EmployeeAttendance['attendanceStatus'][] = ['present', 'present', 'present', 'late', 'absent', 'remote'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        const clockInHour = randomStatus === 'late' ? 10 + Math.floor(Math.random() * 2) : 8 + Math.floor(Math.random() * 2);
        const clockInMinute = Math.floor(Math.random() * 60);
        const clockInTime = `${clockInHour.toString().padStart(2, '0')}:${clockInMinute.toString().padStart(2, '0')}`;
        
        const clockOutHour = 16 + Math.floor(Math.random() * 3);
        const clockOutMinute = Math.floor(Math.random() * 60);
        const clockOutTime = randomStatus !== 'absent' ? `${clockOutHour.toString().padStart(2, '0')}:${clockOutMinute.toString().padStart(2, '0')}` : undefined;
        
        attendanceData.push({
          id: `${employee.employeeId}-${dateStr}`,
          employeeName: employee.employeeName,
          employeeId: employee.employeeId,
          department: employee.department,
          position: employee.position,
          clockInTime: randomStatus !== 'absent' ? clockInTime : undefined,
          clockOutTime,
          attendanceStatus: randomStatus,
          date: dateStr,
          notes: randomStatus === 'absent' ? 'Called in sick' : 
                 randomStatus === 'remote' ? 'Working from home' : 
                 randomStatus === 'late' ? 'Traffic delay' : undefined
        });
      } else {
        // For future dates
        attendanceData.push({
          id: `${employee.employeeId}-${dateStr}`,
          employeeName: employee.employeeName,
          employeeId: employee.employeeId,
          department: employee.department,
          position: employee.position,
          attendanceStatus: 'not-recorded',
          date: dateStr
        });
      }
    }
  });

  return attendanceData;
};

// Sample leave requests
const leaveRequestsData: LeaveRequest[] = [
  {
    id: '1',
    employeeName: 'Mntungwa',
    employeeId: 'audio-head-1',
    leaveType: 'annual',
    startDate: '2023-12-22',
    endDate: '2023-12-31',
    status: 'approved',
    reason: 'Year-end holiday',
    createdAt: '2023-12-01'
  },
  {
    id: '2',
    employeeName: 'Neo',
    employeeId: 'vis-head-1',
    leaveType: 'sick',
    startDate: '2023-12-05',
    endDate: '2023-12-06',
    status: 'approved',
    reason: 'Not feeling well',
    createdAt: '2023-12-04'
  },
  {
    id: '3',
    employeeName: 'Audio Team Member 1',
    employeeId: 'audio-member-1',
    leaveType: 'family',
    startDate: '2023-12-15',
    endDate: '2023-12-16',
    status: 'pending',
    reason: 'Family emergency',
    createdAt: '2023-12-14'
  },
  {
    id: '4',
    employeeName: 'Visual Team Member 1',
    employeeId: 'vis-member-1',
    leaveType: 'study',
    startDate: '2024-01-10',
    endDate: '2024-01-15',
    status: 'pending',
    reason: 'Design course in Cape Town',
    createdAt: '2023-12-10'
  }
];

const attendanceStatusColor = {
  'present': 'bg-green-100 text-green-800',
  'absent': 'bg-red-100 text-red-800',
  'late': 'bg-yellow-100 text-yellow-800',
  'leave': 'bg-blue-100 text-blue-800',
  'remote': 'bg-purple-100 text-purple-800',
  'not-recorded': 'bg-gray-100 text-gray-800'
};

const leaveTypeLabels = {
  'annual': 'Annual Leave',
  'sick': 'Sick Leave',
  'family': 'Family Responsibility',
  'study': 'Study Leave',
  'other': 'Other'
};

const AttendanceDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('daily');
  
  const weeklyAttendanceData = generateWeekAttendance();
  
  // Filter attendance data based on selected date and department
  const dailyAttendanceData = weeklyAttendanceData.filter(record => {
    const matchesDate = record.date === format(selectedDate, 'yyyy-MM-dd');
    const matchesDepartment = departmentFilter === 'all' || record.department === departmentFilter;
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesDate && matchesDepartment && matchesSearch;
  });

  const attendanceRate = {
    present: weeklyAttendanceData.filter(a => a.attendanceStatus === 'present').length,
    late: weeklyAttendanceData.filter(a => a.attendanceStatus === 'late').length,
    absent: weeklyAttendanceData.filter(a => a.attendanceStatus === 'absent').length,
    remote: weeklyAttendanceData.filter(a => a.attendanceStatus === 'remote').length,
    total: weeklyAttendanceData.filter(a => a.attendanceStatus !== 'not-recorded').length
  };

  // Filter leave requests based on search term
  const filteredLeaveRequests = leaveRequestsData.filter(request => 
    request.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Attendance & Leave Management</h2>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                {format(selectedDate, 'PPP')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Button>Export Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Attendance Rate
            </CardTitle>
            <CardDescription>Weekly average</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {Math.round((attendanceRate.present + attendanceRate.remote) / attendanceRate.total * 100)}%
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Late Arrivals
            </CardTitle>
            <CardDescription>This week</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{attendanceRate.late}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Remote Work
            </CardTitle>
            <CardDescription>This week</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{attendanceRate.remote}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Leave Requests
            </CardTitle>
            <CardDescription>Pending approval</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {leaveRequestsData.filter(r => r.status === 'pending').length}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search employee..." 
            className="pl-8" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="Audiophiles">Audiophiles</SelectItem>
            <SelectItem value="Vismasters">Vismasters</SelectItem>
            <SelectItem value="adVYBE">adVYBE</SelectItem>
            <SelectItem value="TeamSync">TeamSync</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="daily" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="daily">Daily Attendance</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Overview</TabsTrigger>
          <TabsTrigger value="leave">Leave Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle>Daily Attendance Record</CardTitle>
              <CardDescription>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {dailyAttendanceData.length > 0 ? (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 bg-muted p-3 font-medium">
                      <div className="col-span-2">Employee</div>
                      <div>Status</div>
                      <div>Clock In</div>
                      <div>Clock Out</div>
                      <div>Notes</div>
                    </div>
                    {dailyAttendanceData.map((attendance) => (
                      <div key={attendance.id} className="grid grid-cols-6 p-3 border-t">
                        <div className="col-span-2">
                          <div className="font-medium">{attendance.employeeName}</div>
                          <div className="text-sm text-muted-foreground">{attendance.department} • {attendance.position}</div>
                        </div>
                        <div>
                          <Badge className={attendanceStatusColor[attendance.attendanceStatus]}>
                            {attendance.attendanceStatus.charAt(0).toUpperCase() + attendance.attendanceStatus.slice(1)}
                          </Badge>
                        </div>
                        <div>{attendance.clockInTime || '-'}</div>
                        <div>{attendance.clockOutTime || '-'}</div>
                        <div className="text-sm text-muted-foreground truncate">{attendance.notes || '-'}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No attendance records found for the selected date.
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="weekly">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance Overview</CardTitle>
              <CardDescription>
                Week of {format(weekStart, 'MMMM d, yyyy')} to {format(addDays(weekStart, 6), 'MMMM d, yyyy')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-6">
                  {['Audiophiles', 'Vismasters', 'adVYBE'].map(department => {
                    const departmentRecords = weeklyAttendanceData.filter(
                      record => record.department === department
                    );
                    
                    if (departmentRecords.length === 0) return null;
                    
                    const groupedByEmployee: Record<string, EmployeeAttendance[]> = {};
                    
                    departmentRecords.forEach(record => {
                      if (!groupedByEmployee[record.employeeId]) {
                        groupedByEmployee[record.employeeId] = [];
                      }
                      groupedByEmployee[record.employeeId].push(record);
                    });
                    
                    return (
                      <div key={department}>
                        <h3 className="text-lg font-semibold mb-3">{department}</h3>
                        <div className="rounded-md border overflow-hidden">
                          {Object.entries(groupedByEmployee).map(([employeeId, records]) => {
                            const employee = records[0]; // Get employee info from first record
                            
                            return (
                              <div key={employeeId} className="border-t first:border-t-0">
                                <div className="p-3 bg-gray-50">
                                  <span className="font-medium">{employee.employeeName}</span>
                                  <span className="text-sm text-muted-foreground ml-2">{employee.position}</span>
                                </div>
                                <div className="grid grid-cols-7 border-t">
                                  {Array.from({ length: 7 }).map((_, index) => {
                                    const day = addDays(weekStart, index);
                                    const dayStr = format(day, 'yyyy-MM-dd');
                                    const record = records.find(r => r.date === dayStr);
                                    
                                    return (
                                      <div key={index} className={`p-3 text-center ${isWeekend(day) ? 'bg-gray-50' : ''}`}>
                                        <div className="text-xs text-muted-foreground mb-1">
                                          {format(day, 'EEE, MMM d')}
                                        </div>
                                        
                                        {record ? (
                                          <>
                                            <Badge className={`text-xs ${attendanceStatusColor[record.attendanceStatus]}`}>
                                              {record.attendanceStatus.charAt(0).toUpperCase() + record.attendanceStatus.slice(1)}
                                            </Badge>
                                            {record.clockInTime && (
                                              <div className="text-xs mt-1">
                                                {record.clockInTime} - {record.clockOutTime || 'N/A'}
                                              </div>
                                            )}
                                          </>
                                        ) : (
                                          <Badge variant="outline" className="text-xs">
                                            Weekend
                                          </Badge>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="leave">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Leave Management</CardTitle>
                <CardDescription>View and manage employee leave requests</CardDescription>
              </div>
              <Button size="sm">New Leave Request</Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="pending" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                  <TabsTrigger value="all">All Requests</TabsTrigger>
                </TabsList>
                
                <TabsContent value="pending" className="pt-4">
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      {filteredLeaveRequests
                        .filter(request => request.status === 'pending')
                        .map(request => (
                          <Card key={request.id}>
                            <CardHeader className="pb-2">
                              <div className="flex justify-between">
                                <CardTitle className="text-base">{request.employeeName}</CardTitle>
                                <Badge className="bg-yellow-100 text-yellow-800">Pending Approval</Badge>
                              </div>
                              <CardDescription>
                                {leaveTypeLabels[request.leaveType]} • Requested on {format(parseISO(request.createdAt), 'MMM d, yyyy')}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-2 pt-0">
                              <div className="text-sm space-y-2">
                                <div>
                                  <span className="text-muted-foreground">Period: </span>
                                  {format(parseISO(request.startDate), 'MMM d, yyyy')} to {format(parseISO(request.endDate), 'MMM d, yyyy')}
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Reason: </span>
                                  {request.reason}
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2 pt-0">
                              <Button size="sm" variant="outline" className="text-red-600">Reject</Button>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
                            </CardFooter>
                          </Card>
                        ))}
                      
                      {filteredLeaveRequests.filter(request => request.status === 'pending').length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          No pending leave requests found.
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="approved" className="pt-4">
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      {filteredLeaveRequests
                        .filter(request => request.status === 'approved')
                        .map(request => (
                          <Card key={request.id}>
                            <CardHeader className="pb-2">
                              <div className="flex justify-between">
                                <CardTitle className="text-base">{request.employeeName}</CardTitle>
                                <Badge className="bg-green-100 text-green-800">Approved</Badge>
                              </div>
                              <CardDescription>
                                {leaveTypeLabels[request.leaveType]} • Requested on {format(parseISO(request.createdAt), 'MMM d, yyyy')}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-2 pt-0">
                              <div className="text-sm space-y-2">
                                <div>
                                  <span className="text-muted-foreground">Period: </span>
                                  {format(parseISO(request.startDate), 'MMM d, yyyy')} to {format(parseISO(request.endDate), 'MMM d, yyyy')}
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Reason: </span>
                                  {request.reason}
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2 pt-0">
                              <Button size="sm" variant="outline">View Details</Button>
                            </CardFooter>
                          </Card>
                        ))}
                      
                      {filteredLeaveRequests.filter(request => request.status === 'approved').length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          No approved leave requests found.
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="all" className="pt-4">
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      {filteredLeaveRequests.map(request => (
                        <Card key={request.id}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between">
                              <CardTitle className="text-base">{request.employeeName}</CardTitle>
                              <Badge className={
                                request.status === 'approved' ? "bg-green-100 text-green-800" :
                                request.status === 'pending' ? "bg-yellow-100 text-yellow-800" :
                                "bg-red-100 text-red-800"
                              }>
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </Badge>
                            </div>
                            <CardDescription>
                              {leaveTypeLabels[request.leaveType]} • Requested on {format(parseISO(request.createdAt), 'MMM d, yyyy')}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2 pt-0">
                            <div className="text-sm space-y-2">
                              <div>
                                <span className="text-muted-foreground">Period: </span>
                                {format(parseISO(request.startDate), 'MMM d, yyyy')} to {format(parseISO(request.endDate), 'MMM d, yyyy')}
                              </div>
                              <div>
                                <span className="text-muted-foreground">Reason: </span>
                                {request.reason}
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-end gap-2 pt-0">
                            <Button size="sm" variant="outline">View Details</Button>
                          </CardFooter>
                        </Card>
                      ))}
                      
                      {filteredLeaveRequests.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          No leave requests found.
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendanceDashboard;
