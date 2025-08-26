// Customer Transformers
import { ApiCustomer, ApiBusinessCustomer, ApiIndividualCustomer, Customer } from '../types/customer';

// Transform API customer to internal Customer format
export const transformApiCustomer = (apiCustomer: ApiCustomer): Customer => {
  // Handle both individual customers and business customers
  const isBusinessCustomer = 'name' in apiCustomer;

  if (isBusinessCustomer) {
    // Transform business customer
    const businessCustomer = apiCustomer as ApiBusinessCustomer;
    return {
      id: businessCustomer.id,
      finclusionId: businessCustomer.rcNumber || businessCustomer.id,
      phone: '', // Businesses may not have phone in this API
      email: '', // Businesses may not have email in this API
      homeAddress: businessCustomer.address,
      firstName: '', // Not applicable for businesses
      middleName: '', // Not applicable for businesses
      lastName: '', // Not applicable for businesses
      fullName: businessCustomer.name || 'Unknown Business',
      accountType: 'business' as const,
      kycTier: null, // Not provided in business API
      accountOfficer: '', // Not provided in business API
      status: 'active' as const, // Assume active if returned by API
      kycTierId: null,
      createdAt: new Date().toISOString(), // Not provided, use current date
      region: businessCustomer.state || businessCustomer.city || 'Unknown'
    };
  }

  // Transform individual customer
  const individualCustomer = apiCustomer as ApiIndividualCustomer;

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
    if (!status) return "inactive";
    const normalizedStatus = status.toLowerCase();
    if (normalizedStatus === 'active') return 'active';
    if (normalizedStatus === 'inactive') return 'inactive';
    if (normalizedStatus === 'dormant') return 'dormant';
    if (normalizedStatus === 'suspended') return 'suspended';
    if (normalizedStatus === 'pending') return 'pending';

    return 'inactive'; // Default fallback
  };

  // Create full name
  const fullName = [individualCustomer.firstName, individualCustomer.middleName, individualCustomer.lastName]
    .filter(Boolean)
    .join(' ');

  return {
    id: individualCustomer.id,
    finclusionId: individualCustomer.finclusionId,
    phone: individualCustomer.phone,
    email: individualCustomer.email,
    homeAddress: individualCustomer.homeAddress,
    firstName: individualCustomer.firstName,
    middleName: individualCustomer.middleName,
    lastName: individualCustomer.lastName,
    fullName,
    accountType: getAccountType(individualCustomer.accountType),
    kycTier: individualCustomer.kycTier,
    accountOfficer: individualCustomer.accountOfficer,
    status: getStatus(individualCustomer.status),
    kycTierId: individualCustomer.kycTierId,
    createdAt: individualCustomer.createdAt,
    region: getRegion(individualCustomer.phone)
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
