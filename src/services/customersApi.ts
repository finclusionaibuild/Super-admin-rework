// Customer API Service
import { AUTH_CONFIG, handleAuthError } from '../config/auth';
import { useAuthStore } from '../stores/authStore';
import { CustomerApiResponse, CustomerApiParams } from '../types/customer';

class CustomerApiService {
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

  async fetchCustomers(params: CustomerApiParams = {}): Promise<CustomerApiResponse> {
    const searchParams = new URLSearchParams();

    // Set default pagination
    searchParams.append('page', (params.page || 1).toString());
    searchParams.append('perPage', (params.perPage || 10).toString());

    // Add optional parameters
    if (params.search) searchParams.append('search', params.search);
    if (params.accountType) searchParams.append('accountType', params.accountType);
    if (params.startDate) searchParams.append('startDate', params.startDate);
    if (params.endDate) searchParams.append('endDate', params.endDate);
    if (params.status) searchParams.append('status', params.status);

    const url = `${this.baseUrl}/customers?${searchParams.toString()}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(),
        signal: params.signal // Add abort signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CustomerApiResponse = await response.json();
      return data;
    } catch (error) {
      // Check if the error was due to request abortion
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Request was cancelled');
        throw error;
      }

      console.error('Error fetching customers:', error);
      handleAuthError(error);
      throw error; // Re-throw the error after handling
    }
  }

  async fetchCustomerStats(): Promise<any> {
    const url = `${this.baseUrl}/api/admin/customers/stats`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching customer stats:', error);
      handleAuthError(error);
      throw error;
    }
  }

  async fetchAllBusinesses(search?: string): Promise<CustomerApiResponse> {
    const searchParams = new URLSearchParams();

    // Set pagination for all businesses (large page size)
    searchParams.append('page', '1');
    searchParams.append('perPage', '1000'); // Large page to get all businesses
    // searchParams.append('accountType', 'business'); // Only business customers

    if (search) {
      searchParams.append('search', search);
    }

    const url = `${this.baseUrl}/customers/all-businesses?${searchParams.toString()}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CustomerApiResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching businesses:', error);
      handleAuthError(error);
      throw error;
    }
  }
}

export const customerApiService = new CustomerApiService();