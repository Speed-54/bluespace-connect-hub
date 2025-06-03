
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthService } from '@/services/authService';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'developer' | 'admin';
  avatar?: string;
  company?: string;
  skills?: string[];
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for stored user session
    const storedUser = AuthService.getCurrentUser();
    if (storedUser && AuthService.isAuthenticated()) {
      setUser(storedUser);
    }
  }, []);

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // **BACKEND CONNECTION POINT**
      // Replace this mock implementation with actual API call
      const response = await AuthService.login({ email, password, role });
      
      setUser(response.user);
      localStorage.setItem('bluespace_user', JSON.stringify(response.user));
      return true;

      // TODO: Remove mock implementation below once backend is connected
      /*
      // Mock implementation for development
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        name: role === 'client' ? 'John Client' : role === 'admin' ? 'Admin User' : 'Jane Developer',
        email,
        role: role as any,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        company: role === 'client' ? 'Tech Solutions Inc.' : undefined,
        skills: role === 'developer' ? ['React', 'Node.js', 'TypeScript'] : undefined,
        bio: role === 'developer' ? 'Full-stack developer with 5+ years experience' : undefined
      };

      setUser(mockUser);
      localStorage.setItem('bluespace_user', JSON.stringify(mockUser));
      return true;
      */
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    setIsLoading(true);
    try {
      // **BACKEND CONNECTION POINT**
      // Replace this mock implementation with actual API call
      const response = await AuthService.register({
        name: userData.name || '',
        email: userData.email || '',
        password: userData.password,
        role: userData.role || 'developer',
        company: userData.company,
        skills: userData.skills,
        bio: userData.bio
      });

      setUser(response.user);
      localStorage.setItem('bluespace_user', JSON.stringify(response.user));
      return true;

      // TODO: Remove mock implementation below once backend is connected
      /*
      // Mock implementation for development
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || 'developer',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`,
        company: userData.company,
        skills: userData.skills,
        bio: userData.bio
      };

      setUser(newUser);
      localStorage.setItem('bluespace_user', JSON.stringify(newUser));
      return true;
      */
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
