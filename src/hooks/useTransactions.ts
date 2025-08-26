import { useState, useEffect, useCallback, useRef } from 'react';
import { Transaction, PaginationInfo } from '../types/transaction';
import { transactionApiService, TransactionApiParams } from '../services/transactionApi';
import { transformApiTransactions } from '../utils/transactionTransformers';

interface UseTransactionsReturn {
  transactions: Transaction[];
  pagination: PaginationInfo;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  handlePageChange: (page: number) => void;
  handlePerPageChange: (perPage: number) => void;
  refreshTransactions: () => void;
}

export const useTransactions = (): UseTransactionsReturn => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    perPage: 10,
    totalCount: 0,
    totalPages: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Use refs to track current state without causing re-renders
  const currentParamsRef = useRef({
    page: 1,
    perPage: 10,
    search: '',
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

  const fetchTransactions = useCallback(async (params: TransactionApiParams = {}) => {
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
        status: currentParamsRef.current.status !== 'all' ? currentParamsRef.current.status : undefined,
        ...params
      };

      const response = await transactionApiService.fetchTransactions({
        ...requestParams,
        signal: abortControllerRef.current?.signal
      });

      // Check if request was aborted
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      if (response.statusCode === 200) {
        const transformedTransactions = transformApiTransactions(response.data.paginatedData);
        setTransactions(transformedTransactions);

        setPagination({
          currentPage: response.data.page,
          perPage: response.data.perPage,
          totalCount: response.data.totalCount,
          totalPages: response.data.totalPages
        });
      } else {
        throw new Error(response.message || 'Failed to fetch transactions');
      }
    } catch (err) {
      // Don't set error if request was aborted (component unmounted)
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching transactions:', err);
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
      status: 'all'
    };
    fetchTransactions();
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
      fetchTransactions();
    }, 500);

    return () => clearDebounceTimer();
  }, [searchQuery, fetchTransactions]);

  // Filter by status
  useEffect(() => {
    clearDebounceTimer();

    const newParams = {
      ...currentParamsRef.current,
      status: selectedStatus,
      page: 1 // Reset to first page when filtering
    };
    currentParamsRef.current = newParams;
    fetchTransactions();
  }, [selectedStatus, fetchTransactions]);

  const handlePageChange = useCallback((page: number) => {
    currentParamsRef.current = {
      ...currentParamsRef.current,
      page
    };
    setPagination(prev => ({ ...prev, currentPage: page }));
    fetchTransactions();
  }, [fetchTransactions]);

  const handlePerPageChange = useCallback((perPage: number) => {
    currentParamsRef.current = {
      ...currentParamsRef.current,
      perPage,
      page: 1
    };
    setPagination(prev => ({ ...prev, perPage, currentPage: 1 }));
    fetchTransactions();
  }, [fetchTransactions]);

  const refreshTransactions = useCallback(() => {
    currentParamsRef.current = {
      ...currentParamsRef.current,
      page: 1
    };
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    transactions,
    pagination,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    selectedRegion,
    setSelectedRegion,
    handlePageChange,
    handlePerPageChange,
    refreshTransactions
  };
};
