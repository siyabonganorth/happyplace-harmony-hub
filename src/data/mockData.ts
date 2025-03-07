
import { User, Client, Project, Task, Department, Comment, Attachment, TaskDependency } from '../types';

// Users
export const users: User[] = [
  {
    id: '1',
    email: 'admin@vybecartel.com',
    name: 'Alex Morgan',
    avatar: 'https://i.pravatar.cc/150?img=11',
    role: 'admin',
    department: 'Audiophiles',
    createdAt: new Date('2023-01-15'),
  },
  {
    id: '2',
    email: 'jordan@vybecartel.com',
    name: 'Jordan Lee',
    avatar: 'https://i.pravatar.cc/150?img=12',
    role: 'director', // Changed from 'manager' to 'director' which is a valid UserRole
    department: 'Vismasters',
    createdAt: new Date('2023-02-20'),
  },
  {
    id: '3',
    email: 'taylor@vybecartel.com',
    name: 'Taylor Swift',
    avatar: 'https://i.pravatar.cc/150?img=13',
    role: 'member',
    department: 'adVYBE',
    createdAt: new Date('2023-03-10'),
  },
];

// Clients
export const clients: Client[] = [
  {
    id: '1',
    name: 'Soundwave Records',
    email: 'contact@soundwave.com',
    phone: '+1 (555) 123-4567',
    company: 'Soundwave Records LLC',
    notes: 'Major record label, multiple projects per year',
    projects: [],
    createdAt: new Date('2023-01-20'),
    createdBy: '1', // Added missing createdBy property
  },
  {
    id: '2',
    name: 'Nova Artist Collective',
    email: 'management@novaartists.com',
    phone: '+1 (555) 987-6543',
    company: 'Nova Artist Management',
    notes: 'Artist management company, representing 30+ artists',
    projects: [],
    createdAt: new Date('2023-02-15'),
    createdBy: '1', // Added missing createdBy property
  },
  {
    id: '3',
    name: 'Aria Brooks',
    email: 'aria@ariamusic.com',
    phone: '+1 (555) 456-7890',
    notes: 'Independent artist, debut album',
    projects: [],
    createdAt: new Date('2023-03-05'),
    createdBy: '2', // Added missing createdBy property
  },
];

// Projects
export const projects: Project[] = [
  {
    id: '1',
    title: 'Aria Brooks - Debut Album',
    description: 'Full production and marketing for Aria\'s debut album "Neon Dreams"',
    clientId: '3',
    department: 'Audiophiles',
    status: 'in-progress',
    progress: 65,
    deadline: new Date('2023-12-15'),
    assignees: ['1', '3'],
    tasks: [],
    attachments: [],
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2023-10-18'),
    createdBy: '1', // Added missing createdBy property
  },
  {
    id: '2',
    title: 'Soundwave Showcase Event',
    description: 'Plan and execute the annual Soundwave artist showcase event',
    clientId: '1',
    department: 'adVYBE',
    status: 'planning',
    progress: 25,
    deadline: new Date('2024-02-28'),
    assignees: ['2', '3'],
    tasks: [],
    attachments: [],
    createdAt: new Date('2023-09-15'),
    updatedAt: new Date('2023-10-10'),
    createdBy: '2', // Added missing createdBy property
  },
  {
    id: '3',
    title: 'Nova Artists - Promo Videos',
    description: 'Create promotional video content for 5 Nova artists',
    clientId: '2',
    department: 'Vismasters',
    status: 'in-progress',
    progress: 40,
    deadline: new Date('2023-11-30'),
    assignees: ['2'],
    tasks: [],
    attachments: [],
    createdAt: new Date('2023-08-01'),
    updatedAt: new Date('2023-10-12'),
    createdBy: '2', // Added missing createdBy property
  },
];

// Tasks
export const tasks: Task[] = [
  {
    id: '1',
    title: 'Record final vocals for tracks 3-5',
    description: 'Schedule studio time with Aria to complete vocal recording',
    projectId: '1',
    assigneeId: '1',
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date('2023-11-05'),
    department: 'Audiophiles', // Added missing department property
    comments: [],
    attachments: [],
    dependencies: [], // Added missing dependencies property
    createdAt: new Date('2023-09-20'),
    updatedAt: new Date('2023-10-15'),
    createdBy: '1', // Added missing createdBy property
  },
  {
    id: '2',
    title: 'Mix and master "Midnight Drive" track',
    description: 'Complete the mix and send for mastering',
    projectId: '1',
    assigneeId: '1',
    status: 'todo',
    priority: 'medium',
    dueDate: new Date('2023-11-15'),
    department: 'Audiophiles', // Added missing department property
    comments: [],
    attachments: [],
    dependencies: [], // Added missing dependencies property
    createdAt: new Date('2023-09-25'),
    updatedAt: new Date('2023-09-25'),
    createdBy: '1', // Added missing createdBy property
  },
  {
    id: '3',
    title: 'Finalize venue contract for Soundwave Showcase',
    description: 'Review and sign contract with Highland Ballroom',
    projectId: '2',
    assigneeId: '3',
    status: 'review',
    priority: 'urgent',
    dueDate: new Date('2023-10-30'),
    department: 'adVYBE', // Added missing department property
    comments: [],
    attachments: [],
    dependencies: [], // Added missing dependencies property
    createdAt: new Date('2023-10-01'),
    updatedAt: new Date('2023-10-18'),
    createdBy: '2', // Added missing createdBy property
  },
  {
    id: '4',
    title: 'Create storyboard for Nova artist Jay Klein',
    description: 'Develop visual concept and storyboard for promo video',
    projectId: '3',
    assigneeId: '2',
    status: 'completed',
    priority: 'medium',
    dueDate: new Date('2023-10-10'),
    department: 'Vismasters', // Added missing department property
    comments: [],
    attachments: [],
    dependencies: [], // Added missing dependencies property
    createdAt: new Date('2023-09-15'),
    updatedAt: new Date('2023-10-12'),
    createdBy: '2', // Added missing createdBy property
  },
];

// Attach tasks to projects
projects.forEach(project => {
  project.tasks = tasks.filter(task => task.projectId === project.id);
});

// Attach projects to clients
clients.forEach(client => {
  client.projects = projects.filter(project => project.clientId === client.id);
});

// Comments
export const comments: Comment[] = [
  {
    id: '1',
    content: 'Aria is available next Tuesday and Wednesday for vocal recording.',
    authorId: '3',
    taskId: '1',
    createdAt: new Date('2023-10-10'),
    updatedAt: new Date('2023-10-10'),
  },
  {
    id: '2',
    content: 'I\'ve booked the studio for Tuesday, 10am-6pm.',
    authorId: '1',
    taskId: '1',
    createdAt: new Date('2023-10-11'),
    updatedAt: new Date('2023-10-11'),
  },
  {
    id: '3',
    content: 'Highland Ballroom is offering a 15% discount if we book by this Friday.',
    authorId: '3',
    taskId: '3',
    createdAt: new Date('2023-10-16'),
    updatedAt: new Date('2023-10-16'),
  },
];

// Attachments
export const attachments: Attachment[] = [
  {
    id: '1',
    name: 'aria_reference_tracks.zip',
    url: '#',
    type: 'application/zip',
    size: 25600000,
    uploadedBy: '3',
    projectId: '1',
    createdAt: new Date('2023-09-18'),
  },
  {
    id: '2',
    name: 'venue_contract_draft.pdf',
    url: '#',
    type: 'application/pdf',
    size: 1200000,
    uploadedBy: '3',
    taskId: '3',
    createdAt: new Date('2023-10-15'),
  },
  {
    id: '3',
    name: 'jay_klein_concept_art.jpg',
    url: '#',
    type: 'image/jpeg',
    size: 3500000,
    uploadedBy: '2',
    taskId: '4',
    createdAt: new Date('2023-10-05'),
  },
];

// Task dependencies
export const taskDependencies: TaskDependency[] = [
  {
    id: '1',
    parentTaskId: '1',
    dependentTaskId: '2',
    createdAt: new Date('2023-09-20'),
  }
];

// Attach comments to tasks
tasks.forEach(task => {
  task.comments = comments.filter(comment => comment.taskId === task.id);
});

// Attach attachments to tasks and projects
tasks.forEach(task => {
  task.attachments = attachments.filter(attachment => attachment.taskId === task.id);
});

projects.forEach(project => {
  project.attachments = attachments.filter(attachment => attachment.projectId === project.id);
});

// Attach dependencies to tasks
tasks.forEach(task => {
  task.dependencies = taskDependencies.filter(dependency => dependency.parentTaskId === task.id);
});

// Initial data for current user
export const currentUser = users[0];

// Helper function to get all departments
export const departments: Department[] = ['Audiophiles', 'Vismasters', 'adVYBE'];

// Sample data for department metrics
export const departmentMetrics = {
  Audiophiles: {
    activeProjects: 5,
    completedThisMonth: 3,
    tasksOverdue: 2,
    upcomingDeadlines: 4
  },
  Vismasters: {
    activeProjects: 7,
    completedThisMonth: 2,
    tasksOverdue: 1,
    upcomingDeadlines: 5
  },
  adVYBE: {
    activeProjects: 4,
    completedThisMonth: 1,
    tasksOverdue: 3,
    upcomingDeadlines: 2
  }
};
