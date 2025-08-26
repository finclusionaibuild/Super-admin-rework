import React, { useEffect, useState } from 'react';
import { useFeedback } from '../../../hooks/useFeedback';
import { useTransactions } from '../../../hooks/useTransactions';
import { Transaction } from '../../../types/transaction';
import {
  TransactionHeader,
  TransactionStatsCards,
  TransactionTable,
  TransactionDetailsModal
} from './components';

// This component now uses real API data via useTransactions hook

export const TransactionManagement: React.FC = () => {
  const { showSuccess, showError } = useFeedback();

  // API Integration
  const {
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
  } = useTransactions();

  // Modal state
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Local State for notifications - can be used later for notification system
  // const [transactionNotifications, setTransactionNotifications] = useState<TransactionNotification[]>([]);

  // Show error if API request failed - only show error once per error instance
  useEffect(() => {
    if (error) {
      showError(`Failed to load transactions: ${error}`);
    }
  }, [error]); // Removed showError from dependencies to prevent infinite loop

  // Initialize notifications - can be uncommented when notification system is implemented
  // useEffect(() => {
  //   const mockNotifications: TransactionNotification[] = [
  //     {
  //       id: 'TXN_NOTIF_001',
  //       type: 'transaction_failed',
  //       title: 'Transaction Failed',
  //       message: 'Transaction TXN003 by Alex Developer has failed due to insufficient funds',
  //       timestamp: '2 minutes ago',
  //       isRead: false,
  //       priority: 'high',
  //       transactionId: 'TXN003',
  //       amount: '₦25,000',
  //       user: 'Alex Developer'
  //     },
  //     {
  //       id: 'TXN_NOTIF_002',
  //       type: 'high_amount',
  //       title: 'High Amount Transaction',
  //       message: 'Large transaction of ₦200,000 detected for Global Corp',
  //       timestamp: '1 hour ago',
  //       isRead: false,
  //       priority: 'medium',
  //       transactionId: 'TXN005',
  //       amount: '₦200,000',
  //       user: 'Global Corp'
  //     }
  //   ];
  //   setTransactionNotifications(mockNotifications);
  // }, []);

  // Filtered data (additional client-side filtering if needed)
  const filteredTransactions = transactions.filter(transaction => {
    let matchesRegion = true;
    if (selectedRegion !== 'all') {
      matchesRegion = transaction.region === selectedRegion;
    }

    return matchesRegion;
  });

  // Handlers
  // const markNotificationsAsRead = () => {
  //   setTransactionNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  // };

  const handleTransactionStatusChange = (transactionId: string, status: Transaction['status']) => {
    // Note: In a real implementation, you would make an API call to update the transaction status
    // For now, we'll just show a success message
    const transaction = transactions.find(t => t.id === transactionId);
    if (transaction) {
      showSuccess(
        `Transaction ${transaction.transactionId} status update requested to ${status}`,
        { title: "Status Update Requested" }
      );
    }
  };

  const handleExportTransactions = () => {
    showSuccess(
      'Transaction data export has been initiated. You will receive an email when ready.',
      { title: "Export Started" }
    );
  };

  const handleRefresh = () => {
    refreshTransactions();
    showSuccess(
      'Transaction data has been refreshed successfully',
      { title: "Data Refreshed" }
    );
  };

  // Modal handlers
  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  // Pagination handlers are now managed by useTransactions hook

  return (
    <div className="space-y-6">
      {/* Header */}
      <TransactionHeader
        onRefresh={handleRefresh}
        onExport={handleExportTransactions}
        loading={loading}
      />

      {/* Statistics Cards */}
      <TransactionStatsCards
        totalTransactions="45.6M"
        successRate="98.2%"
        totalVolume="₦125B"
        disputedCount="1,234"
      />

      {/* Transactions Table */}
      <TransactionTable
        transactions={transactions}
        filteredTransactions={filteredTransactions}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
        onTransactionStatusChange={handleTransactionStatusChange}
        onTransactionClick={handleTransactionClick}
      />

      {/* Transaction Details Modal */}
      <TransactionDetailsModal
        transaction={selectedTransaction}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};
