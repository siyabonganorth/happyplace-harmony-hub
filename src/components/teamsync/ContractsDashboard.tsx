
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, Award, Clock, CheckCircle } from 'lucide-react';

const ContractsDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Contracts & Documentation</h2>
        <Button className="gap-2">
          <FileText className="h-4 w-4" />
          New Contract
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Active Contracts
            </CardTitle>
            <CardDescription>Currently valid</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">24</p>
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
            <p className="text-3xl font-bold">8</p>
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
            <p className="text-3xl font-bold">6</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all-contracts" className="w-full">
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
              <p className="text-muted-foreground">No contract data available yet. This feature is in development.</p>
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
              <p className="text-muted-foreground">No feature clearance data available yet. This feature is in development.</p>
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
              <p className="text-muted-foreground">No track deal data available yet. This feature is in development.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Contract Templates</CardTitle>
              <CardDescription>View and edit contract templates</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No templates available yet. This feature is in development.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContractsDashboard;
