
// API Client configuration and base methods
// TODO: Move API URL to environment variables for production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any[];
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    // Get token from localStorage on initialization
    this.token = localStorage.getItem('bluespace_token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('bluespace_token', token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('bluespace_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers as Record<string, string>,
    };

    // Add authentication header if token exists
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      console.log(`🌐 API Request: ${options.method || 'GET'} ${url}`);
      
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      // TODO: Add response interceptors for common error handling
      if (!response.ok) {
        console.error(`❌ API Error [${endpoint}]:`, data);
        throw new Error(data.message || `HTTP ${response.status}: Request failed`);
      }

      console.log(`✅ API Success [${endpoint}]:`, data);
      return data;
    } catch (error) {
      console.error(`💥 API Network Error [${endpoint}]:`, error);
      
      // TODO: Add retry logic for network failures
      // TODO: Add offline detection and queuing
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Health check endpoint
  async healthCheck(): Promise<ApiResponse> {
    return this.get('/health');
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
