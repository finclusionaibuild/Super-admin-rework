export interface PosTerminal {
  id: string;
  terminalId: string;
  merchantName: string;
  location: string;
  status: 'Active' | 'Offline' | 'Maintenance' | 'Inactive';
  dailyVolume: number;
  transactionCount: number;
  uptime: string;
  assignedUser: string;
  serialNumber: string;
  model: string;
  activationDate: string;
  lastTransaction: string;
  // API fields
  integratorTypeId?: string;
  businessId?: string;
  linkStatus?: boolean;
  createdAt?: string;
}

export interface NewTerminal {
  terminalId: string;
  serialNumber: string;
  businessId: string;
  integratorType: string;
}

export interface PosNotification {
  id: string;
  type: 'pos_request' | 'pos_activation';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  terminalId?: string;
  businessName: string;
}

export interface PaginationInfo {
  currentPage: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}

export interface PosState {
  terminals: PosTerminal[];
  notifications: PosNotification[];
  searchQuery: string;
  selectedFilter: string;
  selectedTerminal: PosTerminal | null;
  showAddTerminalModal: boolean;
  showAssignTerminalModal: boolean;
  newTerminal: NewTerminal;
  // Pagination state
  pagination: PaginationInfo;
  loading: boolean;
  error: string | null;
}

export interface PosActions {
  setSearchQuery: (query: string) => void;
  setSelectedFilter: (filter: string) => void;
  setSelectedTerminal: (terminal: PosTerminal | null) => void;
  setShowAddTerminalModal: (show: boolean) => void;
  setShowAssignTerminalModal: (show: boolean) => void;
  setNewTerminal: (terminal: NewTerminal) => void;
  handleAddTerminal: () => void;
  handleAssignTerminal: (terminalId: string, userId: string) => void;
  handleTerminalStatusChange: (terminalId: string, action: 'activate' | 'deactivate' | 'freeze') => void;
  markNotificationsAsRead: () => void;
  // Pagination actions
  handlePageChange: (page: number) => void;
  handlePerPageChange: (perPage: number) => void;
  refreshTerminals: () => void;
}
