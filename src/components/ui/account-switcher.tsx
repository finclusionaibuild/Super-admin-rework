import React, { useState } from 'react';
import { Avatar, AvatarFallback } from './avatar';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { ChevronDownIcon, BuildingIcon, PlusIcon, CheckCircleIcon } from 'lucide-react';

interface BusinessAccount {
  id: string;
  name: string;
  type: string;
  balance: number;
  employees: number;
  status: string;
  kybTier: number;
  avatar: string;
}

interface AccountSwitcherProps {
  accounts?: BusinessAccount[];
  selectedAccount?: string;
  onAccountChange?: (accountId: string) => void;
  showBalance?: boolean;
  compact?: boolean;
}

export const AccountSwitcher: React.FC<AccountSwitcherProps> = ({
  accounts = [
    {
      id: 'main',
      name: 'Atinse Enterprises',
      type: 'Main Business',
      balance: 2500000,
      employees: 247,
      status: 'Active',
      kybTier: 3,
      avatar: 'AE'
    },
    {
      id: 'subsidiary1',
      name: 'Atinse Tech Solutions',
      type: 'Subsidiary',
      balance: 850000,
      employees: 45,
      status: 'Active',
      kybTier: 2,
      avatar: 'AT'
    },
    {
      id: 'subsidiary2',
      name: 'Atinse Logistics',
      type: 'Subsidiary',
      balance: 420000,
      employees: 28,
      status: 'Active',
      kybTier: 2,
      avatar: 'AL'
    },
    {
      id: 'branch1',
      name: 'Atinse Ghana Branch',
      type: 'Branch Office',
      balance: 650000,
      employees: 67,
      status: 'Active',
      kybTier: 3,
      avatar: 'AG'
    },
    {
      id: 'branch2',
      name: 'Atinse Kenya Branch',
      type: 'Branch Office',
      balance: 380000,
      employees: 34,
      status: 'Pending Setup',
      kybTier: 1,
      avatar: 'AK'
    }
  ],
  selectedAccount = 'main',
  onAccountChange,
  showBalance = true,
  compact = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(selectedAccount);

  const handleAccountChange = (accountId: string) => {
    setCurrentAccount(accountId);
    setIsOpen(false);
    if (onAccountChange) {
      onAccountChange(accountId);
    }
  };

  const selectedAccountData = accounts.find(acc => acc.id === currentAccount) || accounts[0];

  if (compact) {
    return (
      <div className="relative">
        <Button
          variant="ghost"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 p-2"
        >
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-[#5B52FF] text-white">
              {selectedAccountData.avatar}
            </AvatarFallback>
          </Avatar>
          <ChevronDownIcon className="w-4 h-4" />
        </Button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-4">
              <h3 className="font-semibold text-[#1E293B] mb-3">Switch Business Account</h3>
              <div className="space-y-2">
                {accounts.map((account) => (
                  <div
                    key={account.id}
                    onClick={() => handleAccountChange(account.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      account.id === currentAccount 
                        ? 'bg-[#F8F9FF] border border-[#5B52FF]' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-[#5B52FF] text-white">
                          {account.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-[#1E293B]">{account.name}</p>
                          {account.id === currentAccount && (
                            <CheckCircleIcon className="w-4 h-4 text-[#5B52FF]" />
                          )}
                        </div>
                        <p className="text-sm text-[#64748B]">{account.type}</p>
                        {showBalance && (
                          <p className="text-sm font-medium text-[#1E293B]">₦{account.balance.toLocaleString()}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <Badge className={
                          account.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }>
                          {account.status}
                        </Badge>
                        <p className="text-xs text-[#64748B] mt-1">KYB Tier {account.kybTier}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200">
                <Button variant="outline" className="w-full" size="sm">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Link New Business Account
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#5B52FF] rounded-lg flex items-center justify-center">
              <BuildingIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">Business Account Selector</h3>
              <p className="text-sm text-blue-700">Switch between your linked business accounts</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={currentAccount}
              onChange={(e) => handleAccountChange(e.target.value)}
              className="px-4 py-2 border border-blue-300 rounded-lg bg-white text-sm min-w-[200px]"
            >
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name} ({account.type})
                </option>
              ))}
            </select>
            <Button 
              variant="outline" 
              size="sm"
              className="border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Link Account
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};