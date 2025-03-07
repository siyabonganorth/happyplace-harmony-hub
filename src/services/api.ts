import { supabase } from "@/integrations/supabase/client";
import { 
  User, Client, Project, Task, Comment, 
  Attachment, Quote, QuoteItem, Agreement, 
  Announcement, TaskDependency, Department, TaskStatus, TaskPriority
} from "../types";
import { toast } from "sonner";

// Helper function to format database objects to our types
const formatDate = (date: string | null): Date | undefined => {
  return date ? new Date(date) : undefined;
};

// Helper function to format Date to ISO string for Supabase
const formatDateForSupabase = (date: Date | undefined): string | null => {
  return date ? date.toISOString() : null;
};

// Convert from snake_case to camelCase
const toCamelCase = (obj: any) => {
  if (obj === null) return null;
  
  const newObj: any = {};
  Object.keys(obj).forEach(key => {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    newObj[camelKey] = obj[key];
  });
  return newObj;
};

// Handle API errors
const handleError = (error: any, customMessage?: string) => {
  console.error("API Error:", error);
  toast.error(customMessage || "An error occurred. Please try again.");
  throw error;
};

// Projects API
export const projectsApi = {
  async getAll(): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*');
      
      if (error) throw error;
      
      return (data || []).map((project: any) => ({
        id: project.id,
        title: project.title,
        description: project.description || "",
        clientId: project.client_id,
        department: project.department,
        status: project.status,
        progress: project.progress || 0,
        deadline: formatDate(project.deadline) as Date,
        assignees: [],  // We'll need to fetch these separately
        tasks: [],      // We'll need to fetch these separately
        attachments: [], // We'll need to fetch these separately
        createdAt: new Date(project.created_at),
        updatedAt: new Date(project.updated_at),
        createdBy: project.created_by
      }));
    } catch (error) {
      return handleError(error, "Failed to fetch projects");
    }
  },
  
  async getById(id: string): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      if (!data) return null;
      
      return {
        id: data.id,
        title: data.title,
        description: data.description || "",
        clientId: data.client_id,
        department: data.department,
        status: data.status,
        progress: data.progress || 0,
        deadline: formatDate(data.deadline) as Date,
        assignees: [],  // We'll need to fetch these separately
        tasks: [],      // We'll need to fetch these separately
        attachments: [], // We'll need to fetch these separately
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
        createdBy: data.created_by
      };
    } catch (error) {
      return handleError(error, "Failed to fetch project");
    }
  },
  
  async create(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'tasks' | 'attachments'>): Promise<Project> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert({
          title: project.title,
          description: project.description,
          client_id: project.clientId,
          department: project.department,
          status: project.status,
          progress: project.progress,
          deadline: formatDateForSupabase(project.deadline),
          created_by: project.createdBy
        })
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success("Project created successfully");
      
      return {
        id: data.id,
        title: data.title,
        description: data.description || "",
        clientId: data.client_id,
        department: data.department,
        status: data.status,
        progress: data.progress || 0,
        deadline: formatDate(data.deadline) as Date,
        assignees: [],
        tasks: [],
        attachments: [],
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
        createdBy: data.created_by
      };
    } catch (error) {
      return handleError(error, "Failed to create project");
    }
  },
  
  async update(project: Partial<Project> & { id: string }): Promise<Project> {
    try {
      const updateData: any = {};
      
      if (project.title) updateData.title = project.title;
      if (project.description !== undefined) updateData.description = project.description;
      if (project.clientId) updateData.client_id = project.clientId;
      if (project.department) updateData.department = project.department;
      if (project.status) updateData.status = project.status;
      if (project.progress !== undefined) updateData.progress = project.progress;
      if (project.deadline) updateData.deadline = formatDateForSupabase(project.deadline);
      
      const { data, error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', project.id)
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success("Project updated successfully");
      
      return {
        id: data.id,
        title: data.title,
        description: data.description || "",
        clientId: data.client_id,
        department: data.department,
        status: data.status,
        progress: data.progress || 0,
        deadline: formatDate(data.deadline) as Date,
        assignees: project.assignees || [],
        tasks: project.tasks || [],
        attachments: project.attachments || [],
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
        createdBy: data.created_by
      };
    } catch (error) {
      return handleError(error, "Failed to update project");
    }
  },
  
  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success("Project deleted successfully");
    } catch (error) {
      handleError(error, "Failed to delete project");
    }
  }
};

// Tasks API
export const tasksApi = {
  async getAll(): Promise<Task[]> {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*');
      
      if (error) throw error;
      
      return (data || []).map((task: any) => ({
        id: task.id,
        title: task.title,
        description: task.description || "",
        projectId: task.project_id,
        assigneeId: task.assignee_id,
        status: task.status,
        priority: task.priority,
        dueDate: formatDate(task.due_date),
        department: task.department,
        comments: [],  // We'll need to fetch these separately
        attachments: [], // We'll need to fetch these separately
        dependencies: [], // We'll need to fetch these separately
        createdAt: new Date(task.created_at),
        updatedAt: new Date(task.updated_at),
        createdBy: task.created_by
      }));
    } catch (error) {
      return handleError(error, "Failed to fetch tasks");
    }
  },
  
  async getByProject(projectId: string): Promise<Task[]> {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('project_id', projectId);
      
      if (error) throw error;
      
      return (data || []).map((task: any) => ({
        id: task.id,
        title: task.title,
        description: task.description || "",
        projectId: task.project_id,
        assigneeId: task.assignee_id,
        status: task.status,
        priority: task.priority,
        dueDate: formatDate(task.due_date),
        department: task.department,
        comments: [],  // We'll need to fetch these separately
        attachments: [], // We'll need to fetch these separately
        dependencies: [], // We'll need to fetch these separately
        createdAt: new Date(task.created_at),
        updatedAt: new Date(task.updated_at),
        createdBy: task.created_by
      }));
    } catch (error) {
      return handleError(error, "Failed to fetch project tasks");
    }
  },
  
  async getByDepartment(department: Department): Promise<Task[]> {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('department', department);
      
      if (error) throw error;
      
      return (data || []).map((task: any) => ({
        id: task.id,
        title: task.title,
        description: task.description || "",
        projectId: task.project_id,
        assigneeId: task.assignee_id,
        status: task.status,
        priority: task.priority,
        dueDate: formatDate(task.due_date),
        department: task.department,
        comments: [],  // We'll need to fetch these separately
        attachments: [], // We'll need to fetch these separately
        dependencies: [], // We'll need to fetch these separately
        createdAt: new Date(task.created_at),
        updatedAt: new Date(task.updated_at),
        createdBy: task.created_by
      }));
    } catch (error) {
      return handleError(error, "Failed to fetch department tasks");
    }
  },
  
  async getById(id: string): Promise<Task | null> {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      if (!data) return null;
      
      // Fetch comments
      const { data: commentsData } = await supabase
        .from('comments')
        .select('*')
        .eq('task_id', id);
      
      // Fetch attachments
      const { data: attachmentsData } = await supabase
        .from('attachments')
        .select('*')
        .eq('task_id', id);
      
      // Fetch dependencies
      const { data: dependenciesData } = await supabase
        .from('task_dependencies')
        .select('*')
        .eq('parent_task_id', id);
      
      const comments = (commentsData || []).map((comment: any) => ({
        id: comment.id,
        content: comment.content,
        authorId: comment.author_id,
        taskId: comment.task_id,
        createdAt: new Date(comment.created_at),
        updatedAt: new Date(comment.updated_at)
      }));
      
      const attachments = (attachmentsData || []).map((attachment: any) => ({
        id: attachment.id,
        name: attachment.name,
        url: attachment.url,
        type: attachment.type,
        size: attachment.size,
        uploadedBy: attachment.uploaded_by,
        taskId: attachment.task_id,
        projectId: attachment.project_id,
        createdAt: new Date(attachment.created_at)
      }));
      
      const dependencies = (dependenciesData || []).map((dependency: any) => ({
        id: dependency.id,
        parentTaskId: dependency.parent_task_id,
        dependentTaskId: dependency.dependent_task_id,
        createdAt: new Date(dependency.created_at)
      }));
      
      return {
        id: data.id,
        title: data.title,
        description: data.description || "",
        projectId: data.project_id,
        assigneeId: data.assignee_id,
        status: data.status,
        priority: data.priority,
        dueDate: formatDate(data.due_date),
        department: data.department,
        comments: comments,
        attachments: attachments,
        dependencies: dependencies,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
        createdBy: data.created_by
      };
    } catch (error) {
      return handleError(error, "Failed to fetch task");
    }
  },
  
  async create(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'comments' | 'attachments' | 'dependencies'>): Promise<Task> {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          title: task.title,
          description: task.description,
          project_id: task.projectId,
          assignee_id: task.assigneeId,
          status: task.status,
          priority: task.priority,
          due_date: formatDateForSupabase(task.dueDate),
          department: task.department,
          created_by: task.createdBy
        })
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success("Task created successfully");
      
      return {
        id: data.id,
        title: data.title,
        description: data.description || "",
        projectId: data.project_id,
        assigneeId: data.assignee_id,
        status: data.status,
        priority: data.priority,
        dueDate: formatDate(data.due_date),
        department: data.department,
        comments: [],
        attachments: [],
        dependencies: [],
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
        createdBy: data.created_by
      };
    } catch (error) {
      return handleError(error, "Failed to create task");
    }
  },
  
  async update(task: Partial<Task> & { id: string }): Promise<Task> {
    try {
      const updateData: any = {};
      
      if (task.title) updateData.title = task.title;
      if (task.description !== undefined) updateData.description = task.description;
      if (task.projectId) updateData.project_id = task.projectId;
      if (task.assigneeId !== undefined) updateData.assignee_id = task.assigneeId;
      if (task.status) updateData.status = task.status;
      if (task.priority) updateData.priority = task.priority;
      if (task.dueDate !== undefined) updateData.due_date = formatDateForSupabase(task.dueDate);
      if (task.department) updateData.department = task.department;
      
      const { data, error } = await supabase
        .from('tasks')
        .update(updateData)
        .eq('id', task.id)
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success("Task updated successfully");
      
      return {
        id: data.id,
        title: data.title,
        description: data.description || "",
        projectId: data.project_id,
        assigneeId: data.assignee_id,
        status: data.status,
        priority: data.priority,
        dueDate: formatDate(data.due_date),
        department: data.department,
        comments: task.comments || [],
        attachments: task.attachments || [],
        dependencies: task.dependencies || [],
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
        createdBy: data.created_by
      };
    } catch (error) {
      return handleError(error, "Failed to update task");
    }
  },
  
  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success("Task deleted successfully");
    } catch (error) {
      handleError(error, "Failed to delete task");
    }
  },
  
  async updateStatus(id: string, status: TaskStatus): Promise<void> {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success("Task status updated");
    } catch (error) {
      handleError(error, "Failed to update task status");
    }
  },
  
  async updatePriority(id: string, priority: TaskPriority): Promise<void> {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ priority })
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success("Task priority updated");
    } catch (error) {
      handleError(error, "Failed to update task priority");
    }
  },
  
  async addDependency(parentTaskId: string, dependentTaskId: string): Promise<TaskDependency> {
    try {
      const { data, error } = await supabase
        .from('task_dependencies')
        .insert({
          parent_task_id: parentTaskId,
          dependent_task_id: dependentTaskId
        })
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success("Task dependency added");
      
      return {
        id: data.id,
        parentTaskId: data.parent_task_id,
        dependentTaskId: data.dependent_task_id,
        createdAt: new Date(data.created_at)
      };
    } catch (error) {
      return handleError(error, "Failed to add task dependency");
    }
  },
  
  async removeDependency(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('task_dependencies')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success("Task dependency removed");
    } catch (error) {
      handleError(error, "Failed to remove task dependency");
    }
  }
};

// Clients API
export const clientsApi = {
  async getAll(): Promise<Client[]> {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*');
      
      if (error) throw error;
      
      return (data || []).map((client: any) => ({
        id: client.id,
        name: client.name,
        email: client.email || "",
        phone: client.phone || "",
        company: client.company || "",
        notes: client.notes || "",
        projects: [], // Would need to fetch these separately
        createdAt: new Date(client.created_at),
        createdBy: client.created_by
      }));
    } catch (error) {
      return handleError(error, "Failed to fetch clients");
    }
  },
  
  async getById(id: string): Promise<Client | null> {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      if (!data) return null;
      
      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .eq('client_id', id);
      
      const projects = (projectsData || []).map((project: any) => ({
        id: project.id,
        title: project.title,
        description: project.description || "",
        clientId: project.client_id,
        department: project.department,
        status: project.status,
        progress: project.progress || 0,
        deadline: formatDate(project.deadline) as Date,
        assignees: [], // Would need to fetch these separately
        tasks: [], // Would need to fetch these separately
        attachments: [], // Would need to fetch these separately
        createdAt: new Date(project.created_at),
        updatedAt: new Date(project.updated_at),
        createdBy: project.created_by
      }));
      
      return {
        id: data.id,
        name: data.name,
        email: data.email || "",
        phone: data.phone || "",
        company: data.company || "",
        notes: data.notes || "",
        projects: projects,
        createdAt: new Date(data.created_at),
        createdBy: data.created_by
      };
    } catch (error) {
      return handleError(error, "Failed to fetch client");
    }
  },
  
  async create(client: Omit<Client, 'id' | 'createdAt' | 'projects'>): Promise<Client> {
    try {
      const { data, error } = await supabase
        .from('clients')
        .insert({
          name: client.name,
          email: client.email,
          phone: client.phone,
          company: client.company,
          notes: client.notes,
          created_by: client.createdBy
        })
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success("Client created successfully");
      
      return {
        id: data.id,
        name: data.name,
        email: data.email || "",
        phone: data.phone || "",
        company: data.company || "",
        notes: data.notes || "",
        projects: [],
        createdAt: new Date(data.created_at),
        createdBy: data.created_by
      };
    } catch (error) {
      return handleError(error, "Failed to create client");
    }
  },
  
  async update(client: Partial<Client> & { id: string }): Promise<Client> {
    try {
      const updateData: any = {};
      
      if (client.name) updateData.name = client.name;
      if (client.email !== undefined) updateData.email = client.email;
      if (client.phone !== undefined) updateData.phone = client.phone;
      if (client.company !== undefined) updateData.company = client.company;
      if (client.notes !== undefined) updateData.notes = client.notes;
      
      const { data, error } = await supabase
        .from('clients')
        .update(updateData)
        .eq('id', client.id)
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success("Client updated successfully");
      
      return {
        id: data.id,
        name: data.name,
        email: data.email || "",
        phone: data.phone || "",
        company: data.company || "",
        notes: data.notes || "",
        projects: client.projects || [],
        createdAt: new Date(data.created_at),
        createdBy: data.created_by
      };
    } catch (error) {
      return handleError(error, "Failed to update client");
    }
  },
  
  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success("Client deleted successfully");
    } catch (error) {
      handleError(error, "Failed to delete client");
    }
  }
};

// Comments API
export const commentsApi = {
  async getByTask(taskId: string): Promise<Comment[]> {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('task_id', taskId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return (data || []).map((comment: any) => ({
        id: comment.id,
        content: comment.content,
        authorId: comment.author_id,
        taskId: comment.task_id,
        createdAt: new Date(comment.created_at),
        updatedAt: new Date(comment.updated_at)
      }));
    } catch (error) {
      return handleError(error, "Failed to fetch comments");
    }
  },
  
  async create(comment: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Comment> {
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          content: comment.content,
          author_id: comment.authorId,
          task_id: comment.taskId
        })
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success("Comment added");
      
      return {
        id: data.id,
        content: data.content,
        authorId: data.author_id,
        taskId: data.task_id,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      };
    } catch (error) {
      return handleError(error, "Failed to add comment");
    }
  },
  
  async update(comment: Pick<Comment, 'id' | 'content'>): Promise<Comment> {
    try {
      const { data, error } = await supabase
        .from('comments')
        .update({ content: comment.content })
        .eq('id', comment.id)
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success("Comment updated");
      
      return {
        id: data.id,
        content: data.content,
        authorId: data.author_id,
        taskId: data.task_id,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      };
    } catch (error) {
      return handleError(error, "Failed to update comment");
    }
  },
  
  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success("Comment deleted");
    } catch (error) {
      handleError(error, "Failed to delete comment");
    }
  }
};

// Quotes API
export const quotesApi = {
  async getAll(): Promise<Quote[]> {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*');
      
      if (error) throw error;
      
      const quotes = await Promise.all((data || []).map(async (quote: any) => {
        // Fetch quote items
        const { data: itemsData } = await supabase
          .from('quote_items')
          .select('*')
          .eq('quote_id', quote.id);
        
        const items = (itemsData || []).map((item: any) => ({
          id: item.id,
          quoteId: item.quote_id,
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unit_price,
          createdAt: new Date(item.created_at)
        }));
        
        return {
          id: quote.id,
          clientId: quote.client_id,
          projectTitle: quote.project_title,
          description: quote.description || "",
          amount: parseFloat(quote.amount.toString()),
          validUntil: formatDate(quote.valid_until),
          status: quote.status,
          items: items,
          createdAt: new Date(quote.created_at),
          createdBy: quote.created_by
        };
      }));
      
      return quotes;
    } catch (error) {
      return handleError(error, "Failed to fetch quotes");
    }
  },
  
  async getById(id: string): Promise<Quote | null> {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      if (!data) return null;
      
      // Fetch quote items
      const { data: itemsData } = await supabase
        .from('quote_items')
        .select('*')
        .eq('quote_id', id);
      
      const items = (itemsData || []).map((item: any) => ({
        id: item.id,
        quoteId: item.quote_id,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unit_price,
        createdAt: new Date(item.created_at)
      }));
      
      return {
        id: data.id,
        clientId: data.client_id,
        projectTitle: data.project_title,
        description: data.description || "",
        amount: parseFloat(data.amount.toString()),
        validUntil: formatDate(data.valid_until),
        status: data.status,
        items: items,
        createdAt: new Date(data.created_at),
        createdBy: data.created_by
      };
    } catch (error) {
      return handleError(error, "Failed to fetch quote");
    }
  },
  
  async create(quote: Omit<Quote, 'id' | 'createdAt'>, items: Omit<QuoteItem, 'id' | 'quoteId' | 'createdAt'>[]): Promise<Quote> {
    try {
      // Insert quote
      const { data, error } = await supabase
        .from('quotes')
        .insert({
          client_id: quote.clientId,
          project_title: quote.projectTitle,
          description: quote.description,
          amount: quote.amount,
          valid_until: formatDateForSupabase(quote.validUntil),
          status: quote.status || 'pending',
          created_by: quote.createdBy
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Insert quote items
      if (items.length > 0) {
        const itemsToInsert = items.map(item => ({
          quote_id: data.id,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unitPrice
        }));
        
        const { error: itemsError } = await supabase
          .from('quote_items')
          .insert(itemsToInsert);
        
        if (itemsError) throw itemsError;
      }
      
      toast.success("Quote created successfully");
      
      return {
        id: data.id,
        clientId: data.client_id,
        projectTitle: data.project_title,
        description: data.description || "",
        amount: parseFloat(data.amount.toString()),
        validUntil: formatDate(data.valid_until),
        status: data.status,
        items: items.map((item, index) => ({
          id: `temp-${index}`, // We don't have the actual IDs yet
          quoteId: data.id,
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          createdAt: new Date()
        })),
        createdAt: new Date(data.created_at),
        createdBy: data.created_by
      };
    } catch (error) {
      return handleError(error, "Failed to create quote");
    }
  },
  
  async update(quote: Partial<Quote> & { id: string }): Promise<Quote> {
    try {
      const updateData: any = {};
      
      if (quote.projectTitle) updateData.project_title = quote.projectTitle;
      if (quote.description !== undefined) updateData.description = quote.description;
      if (quote.amount !== undefined) updateData.amount = quote.amount;
      if (quote.validUntil !== undefined) updateData.valid_until = formatDateForSupabase(quote.validUntil);
      if (quote.status) updateData.status = quote.status;
      
      const { data, error } = await supabase
        .from('quotes')
        .update(updateData)
        .eq('id', quote.id)
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success("Quote updated successfully");
      
      return {
        id: data.id,
        clientId: data.client_id,
        projectTitle: data.project_title,
        description: data.description || "",
        amount: parseFloat(data.amount.toString()),
        validUntil: formatDate(data.valid_until),
        status: data.status,
        items: quote.items || [],
        createdAt: new Date(data.created_at),
        createdBy: data.created_by
      };
    } catch (error) {
      return handleError(error, "Failed to update quote");
    }
  },
  
  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('quotes')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success("Quote deleted successfully");
    } catch (error) {
      handleError(error, "Failed to delete quote");
    }
  },
  
  // Quote items
  async addItem(item: Omit<QuoteItem, 'id' | 'createdAt'>): Promise<QuoteItem> {
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
      
      // Update quote total amount
      const { data: quoteData } = await supabase
        .from('quotes')
        .select('amount')
        .eq('id', item.quoteId)
        .single();
      
      if (quoteData) {
        const newAmount = parseFloat(quoteData.amount.toString()) + (item.quantity * item.unitPrice);
        await supabase
          .from('quotes')
          .update({ amount: newAmount.toString() })
          .eq('id', item.quoteId);
      }
      
      toast.success("Quote item added");
      
      return {
        id: data.id,
        quoteId: data.quote_id,
        description: data.description,
        quantity: data.quantity,
        unitPrice: data.unit_price,
        createdAt: new Date(data.created_at)
      };
    } catch (error) {
      return handleError(error, "Failed to add quote item");
    }
  },
  
  async updateItem(item: Partial<QuoteItem> & { id: string }): Promise<QuoteItem> {
    try {
      const updateData: any = {};
      
      if (item.description) updateData.description = item.description;
      if (item.quantity !== undefined) updateData.quantity = item.quantity;
      if (item.unitPrice !== undefined) updateData.unit_price = item.unitPrice;
      
      const { data, error } = await supabase
        .from('quote_items')
        .update(updateData)
        .eq('id', item.id)
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success("Quote item updated");
      
      return {
        id: data.id,
        quoteId: data.quote_id,
        description: data.description,
        quantity: data.quantity,
        unitPrice: data.unit_price,
        createdAt: new Date(data.created_at)
      };
    } catch (error) {
      return handleError(error, "Failed to update quote item");
    }
  },
  
  async deleteItem(id: string): Promise<void> {
    try {
      // Get the item's data first for quote update
      const { data: itemData } = await supabase
        .from('quote_items')
        .select('*')
        .eq('id', id)
        .single();
      
      if (itemData) {
        const { error } = await supabase
          .from('quote_items')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        
        // Update quote total amount
        const { data: quoteData } = await supabase
          .from('quotes')
          .select('amount')
          .eq('id', itemData.quote_id)
          .single();
        
        if (quoteData) {
          const itemTotal = itemData.quantity * itemData.unitPrice

