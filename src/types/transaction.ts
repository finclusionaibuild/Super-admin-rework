export interface Transaction {
  id: string;
  transactionId: string;
  amount: number;
  amountFormatted: string;
  type: 'Transfer' | 'Payment' | 'Withdrawal' | 'Deposit' | 'Refund';
  status: 'Success' | 'Pending' | 'Failed' | 'Cancelled' | 'Processing';
  user: string;
  region: string;
  dateTime: string;
  description: string | null;
  fee: number;
  feeFormatted: string;
  reference: string;
  paymentMethod?: string;
  merchantName?: string;
  createdAt: string;

  // API-specific fields
  category: string | null;
  recipientAccountName: string | null;
  recipientAccountNo: string | null;
  recipientBank: string | null;
  transactionTime: string;
  transactionType: string;
  senderName: string;
  senderAccountNo: string;
  senderBankCode: string;
  recipientBankCode: string | null;
  sessionId: string;
}

export interface TransactionStats {
  totalTransactions: string;
  successRate: string;
  totalVolume: string;
  disputedCount: string;
  completedTransactions: string;
  pendingTransactions: string;
  failedTransactions: string;
  todayTransactions: string;
  todayVolume: string;
}

export interface TransactionNotification {
  id: string;
  type: 'transaction_failed' | 'transaction_disputed' | 'high_amount' | 'suspicious_activity';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  transactionId?: string;
  amount?: string;
  user?: string;
}

export interface PaginationInfo {
  currentPage: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}

export interface TransactionState {
  transactions: Transaction[];
  notifications: TransactionNotification[];
  searchQuery: string;
  selectedFilter: string;
  selectedStatus: string;
  selectedRegion: string;
  // Pagination state
  pagination: PaginationInfo;
  loading: boolean;
  error: string | null;
}

export interface TransactionActions {
  setSearchQuery: (query: string) => void;
  setSelectedFilter: (filter: string) => void;
  setSelectedStatus: (status: string) => void;
  setSelectedRegion: (region: string) => void;
  handleTransactionStatusChange: (transactionId: string, status: Transaction['status']) => void;
  handleExportTransactions: () => void;
  markNotificationsAsRead: () => void;
  // Pagination actions
  handlePageChange: (page: number) => void;
  handlePerPageChange: (perPage: number) => void;
  refreshTransactions: () => void;
}
