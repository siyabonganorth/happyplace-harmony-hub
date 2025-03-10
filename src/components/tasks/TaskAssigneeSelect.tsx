
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usersApi } from '../../services/api';
import { User } from '../../types';

const TaskAssigneeSelect: React.FC = () => {
  const form = useFormContext();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  
  const { data: allUsers = [], isLoading: isLoadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: usersApi.getAll
  });
  
  // Filter users based on selected department
  useEffect(() => {
    const department = form.watch('department');
    setFilteredUsers(
      allUsers.filter(u => u.department === department || u.role === 'director')
    );
  }, [form.watch('department'), allUsers]);
  
  return (
    <FormField
      control={form.control}
      name="assigneeId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Assignee</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            value={field.value}
            disabled={isLoadingUsers}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select an assignee" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              {filteredUsers.map(user => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name} ({user.role})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TaskAssigneeSelect;
