
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Home, 
  Users, 
  Briefcase, 
  Calendar, 
  FileText, 
  BarChart3, 
  Settings, 
  Music, 
  Video, 
  Megaphone,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';

interface SidebarLink {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const departmentIcons = {
  'Audiophiles': <Music className="h-5 w-5" />,
  'Vismasters': <Video className="h-5 w-5" />,
  'adVYBE': <Megaphone className="h-5 w-5" />
};

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const links: SidebarLink[] = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home className="h-5 w-5" /> },
    { name: 'Projects', path: '/projects', icon: <Briefcase className="h-5 w-5" /> },
    { name: 'Clients', path: '/clients', icon: <Users className="h-5 w-5" /> },
    { name: 'Calendar', path: '/calendar', icon: <Calendar className="h-5 w-5" /> },
    { name: 'Documents', path: '/documents', icon: <FileText className="h-5 w-5" /> },
    { name: 'Reports', path: '/reports', icon: <BarChart3 className="h-5 w-5" /> },
    { name: 'Settings', path: '/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const departmentIcon = user?.department ? departmentIcons[user.department] : null;

  return (
    <aside 
      className={`bg-sidebar h-screen flex flex-col transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        {!collapsed && (
          <Logo variant="light" className="flex-1" />
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
      
      <div className="px-3 py-4 flex-1 overflow-y-auto">
        <nav className="space-y-1">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            
            return (
              <TooltipProvider key={link.path} delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={link.path}
                      className={`flex items-center px-3 py-3 rounded-md transition-colors ${
                        isActive 
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                      } ${collapsed ? 'justify-center' : 'space-x-3'}`}
                    >
                      <span>{link.icon}</span>
                      {!collapsed && <span>{link.name}</span>}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <p>{link.name}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </nav>
      </div>
      
      <div className={`p-4 border-t border-sidebar-border ${collapsed ? 'text-center' : ''}`}>
        <div className={`flex ${collapsed ? 'flex-col items-center space-y-3' : 'items-center space-x-3'}`}>
          <Avatar className="h-10 w-10 border-2 border-vybe">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-vybe text-white">
              {user?.name?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user?.name}
              </p>
              <div className="flex items-center text-xs text-sidebar-foreground/70">
                {departmentIcon}
                <span className="ml-1 truncate">{user?.department}</span>
              </div>
            </div>
          )}
          
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  className="text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
