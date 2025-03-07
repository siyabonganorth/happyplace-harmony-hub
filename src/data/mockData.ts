
import { Project, Task, Client, Announcement, Department, User, TaskStatus, TaskPriority, ProjectStatus } from '../types';
import { addDays, subDays, addWeeks } from 'date-fns';

// Create demo users
export const USERS: User[] = [
  {
    id: 'user-1',
    email: 'admin@vybecartel.com',
    name: 'Admin',
    role: 'admin',
    department: 'Audiophiles',
    createdAt: new Date()
  },
  {
    id: 'user-2',
    email: 'director@vybecartel.com',
    name: 'Director',
    role: 'director',
    department: 'Audiophiles',
    createdAt: new Date()
  },
  {
    id: 'user-3',
    email: 'head@vybecartel.com',
    name: 'Department Head',
    role: 'head',
    department: 'Vismasters',
    createdAt: new Date()
  },
  {
    id: 'user-4',
    email: 'member@vybecartel.com',
    name: 'Team Member',
    role: 'member',
    department: 'adVYBE',
    createdAt: new Date()
  }
];

// Demo clients
export const CLIENTS: Client[] = [
  {
    id: 'client-1',
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Corp',
    notes: 'Major client with multiple ongoing projects.',
    projects: [],
    createdAt: new Date(2023, 0, 15),
    createdBy: 'user-1'
  },
  {
    id: 'client-2',
    name: 'TechStart Solutions',
    email: 'info@techstart.com',
    phone: '+1 (555) 987-6543',
    company: 'TechStart',
    notes: 'New client focused on tech industry.',
    projects: [],
    createdAt: new Date(2023, 1, 10),
    createdBy: 'user-2'
  },
  {
    id: 'client-3',
    name: 'Global Retail Inc.',
    email: 'business@globalretail.com',
    phone: '+1 (555) 456-7890',
    notes: 'Retail client with seasonal campaigns.',
    projects: [],
    createdAt: new Date(2023, 2, 5),
    createdBy: 'user-1'
  }
];

// Demo projects
export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: 'Summer Campaign',
    description: 'Comprehensive summer marketing campaign for Acme Corp.',
    clientId: 'client-1',
    department: 'Audiophiles',
    status: 'in-progress',
    progress: 65,
    deadline: addWeeks(new Date(), 3),
    assignees: ['user-1', 'user-4'],
    tasks: [],
    attachments: [],
    createdAt: subDays(new Date(), 30),
    updatedAt: subDays(new Date(), 5),
    createdBy: 'user-1'
  },
  {
    id: 'project-2',
    title: 'Website Redesign',
    description: 'Complete redesign of TechStart corporate website.',
    clientId: 'client-2',
    department: 'adVYBE',
    status: 'planning',
    progress: 25,
    deadline: addWeeks(new Date(), 8),
    assignees: ['user-3', 'user-4'],
    tasks: [],
    attachments: [],
    createdAt: subDays(new Date(), 15),
    updatedAt: subDays(new Date(), 2),
    createdBy: 'user-2'
  },
  {
    id: 'project-3',
    title: 'Holiday Campaign',
    description: 'End-of-year holiday marketing campaign for Global Retail.',
    clientId: 'client-3',
    department: 'Vismasters',
    status: 'in-progress',
    progress: 40,
    deadline: addWeeks(new Date(), 6),
    assignees: ['user-2', 'user-3'],
    tasks: [],
    attachments: [],
    createdAt: subDays(new Date(), 20),
    updatedAt: subDays(new Date(), 1),
    createdBy: 'user-3'
  }
];

// Demo tasks
export const TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Create Brand Style Guide',
    description: 'Develop a comprehensive brand style guide with color schemes, typography, and usage guidelines.',
    projectId: 'project-1',
    assigneeId: 'user-4',
    status: 'in-progress',
    priority: 'high',
    dueDate: addDays(new Date(), 5),
    department: 'Vismasters',
    comments: [],
    attachments: [],
    dependencies: [],
    createdAt: subDays(new Date(), 10),
    updatedAt: subDays(new Date(), 2),
    createdBy: 'user-1'
  },
  {
    id: 'task-2',
    title: 'Audio Production for Campaign',
    description: 'Record and edit audio files for the summer campaign.',
    projectId: 'project-1',
    assigneeId: 'user-1',
    status: 'todo',
    priority: 'medium',
    dueDate: addDays(new Date(), 10),
    department: 'Audiophiles',
    comments: [],
    attachments: [],
    dependencies: [],
    createdAt: subDays(new Date(), 8),
    updatedAt: subDays(new Date(), 8),
    createdBy: 'user-2'
  },
  {
    id: 'task-3',
    title: 'Marketing Strategy Document',
    description: 'Finalize the marketing strategy document with budget allocation.',
    projectId: 'project-2',
    assigneeId: 'user-3',
    status: 'review',
    priority: 'urgent',
    dueDate: addDays(new Date(), 2),
    department: 'adVYBE',
    comments: [],
    attachments: [],
    dependencies: [],
    createdAt: subDays(new Date(), 15),
    updatedAt: subDays(new Date(), 1),
    createdBy: 'user-3'
  },
  {
    id: 'task-4',
    title: 'Social Media Content Calendar',
    description: 'Create a content calendar for social media posts.',
    projectId: 'project-3',
    assigneeId: 'user-2',
    status: 'completed',
    priority: 'medium',
    dueDate: subDays(new Date(), 2),
    department: 'adVYBE',
    comments: [],
    attachments: [],
    dependencies: [],
    createdAt: subDays(new Date(), 20),
    updatedAt: subDays(new Date(), 3),
    createdBy: 'user-4'
  }
];

// Demo announcements
export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Office Closed for Holiday',
    content: 'The office will be closed on July 4th for Independence Day. Normal operations will resume on July 5th.',
    important: true,
    expiresAt: new Date(2023, 6, 5),
    createdAt: new Date(2023, 6, 1),
    createdBy: 'user-1'
  },
  {
    id: 'ann-2',
    title: 'New Project Management System',
    content: 'We\'ve rolled out our new project management system. All team members are required to complete the training by the end of this week.',
    important: true,
    expiresAt: addDays(new Date(), 7),
    createdAt: subDays(new Date(), 2),
    createdBy: 'user-2'
  },
  {
    id: 'ann-3',
    title: 'Team Building Event',
    content: 'Join us for a team building event this Friday at 3 PM in the main conference room. Refreshments will be provided.',
    important: false,
    expiresAt: addDays(new Date(), 3),
    createdAt: subDays(new Date(), 1),
    createdBy: 'user-3'
  }
];
