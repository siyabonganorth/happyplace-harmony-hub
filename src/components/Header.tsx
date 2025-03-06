
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, Search, Plus, Calendar, CheckSquare, MessageSquareMore } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const Header: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-16 px-6 border-b border-border flex items-center justify-between bg-background">
      <div className="flex-1 flex items-center">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search projects, clients, tasks..."
            className="pl-10 bg-secondary border-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-0 min-h-0 h-5 bg-vybe">3</Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-y-auto">
              <NotificationItem 
                icon={<CheckSquare className="h-4 w-4 text-green-500" />}
                title="Task completed"
                description="Alex completed 'Create storyboard for Nova artist'"
                time="10m ago"
              />
              <NotificationItem 
                icon={<Calendar className="h-4 w-4 text-blue-500" />}
                title="Upcoming deadline"
                description="'Aria Brooks - Debut Album' is due in 3 days"
                time="1h ago"
              />
              <NotificationItem 
                icon={<MessageSquareMore className="h-4 w-4 text-vybe" />}
                title="New comment"
                description="Taylor left a comment on 'Record final vocals'"
                time="2h ago"
              />
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-vybe font-medium cursor-pointer">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="default" size="sm" className="bg-vybe hover:bg-vybe/90">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center space-x-2 cursor-pointer">
              <Avatar className="h-8 w-8 border border-border">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-vybe text-white">
                  {user?.name?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm hidden md:inline-block">{user?.name}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Account Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

interface NotificationItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ icon, title, description, time }) => {
  return (
    <div className="p-3 hover:bg-secondary cursor-pointer">
      <div className="flex">
        <div className="mt-0.5 mr-3 bg-secondary rounded-full p-2">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          <p className="text-xs text-muted-foreground mt-1">{time}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
