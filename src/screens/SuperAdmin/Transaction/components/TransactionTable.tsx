import React from 'react';
import { Card, CardContent } from '../../../../components/ui/card';
import { Input } from '../../../../components/ui/input';
import { Badge } from '../../../../components/ui/badge';
import { Pagination } from '../../../../components/ui/pagination';
import { ActionsDropdown } from '../../../../components/ui/actions-dropdown';
import {
  SearchIcon,
  EyeIcon,
  AlertTriangleIcon,
  RefreshCwIcon,
  LoaderIcon
} from 'lucide-react';
import { Transaction } from '../../../../types/transaction';

interface TransactionTableProps {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  loading: boolean;
  pagination: {
    currentPage: number;
    totalPages: number;
    perPage: number;
    totalCount: number;
  };
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  onTransactionStatusChange: (transactionId: string, status: Transaction['status']) => void;
  onTransactionClick: (transaction: Transaction) => void;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  filteredTransactions,
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  selectedRegion,
  setSelectedRegion,
  loading,
  pagination,
  onPageChange,
  onPerPageChange,
  onTransactionStatusChange,
  onTransactionClick
}) => {
  // Format date helper
  const formatDateTime = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return 'N/A';
    }
  };

  // Get status badge color
  const getStatusBadge = (status: Transaction['status']) => {
    const statusConfig = {
      'Success': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Failed': 'bg-red-100 text-red-800',
      'Cancelled': 'bg-gray-100 text-gray-800',
      'Processing': 'bg-blue-100 text-blue-800'
    };
    return statusConfig[status] || 'bg-gray-100 text-gray-800';
  };

  // Get inline styles for failed transactions
  const getStatusBadgeStyle = (status: Transaction['status']) => {
    if (status === 'Failed') {
      return {
        backgroundColor: '#fef2f2', // bg-red-100 equivalent
        color: '#dc2626', // text-red-800 equivalent
        padding: '2px 8px',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: '500',
        display: 'inline-block'
      };
    }
    return {};
  };

  // Get type badge color
  const getTypeBadge = (type: Transaction['type']) => {
    const typeConfig = {
      'Transfer': 'bg-blue-100 text-blue-800',
      'Payment': 'bg-purple-100 text-purple-800',
      'Withdrawal': 'bg-orange-100 text-orange-800',
      'Deposit': 'bg-green-100 text-green-800',
      'Refund': 'bg-indigo-100 text-indigo-800'
    };
    return typeConfig[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[#1E293B]">Recent Transactions</h3>
          <div className="flex items-center gap-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
                        <select
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Success">Success</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="all">All Regions</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Ghana">Ghana</option>
              <option value="Kenya">Kenya</option>
              <option value="South Africa">South Africa</option>
              <option value="Tanzania">Tanzania</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <LoaderIcon className="w-8 h-8 animate-spin text-[#5B52FF]" />
              <span className="ml-3 text-[#64748B]">Loading transactions...</span>
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#64748B] text-lg">No transactions found</p>
              <p className="text-sm text-[#64748B] mt-2">
                {searchQuery || selectedStatus !== "all" || selectedRegion !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "No transactions have been recorded yet"}
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TRANSACTION ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">AMOUNT</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TYPE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">SENDER</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">RECIPIENT</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">DATE & TIME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => onTransactionClick(transaction)}
                  >
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">
                      {transaction.transactionId}
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-[#1E293B]">
                      {transaction.amountFormatted}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getTypeBadge(transaction.type)}>
                        {transaction.type}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        className={transaction.status === 'Failed' ? '' : getStatusBadge(transaction.status)}
                        style={transaction.status === 'Failed' ? getStatusBadgeStyle(transaction.status) : undefined}
                      >
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">
                      <div className="max-w-32 truncate" title={transaction.senderName || transaction.senderAccountNo || 'N/A'}>
                        {transaction.senderName || transaction.senderAccountNo || 'N/A'}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">
                      <div className="max-w-32 truncate" title={transaction.recipientAccountName || transaction.recipientAccountNo || 'N/A'}>
                        {transaction.recipientAccountName || transaction.recipientAccountNo || 'N/A'}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">
                      {formatDateTime(transaction.dateTime)}
                    </td>
                    <td className="py-3 px-4">
                      <ActionsDropdown
                        actions={[
                          {
                            id: 'view',
                            label: 'View Details',
                            icon: <EyeIcon className="w-4 h-4" />,
                            onClick: () => console.log('View transaction:', transaction.transactionId)
                          },
                          {
                            id: 'flag',
                            label: 'Flag Transaction',
                            icon: <AlertTriangleIcon className="w-4 h-4" />,
                            onClick: () => console.log('Flag transaction:', transaction.transactionId)
                          },
                          {
                            id: 'retry',
                            label: 'Retry Transaction',
                            icon: <RefreshCwIcon className="w-4 h-4" />,
                            onClick: () => onTransactionStatusChange(transaction.id, 'Processing')
                          }
                        ]}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {!loading && filteredTransactions.length > 0 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            perPage={pagination.perPage}
            totalCount={pagination.totalCount}
            onPageChange={onPageChange}
            onPerPageChange={onPerPageChange}
            loading={loading}
          />
        )}
      </CardContent>
    </Card>
  );
};
