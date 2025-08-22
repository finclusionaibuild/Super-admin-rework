import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from '../../contexts/AccountContext';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { Avatar, AvatarFallback } from './avatar';
import { 
  UserIcon, 
  BuildingIcon, 
  ChevronDownIcon, 
  CheckIcon,
  ArrowRightIcon,
  SwitchCameraIcon
} from 'lucide-react';

interface AccountTypeSwitcherProps {
  variant?: 'sidebar' | 'header' | 'mobile';
  className?: string;
}

export const AccountTypeSwitcher: React.FC<AccountTypeSwitcherProps> = ({ 
  variant = 'sidebar',
  className = '' 
}) => {
  const { accountType, switchAccountType, currentAccount } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const accountTypes = [
    {
      type: 'individual' as const,
      name: 'Personal Account',
      description: 'Individual banking and personal finance',
      icon: <UserIcon className="w-5 h-5" />,
      avatar: 'CA',
      balance: '₦120,000',
      features: ['Personal Banking', 'Savings Goals', 'Bill Payments', 'Card Management'],
      route: '/dashboard'
    },
    {
      type: 'business' as const,
      name: 'Business Account',
      description: 'Business banking and corporate finance',
      icon: <BuildingIcon className="w-5 h-5" />,
      avatar: 'AE',
      balance: '₦2,500,000',
      features: ['Payroll Management', 'Bulk Transfers', 'Business Loans', 'Multi-user Access'],
      route: '/business-dashboard'
    }
  ];

  const currentAccountType = accountTypes.find(acc => acc.type === accountType);
  const otherAccountType = accountTypes.find(acc => acc.type !== accountType);

  const handleAccountSwitch = (newAccountType: 'individual' | 'business') => {
    switchAccountType(newAccountType);
    setIsOpen(false);
    
    // Navigate to appropriate dashboard
    const targetAccount = accountTypes.find(acc => acc.type === newAccountType);
    if (targetAccount) {
      navigate(targetAccount.route);
    }
  };

  // Sidebar variant - Full card with detailed info
  if (variant === 'sidebar') {
    return (
      <div className={`relative ${className}`}>
        <Card 
          className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 cursor-pointer hover:shadow-md transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-[#5B52FF] text-white">
                    {currentAccountType?.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-blue-900 text-sm">{currentAccountType?.name}</h3>
                  <p className="text-xs text-blue-700">{currentAccountType?.balance}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-800 text-xs">
                  {accountType === 'individual' ? 'Personal' : 'Business'}
                </Badge>
                <ChevronDownIcon className={`w-4 h-4 text-blue-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 z-50">
            <Card className="bg-white border shadow-lg">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Switch Account Type
                  </div>
                  
                  {accountTypes.map((account) => (
                    <div
                      key={account.type}
                      onClick={() => handleAccountSwitch(account.type)}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        account.type === accountType
                          ? 'bg-[#5B52FF] text-white'
                          : 'hover:bg-gray-50 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          account.type === accountType 
                            ? 'bg-white/20 text-white' 
                            : 'bg-[#5B52FF] text-white'
                        }`}>
                          {account.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm">{account.name}</h4>
                            {account.type === accountType && (
                              <CheckIcon className="w-4 h-4" />
                            )}
                          </div>
                          <p className={`text-xs ${
                            account.type === accountType ? 'text-white/80' : 'text-gray-500'
                          }`}>
                            {account.description}
                          </p>
                          <p className={`text-xs font-medium ${
                            account.type === accountType ? 'text-white' : 'text-[#5B52FF]'
                          }`}>
                            {account.balance}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }

  // Header variant - Compact button
  if (variant === 'header') {
    return (
      <div className={`relative ${className}`}>
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 h-10"
        >
          <div className="flex items-center gap-2">
            {currentAccountType?.icon}
            <span className="text-sm font-medium">{accountType === 'individual' ? 'Personal' : 'Business'}</span>
          </div>
          <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-80 z-50">
            <Card className="bg-white border shadow-lg">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Switch Account Type
                  </div>
                  
                  {accountTypes.map((account) => (
                    <div
                      key={account.type}
                      onClick={() => handleAccountSwitch(account.type)}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        account.type === accountType
                          ? 'bg-[#5B52FF] text-white'
                          : 'hover:bg-gray-50 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className={`${
                            account.type === accountType 
                              ? 'bg-white/20 text-white' 
                              : 'bg-[#5B52FF] text-white'
                          }`}>
                            {account.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm">{account.name}</h4>
                            {account.type === accountType && (
                              <CheckIcon className="w-4 h-4" />
                            )}
                          </div>
                          <p className={`text-xs ${
                            account.type === accountType ? 'text-white/80' : 'text-gray-500'
                          }`}>
                            {account.description}
                          </p>
                          <p className={`text-xs font-medium ${
                            account.type === accountType ? 'text-white' : 'text-[#5B52FF]'
                          }`}>
                            {account.balance}
                          </p>
                        </div>
                        <ArrowRightIcon className="w-4 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }

  // Mobile variant - Compact for mobile screens
  if (variant === 'mobile') {
    return (
      <div className={`relative ${className}`}>
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 h-10 w-full"
        >
          <div className="flex items-center gap-2">
            {currentAccountType?.icon}
            <span className="text-sm font-medium">{currentAccountType?.name}</span>
          </div>
          <ChevronDownIcon className={`w-4 h-4 ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 z-50">
            <Card className="bg-white border shadow-lg">
              <CardContent className="p-3">
                <div className="space-y-2">
                  {accountTypes.map((account) => (
                    <div
                      key={account.type}
                      onClick={() => handleAccountSwitch(account.type)}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        account.type === accountType
                          ? 'bg-[#5B52FF] text-white'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          account.type === accountType 
                            ? 'bg-white/20 text-white' 
                            : 'bg-[#5B52FF] text-white'
                        }`}>
                          {account.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm">{account.name}</h4>
                            {account.type === accountType && (
                              <CheckIcon className="w-4 h-4" />
                            )}
                          </div>
                          <p className={`text-xs ${
                            account.type === accountType ? 'text-white/80' : 'text-gray-500'
                          }`}>
                            {account.balance}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }

  return null;
};