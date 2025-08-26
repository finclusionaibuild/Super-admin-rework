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
  LoaderIcon,
  UserIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  CalendarIcon,
  ShieldIcon
} from 'lucide-react';
import { Customer, PaginationInfo } from '../../../../types/customer';

interface CustomerTableProps {
  customers: Customer[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedAccountType: string;
  setSelectedAccountType: (type: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  loading: boolean;
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  onCustomerClick: (customer: Customer) => void;
}

export const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  searchQuery,
  setSearchQuery,
  selectedAccountType,
  setSelectedAccountType,
  selectedStatus,
  setSelectedStatus,
  selectedRegion,
  setSelectedRegion,
  loading,
  pagination,
  onPageChange,
  onPerPageChange,
  onCustomerClick
}) => {
  // Format date helper
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return 'N/A';
    }
  };

  // Get status badge color
  const getStatusBadge = (status: Customer['status']) => {
    const statusConfig = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'dormant': 'bg-yellow-100 text-yellow-800',
      'suspended': 'bg-red-100 text-red-800',
      'pending': 'bg-blue-100 text-blue-800'
    };
    return statusConfig[status] || 'bg-gray-100 text-gray-800';
  };

  // Get account type badge color
  const getAccountTypeBadge = (accountType: Customer['accountType']) => {
    const typeConfig = {
      'individual': 'bg-blue-100 text-blue-800',
      'business': 'bg-green-100 text-green-800',
      'admin': 'bg-purple-100 text-purple-800',
      'support': 'bg-orange-100 text-orange-800',
      'developer': 'bg-indigo-100 text-indigo-800',
      'superadmin': 'bg-pink-100 text-pink-800'
    };
    return typeConfig[accountType || ''] || 'bg-gray-100 text-gray-800';
  };

  // Get KYC tier badge
  const getKycTierBadge = (tier: string | null) => {
    if (!tier) return 'bg-gray-100 text-gray-800';

    const tierConfig = {
      'Tier 1': 'bg-yellow-100 text-yellow-800',
      'Tier 2': 'bg-blue-100 text-blue-800',
      'Tier 3': 'bg-green-100 text-green-800'
    };
    return tierConfig[tier as keyof typeof tierConfig] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card>
      <CardContent className="p-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <Input
                placeholder="Search customers by name, email, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <select
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={selectedAccountType}
            onChange={(e) => setSelectedAccountType(e.target.value)}
          >
            <option value="all">All Account Types</option>
            <option value="individual">Individual</option>
            <option value="business">Business</option>
            <option value="admin">Admin</option>
            <option value="support">Support</option>
            <option value="developer">Developer</option>
            <option value="superadmin">SuperAdmin</option>
          </select>

          <select
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="dormant">Dormant</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
          </select>

          <select
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="all">All Regions</option>
            <option value="nigeria">Nigeria</option>
            <option value="ghana">Ghana</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <LoaderIcon className="w-8 h-8 animate-spin text-[#5B52FF]" />
              <span className="ml-2 text-[#64748B]">Loading customers...</span>
            </div>
          ) : customers.length === 0 ? (
            <div className="text-center py-12">
              <UserIcon className="w-12 h-12 text-[#64748B] mx-auto mb-4" />
              <p className="text-[#64748B]">No customers found</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-[#1E293B]">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#1E293B]">Contact</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#1E293B]">Account Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#1E293B]">KYC Tier</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#1E293B]">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#1E293B]">Account Officer</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#1E293B]">Created</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#1E293B]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => onCustomerClick(customer)}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#5B52FF] rounded-full flex items-center justify-center text-white font-semibold">
                          {customer.firstName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-[#1E293B]">{customer.fullName}</p>
                          <p className="text-sm text-[#64748B]">{customer.finclusionId}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <MailIcon className="w-3 h-3" />
                          <span className="text-[#64748B]">{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <PhoneIcon className="w-3 h-3" />
                          <span className="text-[#64748B]">{customer.phone}</span>
                        </div>
                        {customer.homeAddress && (
                          <div className="flex items-center gap-1 text-sm">
                            <MapPinIcon className="w-3 h-3" />
                            <span className="text-[#64748B] truncate max-w-32">
                              {customer.homeAddress}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <Badge className={getAccountTypeBadge(customer.accountType)}>
                        {customer.accountType || 'N/A'}
                      </Badge>
                    </td>

                    <td className="py-4 px-4">
                      <Badge className={getKycTierBadge(customer.kycTier)}>
                        {customer.kycTier || 'N/A'}
                      </Badge>
                    </td>

                    <td className="py-4 px-4">
                      <Badge className={getStatusBadge(customer.status)}>
                        {customer.status}
                      </Badge>
                    </td>

                    <td className="py-4 px-4">
                      <span className="text-[#64748B]">{customer.accountOfficer}</span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-sm text-[#64748B]">
                        <CalendarIcon className="w-3 h-3" />
                        <span>{formatDate(customer.createdAt)}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <ActionsDropdown
                        actions={[
                          {
                            label: 'View Details',
                            icon: <EyeIcon className="w-4 h-4" />,
                            onClick: () => onCustomerClick(customer)
                          },
                          {
                            label: 'Edit Customer',
                            icon: <RefreshCwIcon className="w-4 h-4" />,
                            onClick: () => console.log('Edit customer', customer.id)
                          },
                          {
                            label: 'Change Status',
                            icon: <AlertTriangleIcon className="w-4 h-4" />,
                            onClick: () => console.log('Change status', customer.id)
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
        {!loading && customers.length > 0 && (
          <div className="mt-6">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              perPage={pagination.perPage}
              totalCount={pagination.totalCount}
              onPageChange={onPageChange}
              onPerPageChange={onPerPageChange}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
