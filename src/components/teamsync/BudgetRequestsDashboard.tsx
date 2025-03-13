
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';

const BudgetRequestsDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Budget Requests</h2>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Approved
            </CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">7</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              Rejected
            </CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Total Approved
            </CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$3,450</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Budget Requests</CardTitle>
          <CardDescription>Review and approve budget requests from department heads</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start justify-between p-4 border rounded-lg">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">New Audio Interface</h3>
                  <Badge>Audiophiles</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Request for a new Apollo Twin Duo audio interface for studio recording</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">$899.00</Badge>
                  <Badge variant="outline">Requested by: John Doe</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="destructive">Reject</Button>
                <Button size="sm">Approve</Button>
              </div>
            </div>
            
            <div className="flex items-start justify-between p-4 border rounded-lg">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Adobe Stock Subscription</h3>
                  <Badge>Vismasters</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Annual subscription for Adobe Stock for high-quality assets</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">$29.99/month</Badge>
                  <Badge variant="outline">Requested by: Jane Smith</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="destructive">Reject</Button>
                <Button size="sm">Approve</Button>
              </div>
            </div>
            
            <div className="flex items-start justify-between p-4 border rounded-lg">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Marketing Campaign Budget</h3>
                  <Badge>adVYBE</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Budget for promoting new artist releases on social media</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">$1,200.00</Badge>
                  <Badge variant="outline">Requested by: Alex Johnson</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="destructive">Reject</Button>
                <Button size="sm">Approve</Button>
              </div>
            </div>
            
            <div className="flex items-start justify-between p-4 border rounded-lg">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Team Building Event</h3>
                  <Badge>TeamSync</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Quarterly team building event for company morale</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">$450.00</Badge>
                  <Badge variant="outline">Requested by: Sarah Wilson</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="destructive">Reject</Button>
                <Button size="sm">Approve</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetRequestsDashboard;
