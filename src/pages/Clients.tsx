
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { clientsApi } from '../services/api';
import { Button } from '@/components/ui/button';
import { PlusCircle, Pencil, Trash2, Phone, Mail, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const ClientForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast.error('Client name is required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await clientsApi.create({
        ...formData,
        createdBy: user?.id || '00000000-0000-0000-0000-000000000000'
      });
      
      toast.success('Client created successfully');
      onSuccess();
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error creating client:', error);
      toast.error('Failed to create client');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="min-h-[100px]"
          />
        </div>
      </div>
      
      <DialogFooter>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Client'}
        </Button>
      </DialogFooter>
    </form>
  );
};

const Clients: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Check if user can create clients (directors, heads, or admins)
  const canCreateClient = user?.role === 'director' || user?.role === 'head' || user?.role === 'admin';

  const { 
    data: clients = [], 
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['clients'],
    queryFn: clientsApi.getAll
  });

  const handleSuccess = () => {
    setIsDialogOpen(false);
    refetch();
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Clients</h1>
        
        <div className="flex gap-2">
          <Button onClick={() => navigate('/projects')} variant="outline">
            View Projects
          </Button>
          
          {canCreateClient && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Add Client
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Client</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new client.
                  </DialogDescription>
                </DialogHeader>
                <ClientForm onSuccess={handleSuccess} />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <Card key={i} className="w-full">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium text-gray-900">Error loading clients</h3>
          <p className="mt-1 text-sm text-gray-500">Please try again later</p>
          <Button className="mt-4" onClick={() => refetch()}>Retry</Button>
        </div>
      ) : clients.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium text-gray-900">No clients found</h3>
          {canCreateClient ? (
            <p className="mt-1 text-sm text-gray-500">Add your first client to get started</p>
          ) : (
            <p className="mt-1 text-sm text-gray-500">
              No clients have been added yet
            </p>
          )}
          {canCreateClient && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="mt-4">
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Add First Client
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Client</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new client.
                  </DialogDescription>
                </DialogHeader>
                <ClientForm onSuccess={handleSuccess} />
              </DialogContent>
            </Dialog>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map(client => (
            <Card key={client.id} className="w-full">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{client.name}</span>
                  {client.company && (
                    <span className="text-sm font-normal text-gray-500 flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      {client.company}
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {client.email && (
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    <a href={`mailto:${client.email}`} className="text-blue-600 hover:underline">
                      {client.email}
                    </a>
                  </div>
                )}
                {client.phone && (
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    <a href={`tel:${client.phone}`} className="text-blue-600 hover:underline">
                      {client.phone}
                    </a>
                  </div>
                )}
                {client.notes && (
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {client.notes}
                  </p>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/clients/${client.id}`)}
                >
                  View Details
                </Button>
                {canCreateClient && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/clients/${client.id}/edit`)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Clients;
