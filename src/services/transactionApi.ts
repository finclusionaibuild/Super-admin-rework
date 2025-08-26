// Transaction API Service
import { AUTH_CONFIG, handleAuthError } from '../config/auth';
import { useAuthStore } from '../stores/authStore';

export interface ApiTransaction {
  transactionId: string;
  category: string | null;
  recipientAccountName: string | null;
  recipientAccountNo: string | null;
  recipientBank: string | null;
  reference: string;
  amount: number;
  fee: number;
  transactionTime: string;
  description: string | null;
  transactionType: string;
  status: string;
  createdAt: string;
  senderName: string;
  senderAccountNo: string;
  senderBankCode: string;
  recipientBankCode: string | null;
  sessionId: string;
}

export interface TransactionApiResponse {
  statusCode: number;
  message: string;
  data: {
    paginatedData: ApiTransaction[];
    totalCount: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}

export interface TransactionApiParams {
  search?: string;
  category?: string;
  accountType?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  paymentMethod?: string;
  page?: number;
  perPage?: number;
  signal?: AbortSignal; // For request cancellation
}

class TransactionApiService {
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

  async fetchTransactions(params: TransactionApiParams = {}): Promise<TransactionApiResponse> {
    const searchParams = new URLSearchParams();

    // Set default pagination
    searchParams.append('page', (params.page || 1).toString());
    searchParams.append('perPage', (params.perPage || 10).toString());

    // Add optional parameters
    if (params.search) searchParams.append('search', params.search);
    if (params.category) searchParams.append('category', params.category);
    if (params.accountType) searchParams.append('accountType', params.accountType);
    if (params.startDate) searchParams.append('startDate', params.startDate);
    if (params.endDate) searchParams.append('endDate', params.endDate);
    if (params.status) searchParams.append('status', params.status);
    if (params.paymentMethod) searchParams.append('paymentMethod', params.paymentMethod);

    const url = `${this.baseUrl}/transactions?${searchParams.toString()}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(),
        signal: params.signal // Add abort signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: TransactionApiResponse = await response.json();
      return data;
    } catch (error) {
      // Check if the error was due to request abortion
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Request was cancelled');
        throw error;
      }

      console.error('Error fetching transactions:', error);
      handleAuthError(error);
      throw error; // Re-throw the error after handling
    }
  }
}

export const transactionApiService = new TransactionApiService();
