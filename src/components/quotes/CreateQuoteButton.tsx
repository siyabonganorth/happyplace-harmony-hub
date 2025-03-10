
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '../Logo';

const CreateQuoteButton: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  
  const departmentPrefix = {
    'Audiophiles': 'AUDIO',
    'Vismasters': 'VIS',
    'adVYBE': 'ADV'
  };
  
  const prefix = user?.department ? departmentPrefix[user.department] : 'VYBE';
  const quoteNumber = `${prefix}-${new Date().getFullYear().toString().substring(2)}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
  
  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
      >
        <FileText className="mr-2 h-4 w-4" />
        Create Quote
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Quote Template</DialogTitle>
            <DialogDescription>
              This is a template for creating quotes. Full functionality will be implemented in the future.
            </DialogDescription>
          </DialogHeader>
          
          <Card className="border-2 mt-4">
            <CardHeader className="bg-gray-50 border-b">
              <div className="flex justify-between items-center">
                <Logo size="sm" />
                <div className="text-right">
                  <CardTitle className="text-xl">QUOTE #{quoteNumber}</CardTitle>
                  <p className="text-sm text-muted-foreground">Date: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold mb-1">From</h3>
                  <p>VYBE Cartel</p>
                  <p>{user?.department || 'Department'}</p>
                  <p>{user?.name || 'Team Member'}</p>
                  <p>{user?.email || 'email@vybecartel.com'}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">To</h3>
                  <p>[Client Name]</p>
                  <p>[Client Company]</p>
                  <p>[Client Email]</p>
                  <p>[Client Phone]</p>
                </div>
              </div>
              
              <div className="border rounded-md mb-6">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr className="border-b">
                      <th className="text-left p-2">Item</th>
                      <th className="text-center p-2">Qty</th>
                      <th className="text-right p-2">Price</th>
                      <th className="text-right p-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">[Service Description]</td>
                      <td className="text-center p-2">1</td>
                      <td className="text-right p-2">R0.00</td>
                      <td className="text-right p-2">R0.00</td>
                    </tr>
                    <tr>
                      <td className="p-2" colSpan={2}></td>
                      <td className="p-2 text-right font-medium">Total:</td>
                      <td className="p-2 text-right font-bold">R0.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="border p-3 rounded-md bg-gray-50">
                <h3 className="font-semibold mb-1">Notes</h3>
                <p className="text-sm">This quote is valid for 30 days from the date of issue.</p>
              </div>
            </CardContent>
          </Card>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>Close Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateQuoteButton;
