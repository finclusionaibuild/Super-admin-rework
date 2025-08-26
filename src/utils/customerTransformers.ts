// Customer Transformers
import { ApiCustomer, Customer } from '../types/customer';

// Transform API customer to internal Customer format
export const transformApiCustomer = (apiCustomer: ApiCustomer): Customer => {
  // Derive region from phone number (basic logic)
  const getRegion = (phone: string | null): string => {
    if (!phone) return 'Unknown';

    if (phone.startsWith('+234') || phone.startsWith('080') || phone.startsWith('081') || phone.startsWith('090') || phone.startsWith('070')) {
      return 'Nigeria';
    }
    if (phone.startsWith('+233') || phone.startsWith('0')) {
      return 'Ghana';
    }
    return 'Unknown';
  };

  // Normalize account type
  const getAccountType = (accountType: string | null): Customer['accountType'] => {
    if (!accountType) return null;

    const type = accountType.toLowerCase();
    if (type.includes('individual')) return 'individual';
    if (type.includes('business')) return 'business';
    if (type.includes('admin')) return 'admin';
    if (type.includes('support')) return 'support';
    if (type.includes('developer')) return 'developer';
    if (type.includes('superadmin')) return 'superadmin';

    return null;
  };

  // Normalize status
  const getStatus = (status: string): Customer['status'] => {
    const normalizedStatus = status.toLowerCase();
    if (normalizedStatus === 'active') return 'active';
    if (normalizedStatus === 'inactive') return 'inactive';
    if (normalizedStatus === 'dormant') return 'dormant';
    if (normalizedStatus === 'suspended') return 'suspended';
    if (normalizedStatus === 'pending') return 'pending';

    return 'inactive'; // Default fallback
  };

  // Create full name
  const fullName = [apiCustomer.firstName, apiCustomer.middleName, apiCustomer.lastName]
    .filter(Boolean)
    .join(' ');

  return {
    id: apiCustomer.id,
    finclusionId: apiCustomer.finclusionId,
    phone: apiCustomer.phone,
    email: apiCustomer.email,
    homeAddress: apiCustomer.homeAddress,
    firstName: apiCustomer.firstName,
    middleName: apiCustomer.middleName,
    lastName: apiCustomer.lastName,
    fullName,
    accountType: getAccountType(apiCustomer.accountType),
    kycTier: apiCustomer.kycTier,
    accountOfficer: apiCustomer.accountOfficer,
    status: getStatus(apiCustomer.status),
    kycTierId: apiCustomer.kycTierId,
    createdAt: apiCustomer.createdAt,
    region: getRegion(apiCustomer.phone)
  };
};

// Transform array of API customers
export const transformApiCustomers = (apiCustomers: ApiCustomer[]): Customer[] => {
  return apiCustomers.map(transformApiCustomer);
};

// Calculate customer statistics from customer data
export const calculateCustomerStats = (customers: Customer[]) => {
  const stats = {
    totalCustomers: customers.length,
    individualCount: customers.filter(c => c.accountType === 'individual').length,
    businessCount: customers.filter(c => c.accountType === 'business').length,
    activeCount: customers.filter(c => c.status === 'active').length,
    dormantCount: customers.filter(c => c.status === 'dormant').length,
    suspendedCount: customers.filter(c => c.status === 'suspended').length
  };

  return stats;
};
