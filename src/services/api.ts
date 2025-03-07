
import { supabase } from '@/integrations/supabase/client';
import { User, Client, Project, Task, Comment, Attachment, Quote, QuoteItem, Agreement, Announcement } from '../types';

// Mock projects data for demo purposes until we move this to Supabase
const MOCK_PROJECTS: Project[] = [];

const usersApi = {
  getAll: async (): Promise<User[]> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');
      
      if (error) throw error;
      
      return data.map(profile => ({
        id: profile.id,
        email: profile.email,
        name: profile.name,
        avatar: profile.avatar || undefined,
        role: profile.role,
        department: profile.department,
        createdAt: new Date(profile.created_at)
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },
  
  getCurrent: async (): Promise<User | null> => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();
      
      if (error) throw error;
      
      return {
        id: data.id,
        email: data.email,
        name: data.name,
        avatar: data.avatar || undefined,
        role: data.role,
        department: data.department,
        createdAt: new Date(data.created_at)
      };
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  },
  
  getById: async (id: string): Promise<User | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return {
        id: data.id,
        email: data.email,
        name: data.name,
        avatar: data.avatar || undefined,
        role: data.role,
        department: data.department,
        createdAt: new Date(data.created_at)
      };
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      return null;
    }
  }
};

const clientsApi = {
  getAll: async (): Promise<Client[]> => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*');
      
      if (error) throw error;
      
      return data.map(client => ({
        id: client.id,
        name: client.name,
        email: client.email || '',
        phone: client.phone || undefined,
        company: client.company || undefined,
        notes: client.notes || undefined,
        projects: [],
        createdAt: new Date(client.created_at),
        createdBy: client.created_by
      }));
    } catch (error) {
      console.error('Error fetching clients:', error);
      return [];
    }
  },
  
  create: async (client: Omit<Client, 'id' | 'projects' | 'createdAt'>): Promise<Client | null> => {
    try {
      const { data: authUser } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('clients')
        .insert({
          name: client.name,
          email: client.email,
          phone: client.phone,
          company: client.company,
          notes: client.notes,
          created_by: authUser.user?.id || client.createdBy
        })
        .select()
        .single();
      
      if (error) throw error;
      
      return {
        id: data.id,
        name: data.name,
        email: data.email || '',
        phone: data.phone || undefined,
        company: data.company || undefined,
        notes: data.notes || undefined,
        projects: [],
        createdAt: new Date(data.created_at),
        createdBy: data.created_by
      };
    } catch (error) {
      console.error('Error creating client:', error);
      return null;
    }
  }
};

const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    // For demo purposes, simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_PROJECTS;
  },
  
  getById: async (id: string): Promise<Project | null> => {
    // For demo purposes, simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_PROJECTS.find(project => project.id === id) || null;
  },
  
  create: async (project: Omit<Project, "id" | "tasks" | "attachments" | "createdAt" | "updatedAt">): Promise<Project> => {
    // For demo purposes, simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newProject: Project = {
      id: `project-${Date.now()}`,
      tasks: [],
      attachments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      ...project
    };
    
    MOCK_PROJECTS.push(newProject);
    return newProject;
  },
  
  update: async (id: string, project: Partial<Omit<Project, "id" | "createdAt">>): Promise<Project> => {
    // For demo purposes, simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = MOCK_PROJECTS.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Project not found');
    
    const updatedProject = {
      ...MOCK_PROJECTS[index],
      ...project,
      updatedAt: new Date()
    };
    
    MOCK_PROJECTS[index] = updatedProject;
    return updatedProject;
  }
};

const tasksApi = {
  getAll: async (): Promise<Task[]> => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*');
      
      if (error) throw error;
      
      return data.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description || '',
        projectId: task.project_id || '',
        assigneeId: task.assignee_id,
        status: task.status || 'todo',
        priority: task.priority || 'medium',
        dueDate: task.due_date ? new Date(task.due_date) : undefined,
        department: task.department,
        comments: [],
        attachments: [],
        dependencies: [],
        createdAt: new Date(task.created_at),
        updatedAt: new Date(task.updated_at),
        createdBy: task.created_by
      }));
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  },
  
  getByProject: async (projectId: string): Promise<Task[]> => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('project_id', projectId);
      
      if (error) throw error;
      
      return data.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description || '',
        projectId: task.project_id || '',
        assigneeId: task.assignee_id,
        status: task.status || 'todo',
        priority: task.priority || 'medium',
        dueDate: task.due_date ? new Date(task.due_date) : undefined,
        department: task.department,
        comments: [],
        attachments: [],
        dependencies: [],
        createdAt: new Date(task.created_at),
        updatedAt: new Date(task.updated_at),
        createdBy: task.created_by
      }));
    } catch (error) {
      console.error(`Error fetching tasks for project ${projectId}:`, error);
      return [];
    }
  },
  
  create: async (task: Omit<Task, 'id' | 'comments' | 'attachments' | 'dependencies' | 'createdAt' | 'updatedAt'>): Promise<Task | null> => {
    try {
      const { data: authUser } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          title: task.title,
          description: task.description,
          project_id: task.projectId,
          assignee_id: task.assigneeId,
          status: task.status,
          priority: task.priority,
          due_date: task.dueDate ? task.dueDate.toISOString() : null,
          department: task.department,
          created_by: authUser.user?.id || task.createdBy
        })
        .select()
        .single();
      
      if (error) throw error;
      
      return {
        id: data.id,
        title: data.title,
        description: data.description || '',
        projectId: data.project_id || '',
        assigneeId: data.assignee_id,
        status: data.status || 'todo',
        priority: data.priority || 'medium',
        dueDate: data.due_date ? new Date(data.due_date) : undefined,
        department: data.department,
        comments: [],
        attachments: [],
        dependencies: [],
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
        createdBy: data.created_by
      };
    } catch (error) {
      console.error('Error creating task:', error);
      return null;
    }
  },
  
  update: async (id: string, updates: Partial<Task>): Promise<Task | null> => {
    try {
      const supabaseUpdates: Record<string, any> = {};
      
      if (updates.title) supabaseUpdates.title = updates.title;
      if (updates.description !== undefined) supabaseUpdates.description = updates.description;
      if (updates.projectId) supabaseUpdates.project_id = updates.projectId;
      if (updates.assigneeId !== undefined) supabaseUpdates.assignee_id = updates.assigneeId;
      if (updates.status) supabaseUpdates.status = updates.status;
      if (updates.priority) supabaseUpdates.priority = updates.priority;
      if (updates.dueDate !== undefined) supabaseUpdates.due_date = updates.dueDate ? updates.dueDate.toISOString() : null;
      if (updates.department) supabaseUpdates.department = updates.department;
      
      const { data, error } = await supabase
        .from('tasks')
        .update(supabaseUpdates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      return {
        id: data.id,
        title: data.title,
        description: data.description || '',
        projectId: data.project_id || '',
        assigneeId: data.assignee_id,
        status: data.status || 'todo',
        priority: data.priority || 'medium',
        dueDate: data.due_date ? new Date(data.due_date) : undefined,
        department: data.department,
        comments: [],
        attachments: [],
        dependencies: [],
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
        createdBy: data.created_by
      };
    } catch (error) {
      console.error(`Error updating task ${id}:`, error);
      return null;
    }
  },
  
  delete: async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error(`Error deleting task ${id}:`, error);
      return false;
    }
  },
  
  getById: async (id: string): Promise<Task | null> => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return {
        id: data.id,
        title: data.title,
        description: data.description || '',
        projectId: data.project_id || '',
        assigneeId: data.assignee_id,
        status: data.status || 'todo',
        priority: data.priority || 'medium',
        dueDate: data.due_date ? new Date(data.due_date) : undefined,
        department: data.department,
        comments: [],
        attachments: [],
        dependencies: [],
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
        createdBy: data.created_by
      };
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error);
      return null;
    }
  }
};

const dependenciesApi = {
  create: async (parentTaskId: string, dependentTaskId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('task_dependencies')
        .insert({
          parent_task_id: parentTaskId,
          dependent_task_id: dependentTaskId
        });
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error creating task dependency:', error);
      return false;
    }
  },
  
  getByTask: async (taskId: string): Promise<{ parentTasks: Task[], dependentTasks: Task[] }> => {
    try {
      // Get parent tasks (tasks that this task depends on)
      const { data: parentTasksData, error: parentError } = await supabase
        .from('task_dependencies')
        .select('parent_task_id')
        .eq('dependent_task_id', taskId);
      
      if (parentError) throw parentError;
      
      // Get dependent tasks (tasks that depend on this task)
      const { data: dependentTasksData, error: dependentError } = await supabase
        .from('task_dependencies')
        .select('dependent_task_id')
        .eq('parent_task_id', taskId);
      
      if (dependentError) throw dependentError;
      
      // Fetch the full task details for each parent task
      const parentTasks = await Promise.all(
        parentTasksData.map(async (dependency) => {
          const task = await tasksApi.getById(dependency.parent_task_id);
          return task;
        })
      );
      
      // Fetch the full task details for each dependent task
      const dependentTasks = await Promise.all(
        dependentTasksData.map(async (dependency) => {
          const task = await tasksApi.getById(dependency.dependent_task_id);
          return task;
        })
      );
      
      return {
        parentTasks: parentTasks.filter(Boolean) as Task[],
        dependentTasks: dependentTasks.filter(Boolean) as Task[]
      };
    } catch (error) {
      console.error(`Error fetching task dependencies for task ${taskId}:`, error);
      return { parentTasks: [], dependentTasks: [] };
    }
  },
  
  delete: async (parentTaskId: string, dependentTaskId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('task_dependencies')
        .delete()
        .match({
          parent_task_id: parentTaskId,
          dependent_task_id: dependentTaskId
        });
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error deleting task dependency:', error);
      return false;
    }
  }
};

const quotesApi = {
  getAll: async (): Promise<Quote[]> => {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*');
      
      if (error) throw error;
      
      return data.map(quote => ({
        id: quote.id,
        clientId: quote.client_id,
        projectTitle: quote.project_title,
        description: quote.description || '',
        amount: Number(quote.amount),
        validUntil: quote.valid_until ? new Date(quote.valid_until) : undefined,
        status: quote.status || '',
        items: [],
        createdAt: new Date(quote.created_at),
        createdBy: quote.created_by
      }));
    } catch (error) {
      console.error('Error fetching quotes:', error);
      return [];
    }
  },
  
  create: async (quote: Omit<Quote, 'id' | 'items' | 'createdAt'>): Promise<Quote | null> => {
    try {
      const { data: authUser } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('quotes')
        .insert({
          client_id: quote.clientId,
          project_title: quote.projectTitle,
          description: quote.description,
          amount: quote.amount,
          valid_until: quote.validUntil ? quote.validUntil.toISOString() : null,
          status: quote.status,
          created_by: authUser.user?.id || quote.createdBy
        })
        .select()
        .single();
      
      if (error) throw error;
      
      return {
        id: data.id,
        clientId: data.client_id,
        projectTitle: data.project_title,
        description: data.description || '',
        amount: Number(data.amount),
        validUntil: data.valid_until ? new Date(data.valid_until) : undefined,
        status: data.status || '',
        items: [],
        createdAt: new Date(data.created_at),
        createdBy: data.created_by
      };
    } catch (error) {
      console.error('Error creating quote:', error);
      return null;
    }
  },
  
  getById: async (id: string): Promise<Quote | null> => {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      // Fetch quote items
      const { data: items, error: itemsError } = await supabase
        .from('quote_items')
        .select('*')
        .eq('quote_id', id);
      
      if (itemsError) throw itemsError;
      
      const quoteItems: QuoteItem[] = items.map(item => ({
        id: item.id,
        quoteId: item.quote_id,
        description: item.description,
        quantity: Number(item.quantity),
        unitPrice: Number(item.unit_price),
        createdAt: new Date(item.created_at)
      }));
      
      return {
        id: data.id,
        clientId: data.client_id,
        projectTitle: data.project_title,
        description: data.description || '',
        amount: Number(data.amount),
        validUntil: data.valid_until ? new Date(data.valid_until) : undefined,
        status: data.status || '',
        items: quoteItems,
        createdAt: new Date(data.created_at),
        createdBy: data.created_by
      };
    } catch (error) {
      console.error(`Error fetching quote ${id}:`, error);
      return null;
    }
  }
};

const quoteItemsApi = {
  create: async (item: Omit<QuoteItem, 'id' | 'createdAt'>): Promise<QuoteItem | null> => {
    try {
      const { data, error } = await supabase
        .from('quote_items')
        .insert({
          quote_id: item.quoteId,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unitPrice
        })
        .select()
        .single();
      
      if (error) throw error;
      
      return {
        id: data.id,
        quoteId: data.quote_id,
        description: data.description,
        quantity: Number(data.quantity),
        unitPrice: Number(data.unit_price),
        createdAt: new Date(data.created_at)
      };
    } catch (error) {
      console.error('Error creating quote item:', error);
      return null;
    }
  }
};

const agreementsApi = {
  getAll: async (): Promise<Agreement[]> => {
    try {
      const { data, error } = await supabase
        .from('agreements')
        .select('*');
      
      if (error) throw error;
      
      return data.map(agreement => ({
        id: agreement.id,
        clientId: agreement.client_id,
        projectId: agreement.project_id || undefined,
        title: agreement.title,
        description: agreement.description || undefined,
        fileUrl: agreement.file_url,
        department: agreement.department,
        createdAt: new Date(agreement.created_at),
        uploadedBy: agreement.uploaded_by
      }));
    } catch (error) {
      console.error('Error fetching agreements:', error);
      return [];
    }
  },
  
  create: async (agreement: Omit<Agreement, 'id' | 'createdAt'>): Promise<Agreement | null> => {
    try {
      const { data: authUser } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('agreements')
        .insert({
          client_id: agreement.clientId,
          project_id: agreement.projectId,
          title: agreement.title,
          description: agreement.description,
          file_url: agreement.fileUrl,
          department: agreement.department,
          uploaded_by: authUser.user?.id || agreement.uploadedBy
        })
        .select()
        .single();
      
      if (error) throw error;
      
      return {
        id: data.id,
        clientId: data.client_id,
        projectId: data.project_id || undefined,
        title: data.title,
        description: data.description || undefined,
        fileUrl: data.file_url,
        department: data.department,
        createdAt: new Date(data.created_at),
        uploadedBy: data.uploaded_by
      };
    } catch (error) {
      console.error('Error creating agreement:', error);
      return null;
    }
  }
};

const announcementsApi = {
  getAll: async (): Promise<Announcement[]> => {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return data.map(announcement => ({
        id: announcement.id,
        title: announcement.title,
        content: announcement.content,
        important: announcement.important || false,
        expiresAt: announcement.expires_at ? new Date(announcement.expires_at) : undefined,
        createdAt: new Date(announcement.created_at),
        createdBy: announcement.created_by
      }));
    } catch (error) {
      console.error('Error fetching announcements:', error);
      return [];
    }
  },
  
  // Add the missing getActive method
  getActive: async (): Promise<Announcement[]> => {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false })
        .is('expires_at', null) // Get announcements without expiration
        .or('expires_at.gt.now'); // Or get announcements that haven't expired yet
      
      if (error) throw error;
      
      return data.map(announcement => ({
        id: announcement.id,
        title: announcement.title,
        content: announcement.content,
        important: announcement.important || false,
        expiresAt: announcement.expires_at ? new Date(announcement.expires_at) : undefined,
        createdAt: new Date(announcement.created_at),
        createdBy: announcement.created_by
      }));
    } catch (error) {
      console.error('Error fetching active announcements:', error);
      return [];
    }
  },
  
  create: async (announcement: Omit<Announcement, 'id' | 'createdAt'>): Promise<Announcement | null> => {
    try {
      const { data: authUser } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('announcements')
        .insert({
          title: announcement.title,
          content: announcement.content,
          important: announcement.important,
          expires_at: announcement.expiresAt ? announcement.expiresAt.toISOString() : null,
          created_by: authUser.user?.id || announcement.createdBy
        })
        .select()
        .single();
      
      if (error) throw error;
      
      return {
        id: data.id,
        title: data.title,
        content: data.content,
        important: data.important || false,
        expiresAt: data.expires_at ? new Date(data.expires_at) : undefined,
        createdAt: new Date(data.created_at),
        createdBy: data.created_by
      };
    } catch (error) {
      console.error('Error creating announcement:', error);
      return null;
    }
  }
};

export {
  usersApi,
  clientsApi,
  projectsApi,
  tasksApi,
  dependenciesApi,
  quotesApi,
  quoteItemsApi,
  agreementsApi,
  announcementsApi
};
