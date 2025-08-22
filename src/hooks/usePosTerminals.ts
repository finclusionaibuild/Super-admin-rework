import { useState, useEffect, useCallback } from 'react';
import { PosTerminal, PaginationInfo } from '../types/pos';
import { posApiService, PosApiParams } from '../services/posApi';
import { transformApiTerminals } from '../utils/posTransformers';

interface UsePosTerminalsReturn {
  terminals: PosTerminal[];
  pagination: PaginationInfo;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handlePageChange: (page: number) => void;
  handlePerPageChange: (perPage: number) => void;
  refreshTerminals: () => void;
}

export const usePosTerminals = (): UsePosTerminalsReturn => {
  const [terminals, setTerminals] = useState<PosTerminal[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    perPage: 10,
    totalCount: 0,
    totalPages: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchTerminals = useCallback(async (params: PosApiParams = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await posApiService.fetchPosTerminals({
        page: pagination.currentPage,
        perPage: pagination.perPage,
        search: searchQuery || undefined,
        ...params
      });

      if (response.statusCode === 200) {
        const transformedTerminals = transformApiTerminals(response.data.paginatedData);
        setTerminals(transformedTerminals);
        
        setPagination({
          currentPage: response.data.page,
          perPage: response.data.perPage,
          totalCount: response.data.totalCount,
          totalPages: response.data.totalPages
        });
      } else {
        throw new Error(response.message || 'Failed to fetch terminals');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching POS terminals:', err);
    } finally {
      setLoading(false);
    }
  }, [pagination.currentPage, pagination.perPage, searchQuery]);

  // Initial load
  useEffect(() => {
    fetchTerminals();
  }, []);

  // Search with debounce
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery !== undefined) {
        // Reset to first page when searching
        setPagination(prev => ({ ...prev, currentPage: 1 }));
        fetchTerminals({ search: searchQuery });
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handlePageChange = useCallback((page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
    fetchTerminals({ page });
  }, [fetchTerminals]);

  const handlePerPageChange = useCallback((perPage: number) => {
    setPagination(prev => ({ ...prev, perPage, currentPage: 1 }));
    fetchTerminals({ perPage, page: 1 });
  }, [fetchTerminals]);

  const refreshTerminals = useCallback(() => {
    fetchTerminals();
  }, [fetchTerminals]);

  return {
    terminals,
    pagination,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    handlePageChange,
    handlePerPageChange,
    refreshTerminals
  };
};
