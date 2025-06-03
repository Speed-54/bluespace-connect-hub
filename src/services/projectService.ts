
import { apiClient } from './apiClient';

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold' | 'cancelled';
  client: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  developers: Array<{
    id: string;
    name: string;
    email: string;
    avatar?: string;
    skills: string[];
  }>;
  budget: number;
  spent?: number;
  deadline: string;
  createdAt: string;
  updatedAt: string;
  progress?: number;
  tasks?: any[];
}

interface CreateProjectRequest {
  title: string;
  description: string;
  budget: number;
  deadline: string;
  client: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  status?: 'active' | 'completed' | 'on-hold' | 'cancelled';
  developers?: Array<{
    id: string;
    name: string;
    email: string;
    avatar?: string;
    skills: string[];
  }>;
}

interface UpdateProjectRequest {
  title?: string;
  description?: string;
  status?: 'active' | 'completed' | 'on-hold' | 'cancelled';
  budget?: number;
  deadline?: string;
  progress?: number;
  tasks?: any[];
}

interface AssignDeveloperRequest {
  developerId: string;
  role?: string;
  hourlyRate?: number;
}

export class ProjectService {
  // GET /api/projects
  static async getAllProjects(filters?: {
    status?: string;
    clientId?: string;
    developerId?: string;
  }): Promise<Project[]> {
    try {
      let endpoint = '/projects';
      if (filters) {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.clientId) params.append('clientId', filters.clientId);
        if (filters.developerId) params.append('developerId', filters.developerId);
        
        if (params.toString()) {
          endpoint += `?${params.toString()}`;
        }
      }

      const response = await apiClient.get<Project[]>(endpoint);
      return response.data || [];
    } catch (error) {
      console.error('Get projects error:', error);
      throw error;
    }
  }

  // GET /api/projects/:id
  static async getProjectById(id: string): Promise<Project> {
    try {
      const response = await apiClient.get<Project>(`/projects/${id}`);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Project not found');
    } catch (error) {
      console.error('Get project error:', error);
      throw error;
    }
  }

  // POST /api/projects
  static async createProject(projectData: CreateProjectRequest): Promise<Project> {
    try {
      const response = await apiClient.post<Project>('/projects', projectData);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Project creation failed');
    } catch (error) {
      console.error('Create project error:', error);
      throw error;
    }
  }

  // PUT /api/projects/:id
  static async updateProject(id: string, updateData: UpdateProjectRequest): Promise<Project> {
    try {
      const response = await apiClient.put<Project>(`/projects/${id}`, updateData);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Project update failed');
    } catch (error) {
      console.error('Update project error:', error);
      throw error;
    }
  }

  // DELETE /api/projects/:id
  static async deleteProject(id: string): Promise<void> {
    try {
      const response = await apiClient.delete(`/projects/${id}`);
      if (!response.success) {
        throw new Error(response.message || 'Project deletion failed');
      }
    } catch (error) {
      console.error('Delete project error:', error);
      throw error;
    }
  }

  // POST /api/projects/:id/assign-developer (Admin functionality)
  static async assignDeveloperToProject(
    projectId: string, 
    assignData: AssignDeveloperRequest
  ): Promise<Project> {
    try {
      const response = await apiClient.post<Project>(
        `/projects/${projectId}/assign-developer`, 
        assignData
      );
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Developer assignment failed');
    } catch (error) {
      console.error('Assign developer error:', error);
      throw error;
    }
  }

  // DELETE /api/projects/:id/remove-developer/:developerId (Admin functionality)
  static async removeDeveloperFromProject(
    projectId: string, 
    developerId: string
  ): Promise<Project> {
    try {
      const response = await apiClient.delete<Project>(
        `/projects/${projectId}/remove-developer/${developerId}`
      );
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Developer removal failed');
    } catch (error) {
      console.error('Remove developer error:', error);
      throw error;
    }
  }

  // GET /api/projects/client/:clientId
  static async getProjectsByClient(clientId: string): Promise<Project[]> {
    try {
      const response = await apiClient.get<Project[]>(`/projects/client/${clientId}`);
      return response.data || [];
    } catch (error) {
      console.error('Get client projects error:', error);
      throw error;
    }
  }

  // GET /api/projects/developer/:developerId
  static async getProjectsByDeveloper(developerId: string): Promise<Project[]> {
    try {
      const response = await apiClient.get<Project[]>(`/projects/developer/${developerId}`);
      return response.data || [];
    } catch (error) {
      console.error('Get developer projects error:', error);
      throw error;
    }
  }
}
