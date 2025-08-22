import { useState, useEffect, useCallback } from 'react';
import { customersApiService, ApiCustomer, CustomersApiParams } from '../services/customersApi';

interface PaginationInfo {
  currentPage: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}

interface UseCustomersReturn {
  customers: ApiCustomer[];
  pagination: PaginationInfo;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handlePageChange: (page: number) => void;
  handlePerPageChange: (perPage: number) => void;
  refreshCustomers: () => void;
}

interface UseCustomersOptions {
  accountType?: string;
  initialParams?: CustomersApiParams;
  autoFetch?: boolean;
}

export const useCustomers = (options: UseCustomersOptions = {}): UseCustomersReturn => {
  const { accountType, initialParams = {}, autoFetch = true } = options;
  
  const [customers, setCustomers] = useState<ApiCustomer[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: initialParams.page || 1,
    perPage: initialParams.perPage || 10,
    totalCount: 0,
    totalPages: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(initialParams.search || '');

  const fetchCustomers = useCallback(async (params: CustomersApiParams = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await customersApiService.fetchCustomers({
        page: pagination.currentPage,
        perPage: pagination.perPage,
        search: searchQuery || undefined,
        accountType,
        ...initialParams,
        ...params
      });

      if (response.statusCode === 200) {
        setCustomers(response.data.paginatedData);
        
        setPagination({
          currentPage: response.data.page,
          perPage: response.data.perPage,
          totalCount: response.data.totalCount,
          totalPages: response.data.totalPages
        });
      } else {
        throw new Error(response.message || 'Failed to fetch customers');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching customers:', err);
    } finally {
      setLoading(false);
    }
  }, [pagination.currentPage, pagination.perPage, searchQuery, accountType, initialParams]);

  // Initial load (only run once on mount if autoFetch is true)
  useEffect(() => {
    if (autoFetch) {
      fetchCustomers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFetch]); // Only depend on autoFetch, not fetchCustomers to prevent infinite loops

  // Search with debounce
  useEffect(() => {
    if (!autoFetch) return;
    
    const debounceTimer = setTimeout(() => {
      if (searchQuery !== undefined) {
        // Reset to first page when searching
        setPagination(prev => ({ ...prev, currentPage: 1 }));
        fetchCustomers({ search: searchQuery });
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, autoFetch]); // Only depend on searchQuery and autoFetch

  // Handle pagination changes
  useEffect(() => {
    if (autoFetch && (pagination.currentPage > 1 || pagination.perPage !== 10)) {
      fetchCustomers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.currentPage, pagination.perPage, autoFetch]);

  const handlePageChange = useCallback((page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
    // fetchCustomers will be triggered by the pagination effect
  }, []);

  const handlePerPageChange = useCallback((perPage: number) => {
    setPagination(prev => ({ ...prev, perPage, currentPage: 1 }));
    // fetchCustomers will be triggered by the pagination effect
  }, []);

  const refreshCustomers = useCallback(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return {
    customers,
    pagination,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    handlePageChange,
    handlePerPageChange,
    refreshCustomers
  };
};

// Specialized hook for business customers (for terminal assignment)
export const useBusinessCustomers = (options: Omit<UseCustomersOptions, 'accountType'> = {}) => {
  return useCustomers({
    ...options,
    accountType: 'business'
  });
};
