import React from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../../contexts/AccountContext";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { Badge } from "./badge";
import { 
  HomeIcon, 
  CreditCardIcon, 
  ReceiptIcon, 
  PiggyBankIcon, 
  BarChart3Icon, 
  HandshakeIcon, 
  InboxIcon, 
  StarIcon, 
  ChevronDownIcon,
  UsersIcon,
  FileTextIcon,
  BuildingIcon,
  DollarSignIcon,
  TrendingUpIcon
} from "lucide-react";

export const Sidebar = (): JSX.Element => {
  const navigate = useNavigate();
  const { isBusinessAccount } = useAccount();

  // Define navigation items based on account type
  let navItems;
  
  if (isBusinessAccount) {
    navItems = [
      {
        name: "Dashboard",
        icon: <HomeIcon className="w-5 h-5" />,
        active: true,
        onClick: () => navigate("/business-dashboard")
      },
      {
        name: "Payroll",
        icon: <UsersIcon className="w-5 h-5" />,
        onClick: () => navigate("/payroll")
      },
      {
        name: "Bulk Transfer",
        icon: <FileTextIcon className="w-5 h-5" />,
        onClick: () => navigate("/bulk-transfer")
      },
      {
        name: "POS Dashboard",
        icon: <CreditCardIcon className="w-5 h-5" />,
        onClick: () => navigate("/pos")
      },
      {
        name: "Business Loans",
        icon: <DollarSignIcon className="w-5 h-5" />,
        onClick: () => navigate("/loans")
      },
      {
        name: "Reports",
        icon: <BarChart3Icon className="w-5 h-5" />,
        onClick: () => navigate("/reports")
      },
      {
        name: "Inbox",
        icon: <InboxIcon className="w-5 h-5" />,
        notifications: 99,
        onClick: () => navigate("/inbox")
      },
      {
        name: "Rate Us",
        icon: <StarIcon className="w-5 h-5" />,
        onClick: () => navigate("/ratings")
      }
    ];
  } else {
    navItems = [
      {
        name: "Dashboard",
        icon: <HomeIcon className="w-5 h-5" />,
        active: false,
        onClick: () => navigate("/dashboard")
      },
      { 
        name: "Payments", 
        icon: <CreditCardIcon className="w-5 h-5" />, 
        hasDropdown: true,
        onClick: () => navigate("/payments")
      },
      { 
        name: "Transactions", 
        icon: <ReceiptIcon className="w-5 h-5" />,
        onClick: () => navigate("/transactions")
      },
      { 
        name: "Savings", 
        icon: <PiggyBankIcon className="w-5 h-5" />,
        onClick: () => navigate("/savings")
      },
      { 
        name: "Investments", 
        icon: <BarChart3Icon className="w-5 h-5" />,
        onClick: () => navigate("/investments")
      },
      { 
        name: "SureEscrow", 
        icon: <HandshakeIcon className="w-5 h-5" />,
        onClick: () => navigate("/dashboard")
      },
      { 
        name: "Inbox", 
        icon: <InboxIcon className="w-5 h-5" />, 
        notifications: 99,
        onClick: () => navigate("/inbox")
      },
      { 
        name: "Rate Us", 
        icon: <StarIcon className="w-5 h-5" />,
        onClick: () => navigate("/ratings")
      }
    ];
  }

  return (
    <div className={`w-64 border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0 ${
      isBusinessAccount ? 'bg-white' : 'bg-[#f8f9ff]'
    }`}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#5B52FF]/5 to-transparent">
        <div className="flex items-center gap-3">
          <img 
            src="/Logo Main Trans.png" 
            alt="SureBanker" 
            className="h-8 w-auto object-contain"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">
            MAIN MENU
          </div>
          {navItems.map((item, index) => (
            <div
              key={index}
              onClick={item.onClick}
              className={`px-4 py-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all duration-200 ${
                item.active
                  ? isBusinessAccount 
                    ? "bg-[#5B52FF] text-white shadow-lg"
                    : "bg-[#4340ff] text-white shadow-lg"
                  : "text-[#64748B] hover:bg-white hover:text-[#5B52FF]"
              }`}
            >
              <div className={`${item.active ? 'text-white' : ''}`}>
                {item.icon}
              </div>
              <span className="font-medium">{item.name}</span>
              {item.hasDropdown && (
                <ChevronDownIcon className="w-4 h-4 ml-auto" />
              )}
              {item.notifications && (
                <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-auto animate-pulse">
                  {item.notifications}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* User Info Card */}
      <div className="p-4">
        <Card className={`text-white overflow-hidden relative card-no-shadow ${
          isBusinessAccount 
            ? 'bg-gradient-to-br from-[#1E293B] via-[#334155] to-[#1E293B]' 
            : 'bg-[#1c274c]'
        }`}>
          {isBusinessAccount && (
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#5B52FF]/20 to-transparent rounded-full -mr-10 -mt-10"></div>
          )}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#5B52FF]/20 to-transparent rounded-full -mr-10 -mt-10"></div>
          <CardContent className="p-4 relative">
            {isBusinessAccount && (
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#5B52FF] to-[#7C3AED] rounded-full flex items-center justify-center">
                  <BuildingIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Business Account</p>
                  <p className="text-sm text-gray-300">Premium Features</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#5B52FF] to-[#7C3AED] rounded-full flex items-center justify-center">
                {isBusinessAccount ? (
                  <BuildingIcon className="w-6 h-6 text-white" />
                ) : (
                  <span className="text-white font-bold text-sm">CA</span>
                )}
              </div>
              <div>
                <p className="font-semibold">
                  {isBusinessAccount ? 'Atinse Enterprises' : 'Carchy Atinse'}
                </p>
                <p className="text-sm text-gray-300">
                  {isBusinessAccount ? 'Business User' : 'Premium User'}
                </p>
              </div>
            </div>
            <Button className={`w-full text-white btn-primary ${
              isBusinessAccount 
                ? 'bg-gradient-to-r from-[#5B52FF] to-[#7C3AED] hover:from-[#4338CA] hover:to-[#6D28D9] shadow-lg'
                : 'bg-[#4340ff] hover:bg-[#3632e6]'
            }`}>
              Refer & Earn
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};