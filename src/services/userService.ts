
import { User } from '@/hooks/useAuth';
import { apiService } from './api';

interface CreateUserRequest extends Omit<User, 'id'> {
  password?: string;
}

interface UpdateUserRequest extends Partial<User> {
  id: string;
}

class UserService {
  private storageKey = 'users';

  private getUsers(): User[] {
    try {
      const stored = localStorage.getItem(`bluespace_${this.storageKey}`);
      return stored ? JSON.parse(stored) : this.getDefaultUsers();
    } catch {
      return this.getDefaultUsers();
    }
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(`bluespace_${this.storageKey}`, JSON.stringify(users));
  }

  private getDefaultUsers(): User[] {
    return [
      {
        id: '1',
        name: 'John Smith',
        email: 'john@techsolutions.com',
        role: 'client',
        company: 'Tech Solutions Inc.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
      },
      {
        id: '2',
        name: 'Jane Developer',
        email: 'jane@dev.com',
        role: 'developer',
        skills: ['React', 'Node.js', 'TypeScript', 'Python'],
        bio: 'Full-stack developer with 5+ years experience in modern web technologies',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane'
      },
      {
        id: '3',
        name: 'Sarah Wilson',
        email: 'sarah@innovationlabs.com',
        role: 'client',
        company: 'Innovation Labs',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
      },
      {
        id: '4',
        name: 'Admin User',
        email: 'admin@bluespace.tech',
        role: 'admin',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
      }
    ];
  }

  async getAllUsers(): Promise<User[]> {
    await apiService.get('/users');
    const users = this.getUsers();
    console.log('Retrieved users:', users);
    return users;
  }

  async getUserById(id: string): Promise<User | null> {
    await apiService.get(`/users/${id}`);
    const users = this.getUsers();
    return users.find(user => user.id === id) || null;
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    const users = this.getUsers();
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`
    };
    
    users.push(newUser);
    this.saveUsers(users);
    
    await apiService.post('/users', newUser);
    console.log('Created user:', newUser);
    return newUser;
  }

  async updateUser(userData: UpdateUserRequest): Promise<User> {
    const users = this.getUsers();
    const index = users.findIndex(user => user.id === userData.id);
    
    if (index === -1) {
      throw new Error('User not found');
    }
    
    users[index] = { ...users[index], ...userData };
    this.saveUsers(users);
    
    await apiService.put(`/users/${userData.id}`, users[index]);
    console.log('Updated user:', users[index]);
    return users[index];
  }

  async deleteUser(id: string): Promise<boolean> {
    const users = this.getUsers();
    const filteredUsers = users.filter(user => user.id !== id);
    
    if (filteredUsers.length === users.length) {
      throw new Error('User not found');
    }
    
    this.saveUsers(filteredUsers);
    await apiService.delete(`/users/${id}`);
    console.log('Deleted user with id:', id);
    return true;
  }

  async getUsersByRole(role: 'client' | 'developer' | 'admin'): Promise<User[]> {
    const users = this.getUsers();
    return users.filter(user => user.role === role);
  }
}

export const userService = new UserService();
