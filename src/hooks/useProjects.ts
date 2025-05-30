
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService, Project } from '@/services/projectService';
import { toast } from '@/hooks/use-toast';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => projectService.getAllProjects(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => projectService.getProjectById(id),
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) =>
      projectService.createProject(projectData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: 'Success',
        description: 'Project created successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to create project',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Project> }) =>
      projectService.updateProject(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: 'Success',
        description: 'Project updated successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update project',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => projectService.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: 'Success',
        description: 'Project deleted successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to delete project',
        variant: 'destructive',
      });
    },
  });
};

export const useClientProjects = (clientId: string) => {
  return useQuery({
    queryKey: ['projects', 'client', clientId],
    queryFn: () => projectService.getProjectsByClient(clientId),
    enabled: !!clientId,
  });
};

export const useDeveloperProjects = (developerId: string) => {
  return useQuery({
    queryKey: ['projects', 'developer', developerId],
    queryFn: () => projectService.getProjectsByDeveloper(developerId),
    enabled: !!developerId,
  });
};
