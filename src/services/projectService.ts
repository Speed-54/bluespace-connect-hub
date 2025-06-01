import { apiService } from './api';

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  client: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  developers: Array<{
    id: string;
    name: string;
    email: string;
    avatar: string;
    skills: string[];
  }>;
  budget: number;
  spent?: number;
  deadline: string;
  createdAt: string;
  updatedAt: string;
  progress?: number;
  tasks?: Array<{
    id: string;
    title: string;
    completed: boolean;
    assignedTo?: string;
  }>;
}

interface CreateProjectRequest extends Omit<Project, 'id' | 'createdAt' | 'updatedAt'> {}

class ProjectService {
  private storageKey = 'projects';

  private getProjects(): Project[] {
    try {
      const stored = localStorage.getItem(`bluespace_${this.storageKey}`);
      return stored ? JSON.parse(stored) : this.getDefaultProjects();
    } catch {
      return this.getDefaultProjects();
    }
  }

  private saveProjects(projects: Project[]): void {
    localStorage.setItem(`bluespace_${this.storageKey}`, JSON.stringify(projects));
  }

  private getDefaultProjects(): Project[] {
    return [
      {
        id: '1',
        title: 'E-commerce Platform',
        description: 'Modern e-commerce platform with React and Node.js',
        status: 'active',
        client: {
          id: '1',
          name: 'John Smith',
          email: 'john@techsolutions.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
        },
        developers: [
          {
            id: '2',
            name: 'Jane Developer',
            email: 'jane@dev.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
            skills: ['React', 'Node.js', 'TypeScript']
          }
        ],
        budget: 15000,
        spent: 9750,
        deadline: '2024-08-15',
        createdAt: '2024-06-01',
        updatedAt: '2024-06-15',
        progress: 65,
        tasks: [
          { id: '1', title: 'Setup project structure', completed: true },
          { id: '2', title: 'Design database schema', completed: true },
          { id: '3', title: 'Implement authentication', completed: false, assignedTo: '2' }
        ]
      },
      {
        id: '2',
        title: 'Mobile App MVP',
        description: 'Cross-platform mobile application using React Native',
        status: 'active',
        client: {
          id: '3',
          name: 'Sarah Wilson',
          email: 'sarah@innovationlabs.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
        },
        developers: [],
        budget: 8000,
        spent: 2400,
        deadline: '2024-07-20',
        createdAt: '2024-05-15',
        updatedAt: '2024-06-10',
        progress: 30
      },
      {
        id: '3',
        title: 'Website Redesign',
        description: 'Complete redesign of corporate website',
        status: 'completed',
        client: {
          id: '1',
          name: 'John Smith',
          email: 'john@techsolutions.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
        },
        developers: [
          {
            id: '2',
            name: 'Jane Developer',
            email: 'jane@dev.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
            skills: ['React', 'Node.js', 'TypeScript']
          }
        ],
        budget: 5000,
        spent: 5000,
        deadline: '2024-05-30',
        createdAt: '2024-04-01',
        updatedAt: '2024-05-30',
        progress: 100
      }
    ];
  }

  async getAllProjects(): Promise<Project[]> {
    await apiService.get('/projects');
    const projects = this.getProjects();
    console.log('Retrieved projects:', projects);
    return projects;
  }

  async getProjectById(id: string): Promise<Project | null> {
    await apiService.get(`/projects/${id}`);
    const projects = this.getProjects();
    return projects.find(project => project.id === id) || null;
  }

  async createProject(projectData: CreateProjectRequest): Promise<Project> {
    const projects = this.getProjects();
    const now = new Date().toISOString();
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
      progress: 0,
      spent: 0
    };
    
    projects.push(newProject);
    this.saveProjects(projects);
    
    await apiService.post('/projects', newProject);
    console.log('Created project:', newProject);
    return newProject;
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const projects = this.getProjects();
    const index = projects.findIndex(project => project.id === id);
    
    if (index === -1) {
      throw new Error('Project not found');
    }
    
    projects[index] = { 
      ...projects[index], 
      ...updates, 
      updatedAt: new Date().toISOString() 
    };
    this.saveProjects(projects);
    
    await apiService.put(`/projects/${id}`, projects[index]);
    console.log('Updated project:', projects[index]);
    return projects[index];
  }

  async deleteProject(id: string): Promise<boolean> {
    const projects = this.getProjects();
    const filteredProjects = projects.filter(project => project.id !== id);
    
    if (filteredProjects.length === projects.length) {
      throw new Error('Project not found');
    }
    
    this.saveProjects(filteredProjects);
    await apiService.delete(`/projects/${id}`);
    console.log('Deleted project with id:', id);
    return true;
  }

  async getProjectsByClient(clientId: string): Promise<Project[]> {
    const projects = this.getProjects();
    return projects.filter(project => project.client.id === clientId);
  }

  async getProjectsByDeveloper(developerId: string): Promise<Project[]> {
    const projects = this.getProjects();
    return projects.filter(project => 
      project.developers.some(dev => dev.id === developerId)
    );
  }

  async assignDeveloperToProject(projectId: string, developerId: string): Promise<Project> {
    // This would typically fetch developer details from userService
    // For now, we'll use mock data
    const mockDeveloper = {
      id: developerId,
      name: 'Developer Name',
      email: 'dev@example.com',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${developerId}`,
      skills: ['React', 'TypeScript']
    };

    const projects = this.getProjects();
    const project = projects.find(p => p.id === projectId);
    
    if (!project) {
      throw new Error('Project not found');
    }

    if (!project.developers.some(dev => dev.id === developerId)) {
      project.developers.push(mockDeveloper);
      project.updatedAt = new Date().toISOString();
      this.saveProjects(projects);
    }

    await apiService.put(`/projects/${projectId}/developers`, project);
    return project;
  }
}

export const projectService = new ProjectService();
