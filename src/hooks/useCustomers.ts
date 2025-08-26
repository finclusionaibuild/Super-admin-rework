import { useState, useEffect, useCallback, useRef } from 'react';
import { Customer, PaginationInfo, CustomerApiParams } from '../types/customer';
import { customerApiService } from '../services/customersApi';
import { transformApiCustomers } from '../utils/customerTransformers';

interface UseCustomersReturn {
  customers: Customer[];
  pagination: PaginationInfo;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedAccountType: string;
  setSelectedAccountType: (type: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  handlePageChange: (page: number) => void;
  handlePerPageChange: (perPage: number) => void;
  refreshCustomers: () => void;
}

export const useCustomers = (): UseCustomersReturn => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    perPage: 10,
    totalCount: 0,
    totalPages: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAccountType, setSelectedAccountType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Use refs to track current state without causing re-renders
  const currentParamsRef = useRef({
    page: 1,
    perPage: 10,
    search: '',
    accountType: 'all',
    status: 'all'
  });
  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimerRef = useRef<number | null>(null);

  // Cancel any ongoing request
  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  // Clear debounce timer
  const clearDebounceTimer = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
  }, []);

  const fetchCustomers = useCallback(async (params: CustomerApiParams = {}) => {
    // Cancel any ongoing request
    cancelRequest();

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const requestParams = {
        page: currentParamsRef.current.page,
        perPage: currentParamsRef.current.perPage,
        search: currentParamsRef.current.search || undefined,
        accountType: currentParamsRef.current.accountType !== 'all' ? currentParamsRef.current.accountType : undefined,
        status: currentParamsRef.current.status !== 'all' ? currentParamsRef.current.status : undefined,
        ...params
      };

      const response = await customerApiService.fetchCustomers({
        ...requestParams,
        signal: abortControllerRef.current?.signal
      });

      // Check if request was aborted
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      if (response.statusCode === 200) {
        const transformedCustomers = transformApiCustomers(response.data.paginatedData);
        setCustomers(transformedCustomers);

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
      // Don't set error if request was aborted (component unmounted)
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching customers:', err);
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setLoading(false);
      }
    }
  }, [cancelRequest]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelRequest();
      clearDebounceTimer();
    };
  }, [cancelRequest, clearDebounceTimer]);

  // Initial load
  useEffect(() => {
    currentParamsRef.current = {
      page: 1,
      perPage: 10,
      search: '',
      accountType: 'all',
      status: 'all'
    };
    fetchCustomers();
  }, []); // Only run once on mount

  // Search with debounce
  useEffect(() => {
    clearDebounceTimer();

    debounceTimerRef.current = setTimeout(() => {
      const newParams = {
        ...currentParamsRef.current,
        search: searchQuery,
        page: 1 // Reset to first page when searching
      };
      currentParamsRef.current = newParams;
      fetchCustomers();
    }, 500);

    return () => clearDebounceTimer();
  }, [searchQuery, fetchCustomers]);

  // Filter by account type with debounce
  useEffect(() => {
    clearDebounceTimer();

    debounceTimerRef.current = setTimeout(() => {
      const newParams = {
        ...currentParamsRef.current,
        accountType: selectedAccountType,
        page: 1 // Reset to first page when filtering
      };
      currentParamsRef.current = newParams;
      fetchCustomers();
    }, 300);

    return () => clearDebounceTimer();
  }, [selectedAccountType, fetchCustomers]);

  // Filter by status with debounce
  useEffect(() => {
    clearDebounceTimer();

    debounceTimerRef.current = setTimeout(() => {
      const newParams = {
        ...currentParamsRef.current,
        status: selectedStatus,
        page: 1 // Reset to first page when filtering
      };
      currentParamsRef.current = newParams;
      fetchCustomers();
    }, 300);

    return () => clearDebounceTimer();
  }, [selectedStatus, fetchCustomers]);

  const handlePageChange = useCallback((page: number) => {
    currentParamsRef.current = {
      ...currentParamsRef.current,
      page
    };
    setPagination(prev => ({ ...prev, currentPage: page }));
    fetchCustomers();
  }, [fetchCustomers]);

  const handlePerPageChange = useCallback((perPage: number) => {
    currentParamsRef.current = {
      ...currentParamsRef.current,
      perPage,
      page: 1
    };
    setPagination(prev => ({ ...prev, perPage, currentPage: 1 }));
    fetchCustomers();
  }, [fetchCustomers]);

  const refreshCustomers = useCallback(() => {
    currentParamsRef.current = {
      ...currentParamsRef.current,
      page: 1
    };
    fetchCustomers();
  }, [fetchCustomers]);

  return {
    customers,
    pagination,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedAccountType,
    setSelectedAccountType,
    selectedStatus,
    setSelectedStatus,
    selectedRegion,
    setSelectedRegion,
    handlePageChange,
    handlePerPageChange,
    refreshCustomers
  };
};

// Hook for fetching all businesses (for POS assignment)
export const useAllBusinesses = (): {
  businesses: Customer[];
  loading: boolean;
  error: string | null;
  searchBusinesses: (query: string) => void;
  refreshBusinesses: () => void;
} => {
  const [businesses, setBusinesses] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Use refs to track current state
  const currentQueryRef = useRef('');
  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimerRef = useRef<number | null>(null);

  // Cancel any ongoing request
  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  // Clear debounce timer
  const clearDebounceTimer = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
  }, []);

  const fetchBusinesses = useCallback(async (search?: string) => {
    // Cancel any ongoing request
    cancelRequest();

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const response = await customerApiService.fetchAllBusinesses(search);

      // Check if request was aborted
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      if (response.statusCode === 200) {
        const transformedBusinesses = transformApiCustomers(response.data.paginatedData);
        setBusinesses(transformedBusinesses);
      } else {
        throw new Error(response.message || 'Failed to fetch businesses');
      }
    } catch (err) {
      // Don't set error if request was aborted (component unmounted)
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching businesses:', err);
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setLoading(false);
      }
    }
  }, [cancelRequest]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelRequest();
      clearDebounceTimer();
    };
  }, [cancelRequest, clearDebounceTimer]);

  // Initial load
  useEffect(() => {
    fetchBusinesses();
  }, []); // Only run once on mount

  // Search with debounce
  const searchBusinesses = useCallback((query: string) => {
    setSearchQuery(query);
    clearDebounceTimer();

    debounceTimerRef.current = setTimeout(() => {
      if (query !== currentQueryRef.current) {
        currentQueryRef.current = query;
        fetchBusinesses(query || undefined);
      }
    }, 300);
  }, [fetchBusinesses, clearDebounceTimer]);

  const refreshBusinesses = useCallback(() => {
    fetchBusinesses(currentQueryRef.current || undefined);
  }, [fetchBusinesses]);

  return {
    businesses,
    loading,
    error,
    searchBusinesses,
    refreshBusinesses
  };
};