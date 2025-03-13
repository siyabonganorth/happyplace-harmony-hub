
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heart, Gift, Calendar, Users, Plus, Search, Check, X, Info } from 'lucide-react';
import { format } from 'date-fns';

type BenefitType = 'medical' | 'wellness' | 'financial' | 'professional' | 'lifestyle';

interface Benefit {
  id: string;
  name: string;
  type: BenefitType;
  provider: string;
  cost: string;
  description: string;
  eligibility: string;
  isActive: boolean;
}

interface EmployeeBenefit {
  id: string;
  employeeName: string;
  employeeId: string;
  benefitId: string;
  benefitName: string;
  enrolledDate: Date;
  status: 'active' | 'pending' | 'expired';
}

// Sample benefits data
const benefitsData: Benefit[] = [
  {
    id: '1',
    name: 'Medical Aid - Standard',
    type: 'medical',
    provider: 'Discovery Health',
    cost: '1,200 ZAR/month',
    description: 'Comprehensive medical coverage for all permanent employees.',
    eligibility: 'Full-time employees after 3 months',
    isActive: true
  },
  {
    id: '2',
    name: 'Wellness Program',
    type: 'wellness',
    provider: 'Vitality',
    cost: '250 ZAR/month',
    description: 'Wellness program including gym membership discounts and health assessments.',
    eligibility: 'All employees',
    isActive: true
  },
  {
    id: '3',
    name: 'Retirement Fund',
    type: 'financial',
    provider: 'Allan Gray',
    cost: '5% of salary',
    description: 'Retirement fund with employer matching up to 5% of salary.',
    eligibility: 'Full-time employees',
    isActive: true
  },
  {
    id: '4',
    name: 'Professional Development',
    type: 'professional',
    provider: 'VYBE Academy',
    cost: 'Up to 15,000 ZAR/year',
    description: 'Annual budget for courses, certifications, and training.',
    eligibility: 'After 1 year of employment',
    isActive: true
  },
  {
    id: '5',
    name: 'Studio Access',
    type: 'lifestyle',
    provider: 'Internal',
    cost: 'No additional cost',
    description: 'After-hours access to studio facilities for personal projects.',
    eligibility: 'All employees',
    isActive: true
  },
  {
    id: '6',
    name: 'Sabbatical Leave',
    type: 'lifestyle',
    provider: 'Internal',
    cost: 'Paid leave',
    description: '1 month paid sabbatical leave for personal creative projects.',
    eligibility: 'After 3 years of employment',
    isActive: true
  },
];

// Sample employee benefits data
const employeeBenefitsData: EmployeeBenefit[] = [
  {
    id: '1',
    employeeName: 'Mntungwa',
    employeeId: 'audio-head-1',
    benefitId: '1',
    benefitName: 'Medical Aid - Standard',
    enrolledDate: new Date('2023-01-15'),
    status: 'active'
  },
  {
    id: '2',
    employeeName: 'Mntungwa',
    employeeId: 'audio-head-1',
    benefitId: '2',
    benefitName: 'Wellness Program',
    enrolledDate: new Date('2023-01-15'),
    status: 'active'
  },
  {
    id: '3',
    employeeName: 'Neo',
    employeeId: 'vis-head-1',
    benefitId: '1',
    benefitName: 'Medical Aid - Standard',
    enrolledDate: new Date('2023-02-01'),
    status: 'active'
  },
  {
    id: '4',
    employeeName: 'Neo',
    employeeId: 'vis-head-1',
    benefitId: '3',
    benefitName: 'Retirement Fund',
    enrolledDate: new Date('2023-02-01'),
    status: 'active'
  },
  {
    id: '5',
    employeeName: 'Lungile',
    employeeId: 'ad-head-1',
    benefitId: '1',
    benefitName: 'Medical Aid - Standard',
    enrolledDate: new Date('2023-02-10'),
    status: 'active'
  },
  {
    id: '6',
    employeeName: 'Audio Team Member 1',
    employeeId: 'audio-member-1',
    benefitId: '5',
    benefitName: 'Studio Access',
    enrolledDate: new Date('2023-03-15'),
    status: 'active'
  },
  {
    id: '7',
    employeeName: 'Audio Team Member 1',
    employeeId: 'audio-member-1',
    benefitId: '2',
    benefitName: 'Wellness Program',
    enrolledDate: new Date('2023-04-01'),
    status: 'pending'
  },
];

const BenefitsDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all-benefits');
  const [showAddBenefitDialog, setShowAddBenefitDialog] = useState(false);
  const [showAssignBenefitDialog, setShowAssignBenefitDialog] = useState(false);

  // Filter benefits based on search term and active tab
  const filteredBenefits = benefitsData.filter(benefit => {
    const matchesSearch = benefit.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         benefit.provider.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all-benefits') return matchesSearch;
    return benefit.type === activeTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Employee Benefits & Perks</h2>
        <div className="flex gap-2">
          <Dialog open={showAssignBenefitDialog} onOpenChange={setShowAssignBenefitDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Users className="h-4 w-4" />
                Assign Benefit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign Benefit to Employee</DialogTitle>
                <DialogDescription>
                  Select an employee and benefit to assign.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="employee">Employee</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="audio-head-1">Mntungwa (Audiophiles Head)</SelectItem>
                      <SelectItem value="vis-head-1">Neo (Vismasters Head)</SelectItem>
                      <SelectItem value="ad-head-1">Lungile (adVYBE Head)</SelectItem>
                      <SelectItem value="audio-member-1">Audio Team Member 1</SelectItem>
                      <SelectItem value="vis-member-1">Visual Team Member 1</SelectItem>
                      <SelectItem value="ad-member-1">Ad Team Member 1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="benefit">Benefit</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select benefit" />
                    </SelectTrigger>
                    <SelectContent>
                      {benefitsData.map(benefit => (
                        <SelectItem key={benefit.id} value={benefit.id}>
                          {benefit.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea id="notes" placeholder="Any special considerations or notes..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAssignBenefitDialog(false)}>Cancel</Button>
                <Button onClick={() => setShowAssignBenefitDialog(false)}>Assign Benefit</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={showAddBenefitDialog} onOpenChange={setShowAddBenefitDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Heart className="h-4 w-4" />
                Add New Benefit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Benefit</DialogTitle>
                <DialogDescription>
                  Create a new benefit that can be assigned to employees.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="benefit-name">Benefit Name</Label>
                  <Input id="benefit-name" placeholder="Enter benefit name" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="benefit-type">Benefit Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select benefit type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="wellness">Wellness</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="professional">Professional Development</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="provider">Provider</Label>
                  <Input id="provider" placeholder="Enter benefit provider" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cost">Cost</Label>
                  <Input id="cost" placeholder="e.g., 1,000 ZAR/month" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the benefit..." />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="eligibility">Eligibility</Label>
                  <Input id="eligibility" placeholder="e.g., Full-time employees after 3 months" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddBenefitDialog(false)}>Cancel</Button>
                <Button onClick={() => setShowAddBenefitDialog(false)}>Add Benefit</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Active Benefits
            </CardTitle>
            <CardDescription>Total available</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{benefitsData.filter(b => b.isActive).length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-4 w-4" />
              Enrollment Rate
            </CardTitle>
            <CardDescription>Benefits utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">76%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Upcoming Perks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{employeeBenefitsData.filter(eb => eb.status === 'pending').length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search benefits..." 
            className="pl-8" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all-benefits" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="all-benefits">All Benefits</TabsTrigger>
          <TabsTrigger value="medical">Medical</TabsTrigger>
          <TabsTrigger value="wellness">Wellness</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
          <TabsTrigger value="enrollments">Employee Enrollments</TabsTrigger>
        </TabsList>
        
        {activeTab !== 'enrollments' ? (
          <TabsContent value={activeTab}>
            <Card>
              <CardHeader>
                <CardTitle>{activeTab === 'all-benefits' ? 'All Benefits' : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Benefits`}</CardTitle>
                <CardDescription>Available employee benefits and perks</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {filteredBenefits.length > 0 ? (
                      filteredBenefits.map(benefit => (
                        <Card key={benefit.id}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between">
                              <CardTitle className="text-base">{benefit.name}</CardTitle>
                              <Badge 
                                variant={benefit.isActive ? "default" : "outline"}
                                className={benefit.isActive ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                              >
                                {benefit.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                            <CardDescription>
                              Provider: {benefit.provider} • Cost: {benefit.cost}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2 pt-0">
                            <div className="text-sm space-y-2">
                              <p>{benefit.description}</p>
                              <p className="text-muted-foreground"><span className="font-medium">Eligibility:</span> {benefit.eligibility}</p>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-end gap-2 pt-0">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm">Assign to Employee</Button>
                          </CardFooter>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No benefits found matching your search.
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        ) : (
          <TabsContent value="enrollments">
            <Card>
              <CardHeader>
                <CardTitle>Employee Benefit Enrollments</CardTitle>
                <CardDescription>View and manage employee benefit assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {employeeBenefitsData.length > 0 ? (
                      employeeBenefitsData.map(enrollment => (
                        <Card key={enrollment.id}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between">
                              <CardTitle className="text-base">{enrollment.employeeName}</CardTitle>
                              <Badge variant={
                                enrollment.status === 'active' ? "default" : 
                                enrollment.status === 'pending' ? "outline" : "secondary"
                              }
                              className={
                                enrollment.status === 'active' ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                                enrollment.status === 'pending' ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" : ""
                              }>
                                {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                              </Badge>
                            </div>
                            <CardDescription>
                              Benefit: {enrollment.benefitName}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2 pt-0">
                            <div className="text-sm">
                              <span className="text-muted-foreground">Enrolled: </span>
                              {format(enrollment.enrolledDate, 'MMMM d, yyyy')}
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-end gap-2 pt-0">
                            {enrollment.status === 'pending' && (
                              <>
                                <Button size="sm" variant="outline" className="text-green-600">
                                  <Check className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600">
                                  <X className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}
                            {enrollment.status === 'active' && (
                              <Button size="sm" variant="outline">
                                <Info className="h-4 w-4 mr-1" />
                                Details
                              </Button>
                            )}
                          </CardFooter>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No employee benefit enrollments found.
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default BenefitsDashboard;
