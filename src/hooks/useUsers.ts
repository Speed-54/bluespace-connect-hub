
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService } from '@/services/userService';
import { User } from '@/hooks/useAuth';

// Query hooks for fetching data
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: UserService.getAllUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => UserService.getUserById(id),
    enabled: !!id,
  });
};

export const useUsersByRole = (role: 'client' | 'developer' | 'admin') => {
  return useQuery({
    queryKey: ['users', 'role', role],
    queryFn: () => UserService.getUsersByRole(role),
    staleTime: 5 * 60 * 1000,
  });
};

// Mutation hooks for modifying data
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: UserService.createUser,
    onSuccess: () => {
      // **BACKEND CONNECTION POINT**
      // Invalidate and refetch user queries after successful creation
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updateData }: { id: string; updateData: any }) =>
      UserService.updateUser(id, updateData),
    onSuccess: (data, variables) => {
      // **BACKEND CONNECTION POINT**
      // Update the specific user in cache and invalidate related queries
      queryClient.setQueryData(['user', variables.id], data);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: UserService.deleteUser,
    onSuccess: () => {
      // **BACKEND CONNECTION POINT**
      // Invalidate and refetch user queries after successful deletion
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

// Specialized hooks for common operations
export const useDevelopers = () => {
  return useUsersByRole('developer');
};

export const useClients = () => {
  return useUsersByRole('client');
};

export const useAdmins = () => {
  return useUsersByRole('admin');
};
