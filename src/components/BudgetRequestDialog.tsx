
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, DollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long' }),
  amount: z.string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: 'Amount must be a valid number with up to 2 decimal places' })
    .transform(val => parseFloat(val)),
  justification: z.string().min(10, { message: 'Please provide at least 10 characters of justification' }),
  urgency: z.enum(['low', 'medium', 'high']),
});

type FormValues = z.infer<typeof formSchema>;

const BudgetRequestDialog: React.FC = () => {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      urgency: 'medium',
      justification: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would send the budget request to the TeamSync department
      console.log('Budget request submitted:', values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Budget request submitted successfully');
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error('Error submitting budget request:', error);
      toast.error('Failed to submit budget request');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Only department heads or directors can submit budget requests
  if (!user || (user.role !== 'head' && user.role !== 'director')) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <DollarSign className="h-4 w-4" />
          Request Budget
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Submit Budget Request</DialogTitle>
          <DialogDescription>
            Request budget for your department. This request will be reviewed by the TeamSync department.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Request Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., New Equipment, Software License, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (USD)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                      <Input placeholder="0.00" className="pl-7" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Enter the exact amount needed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="urgency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Urgency</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      <option value="low">Low - Within the next quarter</option>
                      <option value="medium">Medium - Within the next month</option>
                      <option value="high">High - Needed immediately</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="justification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Justification</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Explain why this budget is necessary and how it will benefit the team"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Be specific about the impact this will have on your department's productivity or output.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Request
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetRequestDialog;
