
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Heart, Gift, PlusCircle, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const BenefitsDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Benefits & Perks Management</h2>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add New Benefit
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Active Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-4 w-4" />
              Eligible Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">18</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Satisfaction Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4.8/5</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Benefits</CardTitle>
          <CardDescription>Active perks and benefits for team members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start justify-between p-4 border rounded-lg">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">YouTube Premium Family Plan</h3>
                  <Badge>Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Shared subscription for up to 5 team members</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">5/5 slots used</Badge>
                  <Badge variant="outline">$17.99/month</Badge>
                </div>
              </div>
              <Button size="sm" variant="outline">Manage</Button>
            </div>
            
            <div className="flex items-start justify-between p-4 border rounded-lg">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Adobe Creative Cloud</h3>
                  <Badge>Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">For Vismasters department members</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">6/8 slots used</Badge>
                  <Badge variant="outline">$52.99/month per user</Badge>
                </div>
              </div>
              <Button size="sm" variant="outline">Manage</Button>
            </div>
            
            <div className="flex items-start justify-between p-4 border rounded-lg">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Splice Sounds</h3>
                  <Badge>Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">For Audiophiles department members</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">4/5 slots used</Badge>
                  <Badge variant="outline">$9.99/month per user</Badge>
                </div>
              </div>
              <Button size="sm" variant="outline">Manage</Button>
            </div>
            
            <div className="flex items-start justify-between p-4 border rounded-lg">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Mental Health Day</h3>
                  <Badge>Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">One paid mental health day per quarter</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">All team members</Badge>
                  <Badge variant="outline">Non-monetary</Badge>
                </div>
              </div>
              <Button size="sm" variant="outline">Manage</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BenefitsDashboard;
