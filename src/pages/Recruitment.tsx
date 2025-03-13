
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, UserPlus, FilePlus, User, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Recruit, Department, RecruitmentStatus } from '@/types';
import { toast } from 'sonner';

// Mock data for initial demo
const MOCK_RECRUITS: Recruit[] = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+27 123 456 789',
    position: 'Audio Engineer',
    department: 'Audiophiles',
    status: 'screening',
    notes: 'Experienced with studio recording and mixing.',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john.smith@example.com',
    position: 'Visual Designer',
    department: 'Vismasters',
    status: 'interview-scheduled',
    interviewDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    notes: 'Portfolio looks promising. Scheduling interview.',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    id: '3',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phone: '+27 987 654 321',
    position: 'Marketing Specialist',
    department: 'adVYBE',
    status: 'test-task-sent',
    notes: 'Sent test task to create a sample marketing campaign.',
    testTaskUrl: 'https://example.com/tasks/marketing-campaign',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    id: '4',
    name: 'Bob Williams',
    email: 'bob.williams@example.com',
    position: 'Onboarding Specialist',
    department: 'TeamSync',
    status: 'test-task-completed',
    testTaskUrl: 'https://example.com/tasks/onboarding-process',
    testTaskResult: 'Excellent understanding of onboarding processes and employee engagement.',
    notes: 'Very promising candidate with great organizational skills.',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
  },
];

const statusColors: Record<RecruitmentStatus, string> = {
  'new-application': 'bg-blue-100 text-blue-800',
  'screening': 'bg-purple-100 text-purple-800',
  'interview-scheduled': 'bg-yellow-100 text-yellow-800',
  'test-task-sent': 'bg-orange-100 text-orange-800',
  'test-task-completed': 'bg-cyan-100 text-cyan-800',
  'offer-made': 'bg-pink-100 text-pink-800',
  'onboarding': 'bg-green-100 text-green-800',
  'rejected': 'bg-red-100 text-red-800',
  'hired': 'bg-emerald-100 text-emerald-800',
};

const statusLabels: Record<RecruitmentStatus, string> = {
  'new-application': 'New Application',
  'screening': 'Screening',
  'interview-scheduled': 'Interview Scheduled',
  'test-task-sent': 'Test Task Sent',
  'test-task-completed': 'Test Task Completed',
  'offer-made': 'Offer Made',
  'onboarding': 'Onboarding',
  'rejected': 'Rejected',
  'hired': 'Hired',
};

const Recruitment: React.FC = () => {
  const [recruits, setRecruits] = useState<Recruit[]>(MOCK_RECRUITS);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [newRecruit, setNewRecruit] = useState<Partial<Recruit>>({
    status: 'new-application',
    department: 'TeamSync',
  });
  const [interviewDate, setInterviewDate] = useState<Date | undefined>(undefined);

  const filteredRecruits = selectedTab === 'all'
    ? recruits
    : recruits.filter(r => r.status === selectedTab);

  const handleCreateRecruit = () => {
    if (!newRecruit.name || !newRecruit.email || !newRecruit.position) {
      toast.error('Please fill in all required fields');
      return;
    }

    const recruit: Recruit = {
      id: Date.now().toString(),
      name: newRecruit.name || '',
      email: newRecruit.email || '',
      phone: newRecruit.phone,
      position: newRecruit.position || '',
      department: newRecruit.department as Department || 'TeamSync',
      status: newRecruit.status as RecruitmentStatus || 'new-application',
      notes: newRecruit.notes,
      resumeUrl: newRecruit.resumeUrl,
      interviewDate: interviewDate,
      createdAt: new Date(),
    };

    setRecruits([...recruits, recruit]);
    setIsCreateDialogOpen(false);
    setNewRecruit({
      status: 'new-application',
      department: 'TeamSync',
    });
    setInterviewDate(undefined);

    toast.success('Recruit added successfully');
  };

  const handleUpdateStatus = (id: string, newStatus: RecruitmentStatus) => {
    setRecruits(
      recruits.map(recruit =>
        recruit.id === id
          ? { ...recruit, status: newStatus, updatedAt: new Date() }
          : recruit
      )
    );

    toast.success(`Status updated to ${statusLabels[newStatus]}`);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Recruitment</h1>
          <p className="text-muted-foreground">Manage recruitment and onboarding processes</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Candidate
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Candidate</DialogTitle>
              <DialogDescription>
                Enter the candidate's information to start the recruitment process.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter candidate's name"
                  value={newRecruit.name || ''}
                  onChange={(e) => setNewRecruit({ ...newRecruit, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter candidate's email"
                  value={newRecruit.email || ''}
                  onChange={(e) => setNewRecruit({ ...newRecruit, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input
                  id="phone"
                  placeholder="Enter candidate's phone"
                  value={newRecruit.phone || ''}
                  onChange={(e) => setNewRecruit({ ...newRecruit, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  placeholder="Enter position applied for"
                  value={newRecruit.position || ''}
                  onChange={(e) => setNewRecruit({ ...newRecruit, position: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={newRecruit.department || 'TeamSync'}
                  onValueChange={(value) => setNewRecruit({ ...newRecruit, department: value as Department })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Audiophiles">Audiophiles</SelectItem>
                    <SelectItem value="Vismasters">Vismasters</SelectItem>
                    <SelectItem value="adVYBE">adVYBE</SelectItem>
                    <SelectItem value="TeamSync">TeamSync</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Enter any notes about the candidate"
                  value={newRecruit.notes || ''}
                  onChange={(e) => setNewRecruit({ ...newRecruit, notes: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resumeUrl">Resume URL (optional)</Label>
                <Input
                  id="resumeUrl"
                  placeholder="Enter link to candidate's resume"
                  value={newRecruit.resumeUrl || ''}
                  onChange={(e) => setNewRecruit({ ...newRecruit, resumeUrl: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Interview Date (optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {interviewDate ? format(interviewDate, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={interviewDate}
                      onSelect={setInterviewDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateRecruit}>Add Candidate</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="new-application">New</TabsTrigger>
            <TabsTrigger value="screening">Screening</TabsTrigger>
            <TabsTrigger value="interview-scheduled">Interview</TabsTrigger>
            <TabsTrigger value="test-task-sent">Test Task</TabsTrigger>
            <TabsTrigger value="offer-made">Offer</TabsTrigger>
            <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={selectedTab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecruits.length > 0 ? (
              filteredRecruits.map((recruit) => (
                <Card key={recruit.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{recruit.name}</CardTitle>
                        <CardDescription>{recruit.position}</CardDescription>
                      </div>
                      <Badge className={cn(statusColors[recruit.status])}>
                        {statusLabels[recruit.status]}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{recruit.email}</p>
                          {recruit.phone && <p className="text-sm text-muted-foreground">{recruit.phone}</p>}
                        </div>
                      </div>
                      
                      {recruit.interviewDate && (
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm">
                            Interview: {format(recruit.interviewDate, 'PPP')}
                          </p>
                        </div>
                      )}
                      
                      {recruit.notes && (
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground">{recruit.notes}</p>
                        </div>
                      )}
                      
                      {recruit.resumeUrl && (
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <a 
                            href={recruit.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                          >
                            View Resume
                          </a>
                        </div>
                      )}
                      
                      {recruit.testTaskUrl && (
                        <div className="flex items-center gap-2">
                          <FilePlus className="h-4 w-4 text-muted-foreground" />
                          <a 
                            href={recruit.testTaskUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                          >
                            View Test Task
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col items-stretch gap-2">
                    <div className="text-xs text-muted-foreground mb-2">
                      <span>Created: {format(recruit.createdAt, 'PPP')}</span>
                      {recruit.updatedAt && (
                        <span className="ml-2">
                          Updated: {format(recruit.updatedAt, 'PPP')}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      {recruit.status === 'new-application' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleUpdateStatus(recruit.id, 'screening')}
                        >
                          Start Screening
                        </Button>
                      )}
                      
                      {recruit.status === 'screening' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleUpdateStatus(recruit.id, 'interview-scheduled')}
                        >
                          Schedule Interview
                        </Button>
                      )}
                      
                      {recruit.status === 'interview-scheduled' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleUpdateStatus(recruit.id, 'test-task-sent')}
                        >
                          Send Test Task
                        </Button>
                      )}
                      
                      {recruit.status === 'test-task-sent' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleUpdateStatus(recruit.id, 'test-task-completed')}
                        >
                          Mark Task Completed
                        </Button>
                      )}
                      
                      {recruit.status === 'test-task-completed' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleUpdateStatus(recruit.id, 'offer-made')}
                        >
                          Make Offer
                        </Button>
                      )}
                      
                      {recruit.status === 'offer-made' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleUpdateStatus(recruit.id, 'onboarding')}
                        >
                          Start Onboarding
                        </Button>
                      )}
                      
                      {recruit.status === 'onboarding' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 text-green-600"
                          onClick={() => handleUpdateStatus(recruit.id, 'hired')}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Complete Hiring
                        </Button>
                      )}
                      
                      {['hired', 'rejected'].includes(recruit.status) ? (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          disabled
                        >
                          Process Complete
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 text-red-600"
                          onClick={() => handleUpdateStatus(recruit.id, 'rejected')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No candidates found</h3>
                <p className="text-muted-foreground mt-1">
                  {selectedTab === 'all'
                    ? 'Start by adding new candidates'
                    : `No candidates in the ${statusLabels[selectedTab as RecruitmentStatus]} stage`}
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setIsCreateDialogOpen(true)}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Candidate
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Recruitment;
