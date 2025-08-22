// POS API Service
import { AUTH_CONFIG, handleAuthError } from '../config/auth';
import { useAuthStore } from '../stores/authStore';

interface ApiPosTerminal {
  id: number;
  serialNumber: string;
  terminalId: string;
  integratorTypeId: string;
  businessId: string;
  linkStatus: boolean;
  createdAt: string;
}

interface PosApiResponse {
  statusCode: number;
  message: string;
  data: {
    paginatedData: ApiPosTerminal[];
    totalCount: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}

interface PosApiParams {
  search?: string;
  integratorType?: string;
  businessId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  perPage?: number;
}

class PosApiService {
  private get baseUrl() {
    return AUTH_CONFIG.baseUrl;
  }

  private getHeaders() {
    // Get token from Zustand store
    const authStore = useAuthStore.getState();
    const token = authStore.token || AUTH_CONFIG.authToken; // Fallback to hardcoded token

    return {
      'accept': 'text/plain',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  async fetchPosTerminals(params: PosApiParams = {}): Promise<PosApiResponse> {
    const searchParams = new URLSearchParams();
    
    // Set default pagination
    searchParams.append('page', (params.page || 1).toString());
    searchParams.append('perPage', (params.perPage || 10).toString());
    
    // Add optional parameters
    if (params.search) searchParams.append('search', params.search);
    if (params.integratorType) searchParams.append('integratorType', params.integratorType);
    if (params.businessId) searchParams.append('BuinsessId', params.businessId);
    if (params.startDate) searchParams.append('startDate', params.startDate);
    if (params.endDate) searchParams.append('endDate', params.endDate);

    const url = `${this.baseUrl}/pos-terminals?${searchParams.toString()}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PosApiResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching POS terminals:', error);
      handleAuthError(error);
      throw error; // Re-throw the error after handling
    }
  }

  // Add new terminal
  async addTerminal(terminalData: {
    businessId: string;
    terminalId: string;
    serialNumber: string;
    integratorType: string;
  }): Promise<{ statusCode: number; message: string; data?: any }> {
    const url = `${this.baseUrl}/pos-terminals/business`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(terminalData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding terminal:', error);
      handleAuthError(error);
      throw error; // Re-throw the error after handling
    }
  }
}

export const posApiService = new PosApiService();
export type { ApiPosTerminal, PosApiResponse, PosApiParams };
