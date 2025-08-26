import React from 'react';
import { XIcon, CopyIcon, ExternalLinkIcon } from 'lucide-react';
import { Badge } from '../../../../components/ui/badge';
import { Button } from '../../../../components/ui/button';
import { Transaction } from '../../../../types/transaction';

interface TransactionDetailsModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({
  transaction,
  isOpen,
  onClose
}) => {
  if (!isOpen || !transaction) return null;

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

  const formatDateTime = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return 'N/A';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-[#1E293B]">Transaction Details</h2>
            <p className="text-[#64748B] text-sm">Complete information for transaction {transaction.transactionId}</p>
          </div>
          <Button variant="ghost" onClick={onClose} className="p-2">
            <XIcon className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#64748B]">Transaction ID</label>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-mono text-[#1E293B]">{transaction.transactionId}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(transaction.transactionId)}
                    className="p-1 h-6 w-6"
                  >
                    <CopyIcon className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#64748B]">Amount</label>
                <p className="text-lg font-bold text-[#1E293B] mt-1">{transaction.amountFormatted}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-[#64748B]">Fee</label>
                <p className="text-sm text-[#64748B] mt-1">{transaction.feeFormatted}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-[#64748B]">Status</label>
                <div className="mt-1">
                  <Badge className={transaction.status === 'Failed' ? '' : getStatusBadge(transaction.status)}
                         style={transaction.status === 'Failed' ? { backgroundColor: '#fef2f2', color: '#dc2626', padding: '2px 8px', borderRadius: '6px' } : undefined}>
                    {transaction.status}
                  </Badge>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#64748B]">Type</label>
                <div className="mt-1">
                  <Badge className={getTypeBadge(transaction.type)}>
                    {transaction.type}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#64748B]">Created At</label>
                <p className="text-sm text-[#64748B] mt-1">{formatDateTime(transaction.createdAt)}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-[#64748B]">Transaction Time</label>
                <p className="text-sm text-[#64748B] mt-1">{transaction.transactionTime || 'N/A'}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-[#64748B]">Reference</label>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-mono text-[#1E293B]">{transaction.reference}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(transaction.reference)}
                    className="p-1 h-6 w-6"
                  >
                    <CopyIcon className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#64748B]">Session ID</label>
                <p className="text-sm font-mono text-[#64748B] mt-1">{transaction.sessionId || 'N/A'}</p>
              </div>

              {transaction.category && (
                <div>
                  <label className="text-sm font-medium text-[#64748B]">Category</label>
                  <p className="text-sm text-[#64748B] mt-1">{transaction.category}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sender Information */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Sender Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-[#64748B]">Name</label>
                <p className="text-sm text-[#1E293B] mt-1">{transaction.senderName || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-[#64748B]">Account Number</label>
                <p className="text-sm font-mono text-[#1E293B] mt-1">{transaction.senderAccountNo || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-[#64748B]">Bank Code</label>
                <p className="text-sm text-[#1E293B] mt-1">{transaction.senderBankCode || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Recipient Information */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Recipient Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-[#64748B]">Name</label>
                <p className="text-sm text-[#1E293B] mt-1">{transaction.recipientAccountName || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-[#64748B]">Account Number</label>
                <p className="text-sm font-mono text-[#1E293B] mt-1">{transaction.recipientAccountNo || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-[#64748B]">Bank</label>
                <p className="text-sm text-[#1E293B] mt-1">{transaction.recipientBank || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-[#64748B]">Bank Code</label>
                <p className="text-sm text-[#1E293B] mt-1">{transaction.recipientBankCode || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          {transaction.description && (
            <div className="border-t border-gray-200 pt-6">
              <label className="text-sm font-medium text-[#64748B]">Description</label>
              <p className="text-sm text-[#1E293B] mt-1">{transaction.description}</p>
            </div>
          )}

          {/* Transaction Type Information */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Transaction Type Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-[#64748B]">Transaction Type</label>
                <p className="text-sm text-[#1E293B] mt-1">{transaction.transactionType}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-[#64748B]">Payment Method</label>
                <p className="text-sm text-[#1E293B] mt-1">{transaction.paymentMethod || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <Button
            className='text-red-500 border-red-500'
           variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            className="bg-[#5B52FF] hidden text-white"
            onClick={() => window.open(`/transaction/${transaction.transactionId}`, '_blank')}
          >
            <ExternalLinkIcon className="w-4 h-4 mr-2" />
            View in New Tab
          </Button>
        </div>
      </div>
    </div>
  );
};
