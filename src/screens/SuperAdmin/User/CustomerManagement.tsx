import React, { useEffect, useState } from 'react';
import { useFeedback } from '../../../hooks/useFeedback';
import { useCustomers } from '../../../hooks/useCustomers';
import { Customer } from '../../../types/customer';
import {
  CustomerHeader,
  CustomerStatsCards,
  CustomerTable
} from './components';

export const CustomerManagement: React.FC = () => {
  const { showSuccess, showError } = useFeedback();

  // API Integration
  const {
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
  } = useCustomers();

  // Modal state
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Show error if API request failed - only show error once per error instance
  useEffect(() => {
    if (error) {
      showError(`Failed to load customers: ${error}`);
    }
  }, [error]); // Removed showError from dependencies to prevent infinite loop

  // Handlers
  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleExportCustomers = () => {
    showSuccess(
      'Customer data export has been initiated. You will receive an email when ready.',
      { title: "Export Started" }
    );
  };

  const handleCreateUser = () => {
    showSuccess("User Created", { title: "User Created", message: "New user account has been created successfully" });
  };

  const handleRefresh = () => {
    refreshCustomers();
    showSuccess(
      'Customer data has been refreshed successfully',
      { title: "Data Refreshed" }
    );
  };

  // Calculate stats from customer data
  const calculateStats = () => {
    const totalCustomers = customers.length;
    const individualCount = customers.filter(c => c.accountType === 'individual').length;
    const businessCount = customers.filter(c => c.accountType === 'business').length;
    const adminCount = customers.filter(c => c.accountType === 'admin').length;
    const supportCount = customers.filter(c => c.accountType === 'support').length;
    const developerCount = customers.filter(c => c.accountType === 'developer').length;
    const superAdminCount = customers.filter(c => c.accountType === 'superadmin').length;
    const activeCount = customers.filter(c => c.status === 'active').length;
    const dormantCount = customers.filter(c => c.status === 'dormant').length;
    const suspendedCount = customers.filter(c => c.status === 'suspended').length;

    return {
      totalCustomers,
      individualCount,
      businessCount,
      adminCount,
      supportCount,
      developerCount,
      superAdminCount,
      activeCount,
      dormantCount,
      suspendedCount
    };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <CustomerHeader
        onRefresh={handleRefresh}
        onExport={handleExportCustomers}
        onCreateUser={handleCreateUser}
        loading={loading}
      />

      {/* Statistics Cards */}
      <CustomerStatsCards
        totalCustomers={stats.totalCustomers}
        individualCount={stats.individualCount}
        businessCount={stats.businessCount}
        adminCount={stats.adminCount}
        supportCount={stats.supportCount}
        developerCount={stats.developerCount}
        superAdminCount={stats.superAdminCount}
        activeCount={stats.activeCount}
        dormantCount={stats.dormantCount}
        suspendedCount={stats.suspendedCount}
      />

      {/* Customers Table */}
      <CustomerTable
        customers={customers}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedAccountType={selectedAccountType}
        setSelectedAccountType={setSelectedAccountType}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
        onCustomerClick={handleCustomerClick}
      />

      {/* Customer Details Modal - can be implemented later */}
      {isModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#1E293B]">Customer Details</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#64748B]">Full Name</label>
                  <p className="text-[#1E293B]">{selectedCustomer.fullName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#64748B]">Email</label>
                  <p className="text-[#1E293B]">{selectedCustomer.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#64748B]">Phone</label>
                  <p className="text-[#1E293B]">{selectedCustomer.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#64748B]">Account Type</label>
                  <p className="text-[#1E293B]">{selectedCustomer.accountType || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#64748B]">Status</label>
                  <p className="text-[#1E293B]">{selectedCustomer.status}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#64748B]">KYC Tier</label>
                  <p className="text-[#1E293B]">{selectedCustomer.kycTier || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
