
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
import { FileText, Award, Clock, CheckCircle, Upload, Download, Search, Filter, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { ContractType, Department } from '@/types';

// Sample contract data
const contractsData = [
  {
    id: '1',
    name: 'Thami Dish Entertainment - Production Deal',
    type: 'full-time' as ContractType,
    department: 'Audiophiles' as Department,
    startDate: new Date('2023-10-15'),
    endDate: new Date('2024-10-14'),
    status: 'active',
    value: '450,000 ZAR'
  },
  {
    id: '2',
    name: 'Shekhinah - 3-Track Deal',
    type: '3-track-deal' as ContractType,
    department: 'Audiophiles' as Department,
    startDate: new Date('2023-11-01'),
    endDate: new Date('2024-02-28'),
    status: 'active',
    value: '220,000 ZAR'
  },
  {
    id: '3',
    name: 'Focalistic - Feature Clearance',
    type: 'feature-clearance' as ContractType,
    department: 'Audiophiles' as Department,
    startDate: new Date('2023-12-01'),
    endDate: new Date('2024-01-15'),
    status: 'active',
    value: '75,000 ZAR'
  },
  {
    id: '4',
    name: 'Durban International Film Festival - Visual Production',
    type: 'project-based' as ContractType,
    department: 'Vismasters' as Department,
    startDate: new Date('2023-09-01'),
    endDate: new Date('2024-03-31'),
    status: 'active',
    value: '280,000 ZAR'
  },
  {
    id: '5',
    name: 'Makhadzi - Marketing Campaign',
    type: 'project-based' as ContractType,
    department: 'adVYBE' as Department,
    startDate: new Date('2023-11-15'),
    endDate: new Date('2024-01-15'),
    status: 'active',
    value: '120,000 ZAR'
  },
  {
    id: '6',
    name: 'Stimela Studios - Studio Rental',
    type: 'part-time' as ContractType,
    department: 'Audiophiles' as Department,
    startDate: new Date('2023-08-01'),
    endDate: new Date('2024-07-31'),
    status: 'active',
    value: '180,000 ZAR'
  },
];

// Sample template data
const templateData = [
  { id: '1', name: 'Standard Full-Time Contract', type: 'full-time' as ContractType },
  { id: '2', name: 'Part-Time Agreement', type: 'part-time' as ContractType },
  { id: '3', name: 'Project-Based Contract', type: 'project-based' as ContractType },
  { id: '4', name: 'Standard 3-Track Deal', type: '3-track-deal' as ContractType },
  { id: '5', name: 'Feature Clearance Agreement', type: 'feature-clearance' as ContractType },
  { id: '6', name: 'Internship Agreement', type: 'intern' as ContractType },
];

const ContractsDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all-contracts');
  
  // Filter contracts based on selected tab and search term
  const filteredContracts = contractsData.filter(contract => {
    const matchesSearch = contract.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedTab === 'all-contracts') return matchesSearch;
    if (selectedTab === 'feature-clearances') return contract.type === 'feature-clearance' && matchesSearch;
    if (selectedTab === 'track-deals') return contract.type === '3-track-deal' && matchesSearch;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Contracts & Documentation</h2>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <FileText className="h-4 w-4" />
              New Contract
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Contract</DialogTitle>
              <DialogDescription>
                Enter the details for the new contract or select a template.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="contract-name">Contract Name</Label>
                <Input id="contract-name" placeholder="Enter contract name or description" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contract-type">Contract Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select contract type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-Time Contract</SelectItem>
                    <SelectItem value="part-time">Part-Time Agreement</SelectItem>
                    <SelectItem value="project-based">Project-Based Contract</SelectItem>
                    <SelectItem value="3-track-deal">3-Track Deal</SelectItem>
                    <SelectItem value="feature-clearance">Feature Clearance</SelectItem>
                    <SelectItem value="intern">Internship Agreement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Audiophiles">Audiophiles</SelectItem>
                    <SelectItem value="Vismasters">Vismasters</SelectItem>
                    <SelectItem value="adVYBE">adVYBE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contract-value">Contract Value (ZAR)</Label>
                <Input id="contract-value" type="text" placeholder="Enter contract value" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contract-file">Upload Contract Document</Label>
                <div className="flex items-center gap-2">
                  <Input id="contract-file" type="file" className="flex-1" />
                  <Button variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" placeholder="Enter any additional information about the contract" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
              <Button onClick={() => setShowCreateDialog(false)}>Create Contract</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Active Contracts
            </CardTitle>
            <CardDescription>Currently valid</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{contractsData.filter(c => c.status === 'active').length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-4 w-4" />
              Feature Clearances
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{contractsData.filter(c => c.type === 'feature-clearance').length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Expiring Soon
            </CardTitle>
            <CardDescription>Next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              3-Track Deals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{contractsData.filter(c => c.type === '3-track-deal').length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search contracts..." 
            className="pl-8" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all-contracts" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList>
          <TabsTrigger value="all-contracts">All Contracts</TabsTrigger>
          <TabsTrigger value="feature-clearances">Feature Clearances</TabsTrigger>
          <TabsTrigger value="track-deals">3-Track Deals</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-contracts">
          <Card>
            <CardHeader>
              <CardTitle>All Contracts</CardTitle>
              <CardDescription>View and manage all active contracts</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {filteredContracts.length > 0 ? (
                    filteredContracts.map(contract => (
                      <Card key={contract.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-base">{contract.name}</CardTitle>
                            <Badge variant="outline" className="ml-2">
                              {contract.type.replace('-', ' ')}
                            </Badge>
                          </div>
                          <CardDescription>
                            {contract.department} • Value: {contract.value}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2 pt-0">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Period: </span>
                            {format(contract.startDate, 'MMM d, yyyy')} - {format(contract.endDate, 'MMM d, yyyy')}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 pt-0">
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline">View Details</Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No contracts found matching your search.
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="feature-clearances">
          <Card>
            <CardHeader>
              <CardTitle>Feature Clearances</CardTitle>
              <CardDescription>Manage artist feature clearances</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {filteredContracts.length > 0 ? (
                    filteredContracts.map(contract => (
                      <Card key={contract.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-base">{contract.name}</CardTitle>
                            <Badge variant="outline" className="ml-2">
                              {contract.type.replace('-', ' ')}
                            </Badge>
                          </div>
                          <CardDescription>
                            {contract.department} • Value: {contract.value}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2 pt-0">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Period: </span>
                            {format(contract.startDate, 'MMM d, yyyy')} - {format(contract.endDate, 'MMM d, yyyy')}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 pt-0">
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline">View Details</Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No feature clearances found matching your search.
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="track-deals">
          <Card>
            <CardHeader>
              <CardTitle>3-Track Deals</CardTitle>
              <CardDescription>Manage 3-track deal agreements</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {filteredContracts.length > 0 ? (
                    filteredContracts.map(contract => (
                      <Card key={contract.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-base">{contract.name}</CardTitle>
                            <Badge variant="outline" className="ml-2">
                              {contract.type.replace('-', ' ')}
                            </Badge>
                          </div>
                          <CardDescription>
                            {contract.department} • Value: {contract.value}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2 pt-0">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Period: </span>
                            {format(contract.startDate, 'MMM d, yyyy')} - {format(contract.endDate, 'MMM d, yyyy')}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 pt-0">
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline">View Details</Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No 3-track deals found matching your search.
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Contract Templates</CardTitle>
                <CardDescription>Standardized contract templates</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Template
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templateData.map(template => (
                  <Card key={template.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <Badge variant="outline">{template.type.replace('-', ' ')}</Badge>
                      </div>
                    </CardHeader>
                    <CardFooter className="flex justify-end gap-2 pt-0">
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">Edit</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContractsDashboard;
