
import { supabase, convertProjectStatus } from '@/integrations/supabase/client';
import { User, Client, Project, Task, Comment, Attachment, Quote, QuoteItem, Agreement, Announcement } from '../types';

// ========== MOCK DATA ==========
// These are needed because we're not targeting a specific Supabase database for this demo
// In a real app, we would implement proper API calls to Supabase for all operations

// Mock data
let MOCK_PROJECTS: Project[] = [];
let MOCK_TASKS: Task[] = [];
let MOCK_CLIENTS: Client[] = [];

// ========== API SERVICE ==========

export const usersApi = {
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
      // Return an empty array as fallback
      return [];
    }
  },
  
  getCurrent: async (): Promise<User | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
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
  }
};

export const clientsApi = {
  getAll: async (): Promise<Client[]> => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*');
        
      if (error) throw error;
      
      // Map the data to our Client type
      const clients: Client[] = data.map(client => ({
        id: client.id,
        name: client.name,
        email: client.email || '',
        phone: client.phone || undefined,
        company: client.company || undefined,
        notes: client.notes || undefined,
        documentUrl: undefined, // Not stored in DB yet
        projects: [], // We'll need to fetch this separately
        createdAt: new Date(client.created_at),
        createdBy: client.created_by
      }));
      
      return clients;
    } catch (error) {
      console.error('Error fetching clients:', error);
      return MOCK_CLIENTS;
    }
  },
  
  getById: async (id: string): Promise<Client | null> => {
    try {
      // First get the client
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .single();
        
      if (clientError) throw clientError;
      
      // Then get their projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .eq('client_id', id);
        
      if (projectsError) throw projectsError;
      
      // Map projects to our Project type
      const projects: Project[] = projectsData.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description || '',
        clientId: project.client_id || '',
        department: project.department,
        status: project.status,
        progress: project.progress || 0,
        deadline: project.deadline ? new Date(project.deadline) : new Date(),
        assignees: [], // We're not storing this in Supabase yet
        tasks: [], // We'll need to fetch these separately if needed
        attachments: [], // We'll need to fetch these separately if needed
        createdAt: new Date(project.created_at),
        updatedAt: new Date(project.updated_at),
        createdBy: project.created_by
      }));
      
      // Return the combined client with projects
      return {
        id: clientData.id,
        name: clientData.name,
        email: clientData.email || '',
        phone: clientData.phone || undefined,
        company: clientData.company || undefined,
        notes: clientData.notes || undefined,
        documentUrl: undefined, // Not stored in DB yet
        projects,
        createdAt: new Date(clientData.created_at),
        createdBy: clientData.created_by
      };
    } catch (error) {
      console.error(`Error fetching client with id ${id}:`, error);
      
      // Fall back to mock data
      const client = MOCK_CLIENTS.find(c => c.id === id);
      return client || null;
    }
  },
  
  create: async (client: Omit<Client, "id" | "projects" | "createdAt">): Promise<Client> => {
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
      
      return {
        id: data.id,
        name: data.name,
        email: data.email || '',
        phone: data.phone || undefined,
        company: data.company || undefined,
        notes: data.notes || undefined,
        documentUrl: undefined,
        projects: [],
        createdAt: new Date(data.created_at),
        createdBy: data.created_by
      };
    } catch (error) {
      console.error('Error creating client:', error);
      
      // Fall back to creating a mock client
      const newClient: Client = {
        id: `mock-${Date.now()}`,
        name: client.name,
        email: client.email,
        phone: client.phone,
        company: client.company,
        notes: client.notes,
        documentUrl: undefined,
        projects: [],
        createdAt: new Date(),
        createdBy: client.createdBy
      };
      
      MOCK_CLIENTS.push(newClient);
      return newClient;
    }
  },
  
  update: async (id: string, updates: Partial<Client>): Promise<Client | null> => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .update({
          name: updates.name,
          email: updates.email,
          phone: updates.phone,
          company: updates.company,
          notes: updates.notes
        })
        .eq('id', id)
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
        documentUrl: undefined,
        projects: [], // We're not fetching projects in this method
        createdAt: new Date(data.created_at),
        createdBy: data.created_by
      };
    } catch (error) {
      console.error(`Error updating client with id ${id}:`, error);
      
      // Fall back to updating mock client
      const clientIndex = MOCK_CLIENTS.findIndex(c => c.id === id);
      if (clientIndex !== -1) {
        MOCK_CLIENTS[clientIndex] = {
          ...MOCK_CLIENTS[clientIndex],
          ...updates
        };
        return MOCK_CLIENTS[clientIndex];
      }
      
      return null;
    }
  },
  
  delete: async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error(`Error deleting client with id ${id}:`, error);
      
      // Fall back to deleting from mock data
      const clientIndex = MOCK_CLIENTS.findIndex(c => c.id === id);
      if (clientIndex !== -1) {
        MOCK_CLIENTS.splice(clientIndex, 1);
        return true;
      }
      
      return false;
    }
  }
};

export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*');
        
      if (error) throw error;
      
      // Map the data to our Project type
      const projects: Project[] = await Promise.all(data.map(async project => {
        // Get tasks for this project
        const { data: tasksData, error: tasksError } = await supabase
          .from('tasks')
          .select('*')
          .eq('project_id', project.id);
          
        if (tasksError) throw tasksError;
        
        // Get attachments for this project
        const { data: attachmentsData, error: attachmentsError } = await supabase
          .from('attachments')
          .select('*')
          .eq('project_id', project.id);
          
        if (attachmentsError) throw attachmentsError;
        
        // Map tasks to our Task type
        const tasks: Task[] = tasksData.map(task => ({
          id: task.id,
          title: task.title,
          description: task.description || undefined,
          projectId: task.project_id || '',
          assigneeId: task.assignee_id || undefined,
          status: task.status,
          priority: task.priority,
          dueDate: task.due_date ? new Date(task.due_date) : undefined,
          department: task.department,
          comments: [], // We're not fetching comments in this method
          attachments: [], // We're not fetching attachments in this method
          dependencies: [], // We're not fetching dependencies in this method
          createdAt: new Date(task.created_at),
          updatedAt: new Date(task.updated_at),
          createdBy: task.created_by
        }));
        
        // Map attachments to our Attachment type
        const attachments: Attachment[] = attachmentsData.map(attachment => ({
          id: attachment.id,
          name: attachment.name,
          url: attachment.url,
          type: attachment.type,
          size: attachment.size,
          uploadedBy: attachment.uploaded_by,
          taskId: attachment.task_id || undefined,
          projectId: attachment.project_id || undefined,
          createdAt: new Date(attachment.created_at)
        }));
        
        return {
          id: project.id,
          title: project.title,
          description: project.description || '',
          clientId: project.client_id || '',
          department: project.department,
          status: project.status,
          progress: project.progress || 0,
          deadline: project.deadline ? new Date(project.deadline) : new Date(),
          assignees: [], // We're not storing this in Supabase yet
          tasks,
          attachments,
          createdAt: new Date(project.created_at),
          updatedAt: new Date(project.updated_at),
          createdBy: project.created_by
        };
      }));
      
      return projects;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return MOCK_PROJECTS;
    }
  },
  
  getById: async (id: string): Promise<Project | null> => {
    try {
      // Get the project
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
        
      if (projectError) throw projectError;
      
      // Get tasks for this project
      const { data: tasksData, error: tasksError } = await supabase
        .from('tasks')
        .select('*')
        .eq('project_id', id);
        
      if (tasksError) throw tasksError;
      
      // Get attachments for this project
      const { data: attachmentsData, error: attachmentsError } = await supabase
        .from('attachments')
        .select('*')
        .eq('project_id', id);
        
      if (attachmentsError) throw attachmentsError;
      
      // Map tasks to our Task type
      const tasks: Task[] = tasksData.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description || undefined,
        projectId: task.project_id || '',
        assigneeId: task.assignee_id || undefined,
        status: task.status,
        priority: task.priority,
        dueDate: task.due_date ? new Date(task.due_date) : undefined,
        department: task.department,
        comments: [], // We're not fetching comments in this method
        attachments: [], // We're not fetching attachments in this method
        dependencies: [], // We're not fetching dependencies in this method
        createdAt: new Date(task.created_at),
        updatedAt: new Date(task.updated_at),
        createdBy: task.created_by
      }));
      
      // Map attachments to our Attachment type
      const attachments: Attachment[] = attachmentsData.map(attachment => ({
        id: attachment.id,
        name: attachment.name,
        url: attachment.url,
        type: attachment.type,
        size: attachment.size,
        uploadedBy: attachment.uploaded_by,
        taskId: attachment.task_id || undefined,
        projectId: attachment.project_id || undefined,
        createdAt: new Date(attachment.created_at)
      }));
      
      return {
        id: projectData.id,
        title: projectData.title,
        description: projectData.description || '',
        clientId: projectData.client_id || '',
        department: projectData.department,
        status: projectData.status,
        progress: projectData.progress || 0,
        deadline: projectData.deadline ? new Date(projectData.deadline) : new Date(),
        assignees: [], // We're not storing this in Supabase yet
        tasks,
        attachments,
        createdAt: new Date(projectData.created_at),
        updatedAt: new Date(projectData.updated_at),
        createdBy: projectData.created_by
      };
    } catch (error) {
      console.error(`Error fetching project with id ${id}:`, error);
      
      // Fall back to mock data
      const project = MOCK_PROJECTS.find(p => p.id === id);
      return project || null;
    }
  },
  
  create: async (project: Omit<Project, "id" | "tasks" | "attachments" | "createdAt" | "updatedAt">): Promise<Project> => {
    try {
      console.log('Creating project with data:', project);

      // Convert our project status to one that Supabase accepts
      const supabaseStatus = convertProjectStatus(project.status);
      
      const { data, error } = await supabase
        .from('projects')
        .insert({
          title: project.title,
          description: project.description,
          client_id: project.clientId,
          department: project.department,
          status: supabaseStatus,
          progress: project.progress,
          deadline: project.deadline ? project.deadline.toISOString() : null,
          created_by: project.createdBy
        })
        .select()
        .single();
        
      if (error) {
        console.error('Supabase error creating project:', error);
        throw error;
      }
      
      if (data) {
        console.log('Successfully created project:', data);
        return {
          id: data.id,
          title: data.title,
          description: data.description || '',
          clientId: data.client_id || '',
          department: data.department,
          status: data.status,
          progress: data.progress || 0,
          deadline: data.deadline ? new Date(data.deadline) : new Date(),
          assignees: [], // We're not storing this in Supabase yet
          tasks: [],
          attachments: [],
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at),
          createdBy: data.created_by
        };
      }
      
      throw new Error('Failed to create project');
    } catch (error) {
      console.error('Error creating project:', error);
      
      // Fall back to creating a mock project
      const newProject: Project = {
        id: `mock-${Date.now()}`,
        title: project.title,
        description: project.description,
        clientId: project.clientId,
        department: project.department,
        status: project.status,
        progress: project.progress,
        deadline: project.deadline,
        assignees: project.assignees,
        tasks: [],
        attachments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: project.createdBy,
      };
      
      console.log('Created mock project instead:', newProject);
      MOCK_PROJECTS.push(newProject);
      return newProject;
    }
  },
  
  update: async (id: string, updates: Partial<Project>): Promise<Project | null> => {
    try {
      // Convert our project status to one that Supabase accepts if it's provided
      const supabaseStatus = updates.status ? convertProjectStatus(updates.status) : undefined;
      
      const { data, error } = await supabase
        .from('projects')
        .update({
          title: updates.title,
          description: updates.description,
          client_id: updates.clientId,
          department: updates.department,
          status: supabaseStatus,
          progress: updates.progress,
          deadline: updates.deadline ? updates.deadline.toISOString() : null
        })
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      
      return {
        id: data.id,
        title: data.title,
        description: data.description || '',
        clientId: data.client_id || '',
        department: data.department,
        status: data.status,
        progress: data.progress || 0,
        deadline: data.deadline ? new Date(data.deadline) : new Date(),
        assignees: [], // We're not storing this in Supabase yet
        tasks: [], // We're not fetching tasks in this method
        attachments: [], // We're not fetching attachments in this method
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
        createdBy: data.created_by
      };
    } catch (error) {
      console.error(`Error updating project with id ${id}:`, error);
      
      // Fall back to updating mock project
      const projectIndex = MOCK_PROJECTS.findIndex(p => p.id === id);
      if (projectIndex !== -1) {
        MOCK_PROJECTS[projectIndex] = {
          ...MOCK_PROJECTS[projectIndex],
          ...updates,
          updatedAt: new Date()
        };
        return MOCK_PROJECTS[projectIndex];
      }
      
      return null;
    }
  },
  
  delete: async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error(`Error deleting project with id ${id}:`, error);
      
      // Fall back to deleting from mock data
      const projectIndex = MOCK_PROJECTS.findIndex(p => p.id === id);
      if (projectIndex !== -1) {
        MOCK_PROJECTS.splice(projectIndex, 1);
        return true;
      }
      
      return false;
    }
  }
};

// Only implementing task APIs we need for demo purposes
export const tasksApi = {
  getAll: async (): Promise<Task[]> => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*');
        
      if (error) throw error;
      
      // Map the data to our Task type
      const tasks: Task[] = data.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description || undefined,
        projectId: task.project_id || '',
        assigneeId: task.assignee_id || undefined,
        status: task.status,
        priority: task.priority,
        dueDate: task.due_date ? new Date(task.due_date) : undefined,
        department: task.department,
        comments: [], // We'll need to fetch these separately if needed
        attachments: [], // We'll need to fetch these separately if needed
        dependencies: [], // We'll need to fetch these separately if needed
        createdAt: new Date(task.created_at),
        updatedAt: new Date(task.updated_at),
        createdBy: task.created_by
      }));
      
      return tasks;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return MOCK_TASKS;
    }
  }
};

// Export a combined API object
export const api = {
  users: usersApi,
  clients: clientsApi,
  projects: projectsApi,
  tasks: tasksApi
};
