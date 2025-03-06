
export type User = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'manager' | 'member';
  department: Department;
  createdAt: Date;
};

export type Department = 'Audiophiles' | 'Vismasters' | 'adVYBE';

export type Client = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  notes?: string;
  projects: Project[];
  createdAt: Date;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  clientId: string;
  department: Department;
  status: ProjectStatus;
  progress: number;
  deadline: Date;
  assignees: string[];
  tasks: Task[];
  attachments: Attachment[];
  createdAt: Date;
  updatedAt: Date;
};

export type ProjectStatus = 
  | 'planning' 
  | 'in-progress' 
  | 'review' 
  | 'completed' 
  | 'on-hold';

export type Task = {
  id: string;
  title: string;
  description?: string;
  projectId: string;
  assigneeId?: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: Date;
  comments: Comment[];
  attachments: Attachment[];
  createdAt: Date;
  updatedAt: Date;
};

export type TaskStatus = 
  | 'todo' 
  | 'in-progress' 
  | 'review' 
  | 'completed';

export type Comment = {
  id: string;
  content: string;
  authorId: string;
  taskId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Attachment = {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedBy: string;
  taskId?: string;
  projectId?: string;
  createdAt: Date;
};

export type Notification = {
  id: string;
  type: 'task-assigned' | 'task-updated' | 'project-updated' | 'comment-added' | 'deadline-approaching';
  message: string;
  read: boolean;
  userId: string;
  linkTo?: string;
  createdAt: Date;
};
