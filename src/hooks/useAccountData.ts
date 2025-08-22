import { useAccount } from '../contexts/AccountContext';

// Hook for getting account-specific navigation items
export const useAccountNavigation = () => {
  const { accountType, isBusinessAccount } = useAccount();

  const getNavigationItems = () => {
    const baseItems = [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Payments", path: "/payments" },
      { name: "Transactions", path: "/transactions" },
      { name: "Cards", path: "/cards" }
    ];

    if (isBusinessAccount) {
      return [
        ...baseItems,
        { name: "Payroll", path: "/payroll" },
        { name: "Vendors", path: "/vendors" },
        { name: "Employees", path: "/employees" },
        { name: "Business Reports", path: "/business-reports" },
        { name: "SureEscrow", path: "/dashboard" },
        { name: "Inbox", path: "/inbox" },
        { name: "Rate Us", path: "/ratings" }
      ];
    }

    return [
      ...baseItems,
      { name: "SureSavings", path: "/dashboard" },
      { name: "SureBudget", path: "/dashboard" },
      { name: "SureEscrow", path: "/dashboard" },
      { name: "Inbox", path: "/inbox" },
      { name: "Rate Us", path: "/ratings" }
    ];
  };

  return { navigationItems: getNavigationItems() };
};

// Hook for getting account-specific balance information
export const useAccountBalance = () => {
  const { currentAccount, isBusinessAccount } = useAccount();

  const getBalanceInfo = () => {
    if (!currentAccount) return null;

    if (isBusinessAccount) {
      const businessAccount = currentAccount as any;
      return {
        mainBalance: businessAccount.balance,
        escrowBalance: businessAccount.escrowBalance,
        payrollBalance: businessAccount.payrollBalance,
        totalBalance: businessAccount.balance + businessAccount.escrowBalance + businessAccount.payrollBalance
      };
    }

    const individualAccount = currentAccount as any;
    return {
      mainBalance: individualAccount.balance,
      savingsBalance: individualAccount.savingsBalance,
      escrowBalance: individualAccount.escrowBalance,
      totalBalance: individualAccount.balance + individualAccount.savingsBalance + individualAccount.escrowBalance
    };
  };

  return { balanceInfo: getBalanceInfo() };
};

// Hook for getting account-specific transaction data
export const useAccountTransactions = () => {
  const { currentAccount, accountType } = useAccount();

  const getTransactions = () => {
    if (!currentAccount) return [];
    
    // Return account-specific transactions
    return currentAccount.transactions || [];
  };

  const addTransaction = (transaction: any) => {
    // Add transaction to the current account's transaction list
    // This would typically involve API calls
    console.log(`Adding transaction to ${accountType} account:`, transaction);
  };

  return { 
    transactions: getTransactions(),
    addTransaction
  };
};

// Hook for getting account-specific card data
export const useAccountCards = () => {
  const { currentAccount, accountType } = useAccount();

  const getCards = () => {
    if (!currentAccount) return [];
    
    // Return account-specific cards
    return currentAccount.cards || [];
  };

  const addCard = (card: any) => {
    // Add card to the current account's card list
    console.log(`Adding card to ${accountType} account:`, card);
  };

  return { 
    cards: getCards(),
    addCard
  };
};