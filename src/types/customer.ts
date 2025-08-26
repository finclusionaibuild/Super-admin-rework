// Customer Types
export interface ApiIndividualCustomer {
  id: string;
  finclusionId: string;
  phone: string;
  email: string;
  homeAddress: string | null;
  firstName: string;
  middleName: string;
  lastName: string;
  accountType: string | null;
  kycTier: string | null;
  accountOfficer: string;
  status: string;
  kycTierId: string | null;
  createdAt: string;
}

export interface ApiBusinessCustomer {
  id: string;
  name: string;
  slug: string | null;
  address: string | null;
  tagName: string | null;
  registrationType: string;
  rcNumber: string | null;
  city: string | null;
  state: string | null;
  businessSubCategoryId: string | null;
  isPepStatus: boolean;
  accountNo: string;
}

export type ApiCustomer = ApiIndividualCustomer | ApiBusinessCustomer;

export interface Customer {
  id: string;
  finclusionId: string;
  phone: string;
  email: string;
  homeAddress: string | null;
  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;
  accountType: 'individual' | 'business' | 'admin' | 'support' | 'developer' | 'superadmin' | null;
  kycTier: string | null;
  accountOfficer: string;
  status: 'active' | 'inactive' | 'dormant' | 'suspended' | 'pending';
  kycTierId: string | null;
  createdAt: string;
  region: string; // Derived from phone number or other logic
}

export interface CustomerApiResponse {
  statusCode: number;
  message: string;
  data: {
    paginatedData: ApiCustomer[];
    totalCount: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}

export interface CustomerApiParams {
  search?: string;
  accountType?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  page?: number;
  perPage?: number;
  signal?: AbortSignal; // For request cancellation
}

export interface PaginationInfo {
  currentPage: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}

export interface CustomerStats {
  totalCustomers: number;
  individualCount: number;
  businessCount: number;
  activeCount: number;
  dormantCount: number;
  suspendedCount: number;
}
