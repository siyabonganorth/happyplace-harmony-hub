
export type Department = 'Audiophiles' | 'Vismasters' | 'adVYBE';

export type UserRole = 'admin' | 'director' | 'head' | 'member';

export type User = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  department: Department;
  createdAt: Date;
};

export type Client = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  notes?: string;
  projects: Project[];
  createdAt: Date;
  createdBy: string;
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
  createdBy: string;
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
  priority: TaskPriority;
  dueDate?: Date;
  department: Department;
  comments: Comment[];
  attachments: Attachment[];
  dependencies: TaskDependency[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
};

export type TaskStatus = 
  | 'todo' 
  | 'in-progress' 
  | 'review' 
  | 'completed';

export type TaskPriority = 
  | 'low' 
  | 'medium' 
  | 'high' 
  | 'urgent';

export type TaskDependency = {
  id: string;
  parentTaskId: string;
  dependentTaskId: string;
  createdAt: Date;
};

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

export type Quote = {
  id: string;
  clientId: string;
  projectTitle: string;
  description?: string;
  amount: number;
  validUntil?: Date;
  status: string;
  items: QuoteItem[];
  createdAt: Date;
  createdBy: string;
};

export type QuoteItem = {
  id: string;
  quoteId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  createdAt: Date;
};

export type Agreement = {
  id: string;
  clientId: string;
  projectId?: string;
  title: string;
  description?: string;
  fileUrl: string;
  department: Department;
  createdAt: Date;
  uploadedBy: string;
};

export type Announcement = {
  id: string;
  title: string;
  content: string;
  important: boolean;
  expiresAt?: Date;
  createdAt: Date;
  createdBy: string;
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
