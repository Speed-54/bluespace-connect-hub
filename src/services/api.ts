
// Mock API service that simulates HTTP requests with localStorage persistence

interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
}

class MockApiService {
  private delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));
  
  private getStorageKey(key: string): string {
    return `bluespace_${key}`;
  }

  private getFromStorage<T>(key: string, defaultValue: T): T {
    try {
      const stored = localStorage.getItem(this.getStorageKey(key));
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private saveToStorage<T>(key: string, data: T): void {
    localStorage.setItem(this.getStorageKey(key), JSON.stringify(data));
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    await this.delay();
    console.log(`Mock API GET: ${endpoint}`);
    
    // Simulate successful response
    return {
      data: {} as T,
      success: true,
      message: 'Data retrieved successfully'
    };
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    await this.delay();
    console.log(`Mock API POST: ${endpoint}`, data);
    
    return {
      data: data as T,
      success: true,
      message: 'Data created successfully'
    };
  }

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    await this.delay();
    console.log(`Mock API PUT: ${endpoint}`, data);
    
    return {
      data: data as T,
      success: true,
      message: 'Data updated successfully'
    };
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    await this.delay();
    console.log(`Mock API DELETE: ${endpoint}`);
    
    return {
      data: {} as T,
      success: true,
      message: 'Data deleted successfully'
    };
  }
}

export const apiService = new MockApiService();
