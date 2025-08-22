import { LoginRequest, LoginResponse } from '../types/auth';

const API_BASE_URL = 'https://admin-dev.dotnet.surebanker.ai/api/admin';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const serverActions = {
  async adminLogin(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'accept': 'text/plain',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new ApiError(
          `Login failed: ${response.statusText}`,
          response.status,
          errorData
        );
      }

      const data: LoginResponse = await response.json();
      
      if (data.statusCode !== 200) {
        throw new ApiError(
          data.message || 'Login failed',
          data.statusCode,
          data
        );
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Network or other errors
      throw new ApiError(
        'Network error: Unable to connect to the server',
        0,
        error
      );
    }
  },

  // Future admin API calls can be added here
  async adminLogout(token: string): Promise<void> {
    // Implementation for logout endpoint when available
    // For now, we'll just clear local storage
    localStorage.removeItem('admin-auth');
  },

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    // Implementation for refresh token endpoint when available
    throw new ApiError('Refresh token endpoint not implemented', 501);
  }
};
