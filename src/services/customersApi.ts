// Customers API Service
import { AUTH_CONFIG, handleAuthError } from '../config/auth';
import { useAuthStore } from '../stores/authStore';

interface ApiCustomer {
  id: string;
  finclusionId?: string; // Optional for businesses
  phone?: string; // Optional for businesses
  email?: string; // Optional for businesses
  homeAddress?: string; // Optional for businesses
  firstName?: string; // Optional for businesses
  middleName?: string; // Optional for businesses
  lastName?: string; // Optional for businesses
  name?: string; // For businesses
  accountType?: string;
  kycTier?: string; // Optional for businesses
  accountOfficer?: string; // Optional for businesses
  status?: string;
  kycTierId?: number; // Optional for businesses
  createdAt?: string; // Optional for businesses
  slug?: string; // For businesses
  address?: string; // For businesses
  tagName?: string; // For businesses
  registrationType?: string; // For businesses
  rcNumber?: string; // For businesses
  city?: string; // For businesses
  state?: string; // For businesses
  businessSubCategoryId?: string; // For businesses
  isPepStatus?: boolean; // For businesses
  accountNo?: string; // For businesses
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
    // Get token from Zustand store
    const authStore = useAuthStore.getState();
    const token = authStore.token || AUTH_CONFIG.authToken; // Fallback to hardcoded token

    return {
      'accept': 'text/plain',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
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

    // Use different endpoints based on accountType
    let endpoint = '/customers';
    if (params.accountType === 'business') {
      endpoint = '/customers/businesses';
    }

    const url = `${this.baseUrl}${endpoint}?${searchParams.toString()}`;

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
      throw error; // Re-throw the error after handling
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
