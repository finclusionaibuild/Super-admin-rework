import React, { useState, useEffect } from 'react';
import { useFeedback } from '../../../hooks/useFeedback';
import { usePosTerminals } from '../../../hooks/usePosTerminals';
import { useAllBusinesses } from '../../../hooks/useCustomers';
import { posApiService } from '../../../services/posApi';
import { PosTerminal, NewTerminal, PosNotification } from '../../../types/pos';
import {
  PosStatsCards,
  PosTerminalsTable,
  AddTerminalModal,
  AssignTerminalModal,
  PosNotifications,
  PosHeader
} from './components';

// Mock users data - could be moved to a separate file or API
const mockUsers = [
  { id: "USER001", firstName: "John", lastName: "Doe", type: "Business", status: "Active", region: "Nigeria" },
  { id: "USER002", firstName: "Jane", lastName: "Smith", type: "Business", status: "Active", region: "Ghana" },
  { id: "USER003", firstName: "Bob", lastName: "Johnson", type: "Business", status: "Active", region: "Kenya" },
];

export const PosManagement: React.FC = () => {
  const { showSuccess, showError } = useFeedback();
  
  // API Integration
  const {
    terminals: posTerminals,
    pagination,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    handlePageChange,
    handlePerPageChange,
    refreshTerminals
  } = usePosTerminals();
  
  // Business customers for terminal assignment using the new hook
  const {
    businesses,
    loading: businessesLoading,
    error: businessesError,
    searchBusinesses
  } = useAllBusinesses();

  // Local State
  const [users] = useState(mockUsers);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedTerminal, setSelectedTerminal] = useState<PosTerminal | null>(null);
  const [showAddTerminalModal, setShowAddTerminalModal] = useState(false);
  const [showAssignTerminalModal, setShowAssignTerminalModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [posNotifications, setPosNotifications] = useState<PosNotification[]>([]);
  const [addingTerminal, setAddingTerminal] = useState(false);
  const [newTerminal, setNewTerminal] = useState<NewTerminal>({
    terminalId: "",
    serialNumber: "",
    businessId: "",
    integratorType: "VFD"
  });

  // Initialize POS notifications
  useEffect(() => {
    const mockNotifications: PosNotification[] = [
      {
        id: "POS_REQ_001",
        type: "pos_request",
        title: "New POS Terminal Request",
        message: "Tech Solutions Ltd has requested a new POS terminal for their Lagos branch",
        timestamp: "2 minutes ago",
        isRead: false,
        priority: "medium",
        businessName: "Tech Solutions Ltd"
      },
      {
        id: "POS_ACT_002",
        type: "pos_activation",
        title: "POS Terminal Activated",
        message: "Terminal TRM12348 has been successfully activated by Green Energy Corp",
        timestamp: "1 hour ago",
        isRead: false,
        priority: "low",
        businessName: "Green Energy Corp"
      }
    ];
    setPosNotifications(mockNotifications);
  }, []);

  // Show error if API request failed
  useEffect(() => {
    if (error) {
      showError(`Failed to load terminals: ${error}`);
    }
  }, [error, showError]);

  // Handlers
  const markNotificationsAsRead = () => {
    setPosNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const dismissNotification = (id: string) => {
    setPosNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Filtered data
  const filteredTerminals = posTerminals.filter(terminal => {
    const matchesSearch = 
      terminal.terminalId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (terminal.serialNumber && terminal.serialNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (terminal.merchantName && terminal.merchantName.toLowerCase().includes(searchQuery.toLowerCase()));

    let matchesFilter = true;
    if (selectedFilter === "connected") {
      matchesFilter = terminal.linkStatus === true;
    } else if (selectedFilter === "disconnected") {
      matchesFilter = terminal.linkStatus === false;
    } else if (selectedFilter === "assigned") {
      matchesFilter = Boolean(terminal.businessId && terminal.businessId !== '');
    } else if (selectedFilter === "unassigned") {
      matchesFilter = !terminal.businessId || terminal.businessId === '';
    }
    
    return matchesSearch && matchesFilter;
  });

  const handleAddTerminal = async () => {
    if (!newTerminal.terminalId || !newTerminal.serialNumber || !newTerminal.businessId) {
      showError("Please fill in all required fields");
      return;
    }

    setAddingTerminal(true);
    try {
      const response = await posApiService.addTerminal({
        businessId: newTerminal.businessId,
        terminalId: newTerminal.terminalId,
        serialNumber: newTerminal.serialNumber,
        integratorType: newTerminal.integratorType
      });

      if (response && response.statusCode === 200) {
        showSuccess(
          `Terminal ${newTerminal.terminalId} has been added successfully`,
          { title: "Terminal Added" }
        );
        setNewTerminal({
          terminalId: "",
          serialNumber: "",
          businessId: "",
          integratorType: "VFD"
        });
        setShowAddTerminalModal(false);
        refreshTerminals();
      } else {
        throw new Error(response?.message || "Failed to add terminal");
      }
    } catch (error: any) {
      console.error('Error adding terminal:', error);
      showError(`Failed to add terminal: ${error.message}`);
    } finally {
      setAddingTerminal(false);
    }
  };

  const handleAssignTerminal = (terminalId: string, userId: string) => {
    const terminal = posTerminals.find(t => t.terminalId === terminalId);
    const user = users.find(u => u.id === userId);
    
    if (terminal && user) {
      showSuccess(
        `Terminal ${terminalId} has been assigned to ${user.firstName} ${user.lastName}`,
        { title: "Terminal Assigned" }
      );
      setShowAssignTerminalModal(false);
      setSelectedTerminal(null);
      setEditingUser(null);
    }
  };

  const handleTerminalStatusChange = (terminalId: string, action: 'activate' | 'freeze' | 'deactivate') => {
    const terminal = posTerminals.find(t => t.id === terminalId);
    if (terminal) {
      const actionText = action === 'activate' ? 'activated' : action === 'freeze' ? 'frozen' : 'deactivated';
      showSuccess(
        `Terminal ${terminal.terminalId} has been ${actionText}`,
        { title: "Status Updated" }
      );
    }
  };

  const handleAssignTerminalClick = (terminal: PosTerminal) => {
    setSelectedTerminal(terminal);
    setShowAssignTerminalModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <PosHeader
        onAddTerminal={() => setShowAddTerminalModal(true)}
        onRefresh={refreshTerminals}
        loading={loading}
      />

      {/* Notifications */}
      <PosNotifications
        notifications={posNotifications}
        onMarkAsRead={markNotificationsAsRead}
        onDismiss={dismissNotification}
      />

      {/* Statistics Cards */}
      <PosStatsCards
        posTerminals={posTerminals}
        pagination={pagination}
      />

      {/* Terminals Table */}
      <PosTerminalsTable
        posTerminals={posTerminals}
        filteredTerminals={filteredTerminals}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
        onAssignTerminal={handleAssignTerminalClick}
        onTerminalStatusChange={handleTerminalStatusChange}
      />

      {/* Modals */}
      <AddTerminalModal
        isOpen={showAddTerminalModal}
        onClose={() => setShowAddTerminalModal(false)}
        newTerminal={newTerminal}
        setNewTerminal={setNewTerminal}
        addingTerminal={addingTerminal}
        businessCustomers={businesses}
        customersLoading={businessesLoading}
        customersError={businessesError}
        searchBusinesses={searchBusinesses}
        onSubmit={handleAddTerminal}
      />

      <AssignTerminalModal
        isOpen={showAssignTerminalModal}
        onClose={() => setShowAssignTerminalModal(false)}
        posTerminals={posTerminals}
        businesses={businesses}
        businessesLoading={businessesLoading}
        businessesError={businessesError}
        searchBusinesses={searchBusinesses}
        selectedTerminal={selectedTerminal}
        editingUser={editingUser}
        onTerminalSelect={setSelectedTerminal}
        onUserSelect={setEditingUser}
        onAssign={handleAssignTerminal}
      />
    </div>
  );
};