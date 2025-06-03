
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProjectService, Project } from '@/services/projectService';

// Query hooks for fetching data
export const useProjects = (filters?: {
  status?: string;
  clientId?: string;
  developerId?: string;
}) => {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: () => ProjectService.getAllProjects(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => ProjectService.getProjectById(id),
    enabled: !!id,
  });
};

export const useProjectsByClient = (clientId: string) => {
  return useQuery({
    queryKey: ['projects', 'client', clientId],
    queryFn: () => ProjectService.getProjectsByClient(clientId),
    enabled: !!clientId,
  });
};

export const useProjectsByDeveloper = (developerId: string) => {
  return useQuery({
    queryKey: ['projects', 'developer', developerId],
    queryFn: () => ProjectService.getProjectsByDeveloper(developerId),
    enabled: !!developerId,
  });
};

// Mutation hooks for modifying data
export const useCreateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ProjectService.createProject,
    onSuccess: () => {
      // **BACKEND CONNECTION POINT**
      // Invalidate and refetch project queries after successful creation
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updateData }: { id: string; updateData: any }) =>
      ProjectService.updateProject(id, updateData),
    onSuccess: (data, variables) => {
      // **BACKEND CONNECTION POINT**
      // Update the specific project in cache and invalidate related queries
      queryClient.setQueryData(['project', variables.id], data);
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ProjectService.deleteProject,
    onSuccess: () => {
      // **BACKEND CONNECTION POINT**
      // Invalidate and refetch project queries after successful deletion
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

export const useAssignDeveloper = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ projectId, assignData }: { projectId: string; assignData: any }) =>
      ProjectService.assignDeveloperToProject(projectId, assignData),
    onSuccess: (data, variables) => {
      // **BACKEND CONNECTION POINT**
      // Update the specific project and invalidate related queries
      queryClient.setQueryData(['project', variables.projectId], data);
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

export const useRemoveDeveloper = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ projectId, developerId }: { projectId: string; developerId: string }) =>
      ProjectService.removeDeveloperFromProject(projectId, developerId),
    onSuccess: (data, variables) => {
      // **BACKEND CONNECTION POINT**
      // Update the specific project and invalidate related queries
      queryClient.setQueryData(['project', variables.projectId], data);
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
