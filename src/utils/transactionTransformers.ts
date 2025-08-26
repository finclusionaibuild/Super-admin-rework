import { Transaction } from '../types/transaction';
import { ApiTransaction } from '../services/transactionApi';

// Transform API data to component format
export const transformApiTransactionToComponent = (apiTransaction: ApiTransaction): Transaction => {
  // Format amount with Nigerian Naira symbol
  const formatAmount = (amount: number): string => {
    return `₦${amount.toLocaleString()}`;
  };

  // Determine transaction type based on transactionType from API
  const getTransactionType = (transactionType: string): Transaction['type'] => {
    switch (transactionType.toLowerCase()) {
      case 'credit':
        return 'Deposit';
      case 'debit':
        return 'Transfer';
      case 'transfer':
        return 'Transfer';
      case 'payment':
        return 'Payment';
      case 'withdrawal':
        return 'Withdrawal';
      case 'refund':
        return 'Refund';
      default:
        return 'Transfer';
    }
  };

  // Determine status based on API status
  const getTransactionStatus = (status: string): Transaction['status'] => {
    switch (status.toLowerCase()) {
      case 'success':
      case 'successful':
        return 'Success';
      case 'pending':
        return 'Pending';
      case 'failed':
        return 'Failed';
      case 'cancelled':
        return 'Cancelled';
      case 'processing':
        return 'Processing';
      default:
        return 'Pending';
    }
  };

  // Extract user name from sender or recipient
  const getUserName = (apiTransaction: ApiTransaction): string => {
    if (apiTransaction.senderName && apiTransaction.senderName.trim()) {
      return apiTransaction.senderName;
    }
    if (apiTransaction.recipientAccountName) {
      return apiTransaction.recipientAccountName;
    }
    return 'Unknown User';
  };

  // Determine region based on bank code or default
  const getRegion = (apiTransaction: ApiTransaction): string => {
    // This is a simplified mapping - you might want to expand this
    const bankCode = apiTransaction.senderBankCode || apiTransaction.recipientBankCode;
    if (bankCode && bankCode !== '999999') {
      // You could map bank codes to regions here
      return 'Nigeria'; // Default for now
    }
    return 'Nigeria'; // Default region
  };

  return {
    id: apiTransaction.transactionId,
    transactionId: apiTransaction.transactionId,
    amount: apiTransaction.amount,
    amountFormatted: formatAmount(apiTransaction.amount),
    type: getTransactionType(apiTransaction.transactionType),
    status: getTransactionStatus(apiTransaction.status),
    user: getUserName(apiTransaction),
    region: getRegion(apiTransaction),
    dateTime: apiTransaction.createdAt,
    description: apiTransaction.description,
    fee: apiTransaction.fee,
    feeFormatted: formatAmount(apiTransaction.fee),
    reference: apiTransaction.reference,
    paymentMethod: apiTransaction.transactionType, // Could be enhanced with more specific mapping
    createdAt: apiTransaction.createdAt,

    // API-specific fields
    category: apiTransaction.category,
    recipientAccountName: apiTransaction.recipientAccountName,
    recipientAccountNo: apiTransaction.recipientAccountNo,
    recipientBank: apiTransaction.recipientBank,
    transactionTime: apiTransaction.transactionTime,
    transactionType: apiTransaction.transactionType,
    senderName: apiTransaction.senderName,
    senderAccountNo: apiTransaction.senderAccountNo,
    senderBankCode: apiTransaction.senderBankCode,
    recipientBankCode: apiTransaction.recipientBankCode,
    sessionId: apiTransaction.sessionId
  };
};

// Batch transform multiple transactions
export const transformApiTransactions = (apiTransactions: ApiTransaction[]): Transaction[] => {
  return apiTransactions.map(transformApiTransactionToComponent);
};
