// Customers API Service
import { AUTH_CONFIG, handleAuthError } from '../config/auth';

interface ApiCustomer {
  id: string;
  finclusionId: string;
  phone: string;
  email: string;
  homeAddress: string;
  firstName: string;
  middleName: string;
  lastName: string;
  accountType: string;
  kycTier: string;
  accountOfficer: string;
  status: string;
  kycTierId: number;
  createdAt: string;
}

interface CustomersApiResponse {
  statusCode: number;
  message: string;
  data: {
    paginatedData: ApiCustomer[];
    totalCount: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}

interface CustomersApiParams {
  search?: string;
  accountType?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  perPage?: number;
}

class CustomersApiService {
  private get baseUrl() {
    return AUTH_CONFIG.baseUrl;
  }

  private getHeaders() {
    return AUTH_CONFIG.getHeaders();
  }

  async fetchCustomers(params: CustomersApiParams = {}): Promise<CustomersApiResponse> {
    const searchParams = new URLSearchParams();
    
    // Set default pagination
    searchParams.append('page', (params.page || 1).toString());
    searchParams.append('perPage', (params.perPage || 10).toString());
    
    // Add optional parameters
    if (params.search) searchParams.append('search', params.search);
    if (params.accountType) searchParams.append('accountType', params.accountType);
    if (params.startDate) searchParams.append('startDate', params.startDate);
    if (params.endDate) searchParams.append('endDate', params.endDate);

    const url = `${this.baseUrl}/customers?${searchParams.toString()}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CustomersApiResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching customers:', error);
      handleAuthError(error);
    }
  }

  // Get business customers specifically (for terminal assignment)
  async fetchBusinessCustomers(params: Omit<CustomersApiParams, 'accountType'> = {}): Promise<CustomersApiResponse> {
    return this.fetchCustomers({
      ...params,
      accountType: 'business'
    });
  }
}

export const customersApiService = new CustomersApiService();
export type { ApiCustomer, CustomersApiResponse, CustomersApiParams };
