import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type AccountType = 'individual' | 'business';

export interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  accountType: AccountType;
}

export interface IndividualAccountData extends UserData {
  accountType: 'individual';
  personalInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    dateOfBirth: string;
    bvn: string;
    nin: string;
  };
  kycLevel: 'Tier 1' | 'Tier 2' | 'Tier 3';
  balance: number;
  savingsBalance: number;
  escrowBalance: number;
  cards: any[];
  transactions: any[];
  contacts: any[];
}

export interface BusinessAccountData extends UserData {
  accountType: 'business';
  businessInfo: {
    businessName: string;
    businessType: string;
    registrationNumber: string;
    taxId: string;
    address: string;
    industry: string;
    employees: number;
  };
  verificationStatus: 'pending' | 'verified' | 'rejected';
  balance: number;
  escrowBalance: number;
  payrollBalance: number;
  cards: any[];
  transactions: any[];
  employees: any[];
  vendors: any[];
  payrollHistory: any[];
}

interface AccountContextType {
  currentAccount: IndividualAccountData | BusinessAccountData | null;
  accountType: AccountType;
  switchAccountType: (type: AccountType) => void;
  updateAccountData: (data: Partial<IndividualAccountData | BusinessAccountData>) => void;
  getAccountSpecificData: () => IndividualAccountData | BusinessAccountData | null;
  resetAccountData: () => void;
  isBusinessAccount: boolean;
  isIndividualAccount: boolean;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

// Default data for individual account
const defaultIndividualData: IndividualAccountData = {
  id: 'ind_001',
  name: 'Carchy Atinse',
  email: 'carchy.atinse@email.com',
  avatar: 'CA',
  accountType: 'individual',
  personalInfo: {
    firstName: 'Carchy',
    lastName: 'Atinse',
    phone: '+234 801 234 5678',
    address: 'Lagos, Nigeria',
    dateOfBirth: '1990-05-15',
    bvn: '22345678901',
    nin: '12345678901'
  },
  kycLevel: 'Tier 2',
  balance: 120000,
  savingsBalance: 120000,
  escrowBalance: 120000,
  cards: [],
  transactions: [],
  contacts: []
};

// Default data for business account
const defaultBusinessData: BusinessAccountData = {
  id: 'bus_001',
  name: 'Atinse Enterprises',
  email: 'business@atinse.com',
  avatar: 'AE',
  accountType: 'business',
  businessInfo: {
    businessName: 'Atinse Enterprises',
    businessType: 'Technology',
    registrationNumber: 'RC123456',
    taxId: 'TIN987654321',
    address: 'Victoria Island, Lagos',
    industry: 'Software Development',
    employees: 25
  },
  verificationStatus: 'verified',
  balance: 2500000,
  escrowBalance: 500000,
  payrollBalance: 800000,
  cards: [],
  transactions: [],
  employees: [],
  vendors: [],
  payrollHistory: []
};

export const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accountType, setAccountType] = useState<AccountType>('individual');
  const [individualData, setIndividualData] = useState<IndividualAccountData>(defaultIndividualData);
  const [businessData, setBusinessData] = useState<BusinessAccountData>(defaultBusinessData);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize account type from localStorage on mount
  useEffect(() => {
    const savedAccountType = localStorage.getItem('accountType') as AccountType;
    const onboardingComplete = localStorage.getItem('onboardingComplete');
    
    // If coming from business onboarding, set to business
    if (onboardingComplete === 'true' && savedAccountType === 'business') {
      setAccountType('business');
    } else if (savedAccountType && (savedAccountType === 'individual' || savedAccountType === 'business')) {
    }
    setIsInitialized(true);
  }, []);

  // Save account type to localStorage when it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('accountType', accountType);
    }
  }, [accountType]);

  const switchAccountType = (type: AccountType) => {
    setAccountType(type);
    // Clear any onboarding flags when manually switching
    localStorage.removeItem('onboardingComplete');
  };

  const updateAccountData = (data: Partial<IndividualAccountData | BusinessAccountData>) => {
    if (accountType === 'individual') {
      setIndividualData(prev => ({ ...prev, ...data } as IndividualAccountData));
    } else {
      setBusinessData(prev => ({ ...prev, ...data } as BusinessAccountData));
    }
  };

  // Get account-specific data without cross-contamination
  const getAccountSpecificData = () => {
    return accountType === 'individual' ? individualData : businessData;
  };

  // Reset account data when switching types
  const resetAccountData = () => {
    setIndividualData(defaultIndividualData);
    setBusinessData(defaultBusinessData);
  };
  const currentAccount = getAccountSpecificData();

  const value: AccountContextType = {
    currentAccount,
    accountType,
    switchAccountType,
    updateAccountData,
    getAccountSpecificData,
    resetAccountData,
    isBusinessAccount: accountType === 'business',
    isIndividualAccount: accountType === 'individual'
  };

  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = (): AccountContextType => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};