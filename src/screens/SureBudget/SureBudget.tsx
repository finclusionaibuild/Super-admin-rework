import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../../contexts/AccountContext";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { 
  BellIcon, 
  SearchIcon, 
  ArrowLeftIcon,
  BarChart3Icon,
  TrendingUpIcon,
  TrendingDownIcon,
  CalendarIcon,
  PlusIcon,
  EditIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  HomeIcon,
  CreditCardIcon,
  ReceiptIcon,
  PiggyBankIcon,
  HandshakeIcon,
  InboxIcon,
  StarIcon,
  UserIcon,
  ChevronDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MoreHorizontalIcon
} from "lucide-react";

interface BudgetCategory {
  id: string;
  name: string;
  budgeted: number;
  spent: number;
  percentage: number;
  color: string;
  icon: string;
}

interface Transaction {
  id: string;
  type: 'Income' | 'Withdraw';
  member: string;
  date: string;
  time: string;
  amount: number;
  description: string;
}

export const SureBudget = (): JSX.Element => {
  const { currentAccount } = useAccount();
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("Today");
  const [transactionPeriod, setTransactionPeriod] = useState("This Month");

  const currentBudget = {
    amount: 120000,
    period: "Current Budget"
  };

  const budgetCategories: BudgetCategory[] = [
    {
      id: "groceries",
      name: "Groceries",
      budgeted: 30233,
      spent: 6047,
      percentage: 20,
      color: "bg-pink-200",
      icon: "🛒"
    },
    {
      id: "transportation", 
      name: "Transportation",
      budgeted: 30233,
      spent: 6047,
      percentage: 20,
      color: "bg-green-200",
      icon: "🚗"
    },
    {
      id: "feeding",
      name: "Feeding", 
      budgeted: 30233,
      spent: 6047,
      percentage: 20,
      color: "bg-red-200",
      icon: "🍽️"
    },
    {
      id: "rent",
      name: "Rent",
      budgeted: 30233,
      spent: 6047,
      percentage: 20,
      color: "bg-yellow-200",
      icon: "🏠"
    }
  ];

  const budgetGoals = [
    {
      name: "Shopping",
      amount: 275000,
      percentage: 55,
      color: "bg-slate-800"
    },
    {
      name: "Flexing", 
      amount: 100000,
      percentage: 20,
      color: "bg-purple-400"
    },
    {
      name: "Investments",
      amount: 75000,
      percentage: 15,
      color: "bg-slate-600"
    },
    {
      name: "Mutual Funds",
      amount: 50000,
      percentage: 10,
      color: "bg-gray-300"
    }
  ];

  const totalAssets = {
    amount: 500000,
    change: "+5% compared to last year"
  };

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "Income",
      member: "Andrew Forbat",
      date: "2028-09-01",
      time: "09:00 AM",
      amount: 1500,
      description: "Monthly contribution to fund"
    },
    {
      id: "2",
      type: "Income", 
      member: "Sarah Connors",
      date: "2028-09-01",
      time: "10:15 AM",
      amount: 1500,
      description: "Monthly contribution to fund"
    },
    {
      id: "3",
      type: "Income",
      member: "Mike Johnson",
      date: "2028-09-04",
      time: "11:30 AM",
      amount: 1500,
      description: "Monthly contribution to fund"
    },
    {
      id: "4",
      type: "Withdraw",
      member: "Andrew Forbat",
      date: "2028-07-15",
      time: "02:00 PM",
      amount: 1200,
      description: "Used for urgent travel booking"
    },
    {
      id: "5",
      type: "Income",
      member: "Andrew Forbat",
      date: "2028-09-01",
      time: "09:00 AM",
      amount: 1500,
      description: "Monthly contribution to fund"
    },
    {
      id: "6",
      type: "Income",
      member: "Sarah Connors", 
      date: "2028-09-01",
      time: "10:15 AM",
      amount: 1500,
      description: "Monthly contribution to fund"
    },
    {
      id: "7",
      type: "Income",
      member: "Mike Johnson",
      date: "2028-09-04", 
      time: "11:30 AM",
      amount: 1500,
      description: "Monthly contribution to fund"
    }
  ];

  const navItems = [
    { name: "Dashboard", icon: <HomeIcon className="w-5 h-5" />, onClick: () => navigate("/dashboard") },
    { name: "Payments", icon: <CreditCardIcon className="w-5 h-5" />, hasDropdown: true, onClick: () => navigate("/payments") },
    { name: "Transactions", icon: <ReceiptIcon className="w-5 h-5" />, onClick: () => navigate("/transactions") },
    { name: "Cards", icon: <CreditCardIcon className="w-5 h-5" />, onClick: () => navigate("/cards") },
    { name: "SureSavings", icon: <PiggyBankIcon className="w-5 h-5" />, onClick: () => navigate("/sure-savings") },
    { name: "SureBudget", icon: <BarChart3Icon className="w-5 h-5" />, active: true, onClick: () => navigate("/sure-budget") },
    { name: "SureEscrow", icon: <HandshakeIcon className="w-5 h-5" />, onClick: () => navigate("/sure-escrow") },
    { name: "Inbox", icon: <InboxIcon className="w-5 h-5" />, notifications: 99, onClick: () => navigate("/inbox") },
    { name: "Rate Us", icon: <StarIcon className="w-5 h-5" />, onClick: () => navigate("/ratings") }
  ];

  const mobileNavItems = [
    { name: "Home", icon: <HomeIcon className="w-6 h-6" />, onClick: () => navigate("/dashboard") },
    { name: "Budget", icon: <BarChart3Icon className="w-6 h-6" />, active: true, onClick: () => navigate("/sure-budget") },
    { name: "Cards", icon: <CreditCardIcon className="w-6 h-6" />, onClick: () => navigate("/cards") },
    { name: "Profile", icon: <UserIcon className="w-6 h-6" />, onClick: () => navigate("/profile") }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
          <div className="p-6 border-b border-gray-200">
            <img src="/Logo Main Trans.png" alt="SureBanker" className="h-8 w-auto object-contain" />
          </div>
          
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  onClick={item.onClick}
                  className={`px-3 py-2 rounded-lg flex items-center gap-3 cursor-pointer transition-colors ${
                    item.active ? "bg-[#5B52FF] text-white" : "text-[#64748B] hover:bg-gray-50"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDownIcon className="w-4 h-4 ml-auto" />
                  )}
                  {item.notifications && (
                    <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-auto">
                      {item.notifications}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </nav>

          <div className="p-4">
            <Card className="bg-[#1E293B] text-white card-no-shadow">
              <CardContent className="p-4">
                <p className="text-sm text-gray-300 mb-3">
                  Gain full access to rewards and bonuses when you get your friends to use{" "}
                  <span className="font-bold">SureBanker</span>
                </p>
                <Button className="w-full bg-[#5B52FF] hover:bg-[#4338CA] text-white btn-primary">
                  Refer & Earn
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col ml-64">
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
                  <ArrowLeftIcon className="w-4 h-4" />
                </Button>
                <h1 className="text-xl font-semibold text-[#1E293B]">Good day, {currentAccount?.name?.split(' ')[0] || 'Carchy'}</h1>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="p-2">
                  <SearchIcon className="w-5 h-5 text-[#64748B]" />
                </Button>
                
                <div className="relative">
                 <Button 
                   variant="ghost" 
                   size="sm" 
                   className="p-2"
                   onClick={() => navigate("/notifications")}
                 >
                    <BellIcon className="w-5 h-5 text-[#64748B]" />
                  </Button>
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0">
                    1
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-[#1E293B]">{currentAccount?.name || 'Carchy Atinse'}</div>
                  </div>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-[#5B52FF] text-white">{currentAccount?.avatar || 'CA'}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 bg-gray-50">
            <div className="grid grid-cols-12 gap-6">
              {/* Left Section - Current Budget & Categories */}
              <div className="col-span-5 space-y-6">
                {/* Current Budget Card */}
                <Card className="bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-500 text-white relative overflow-hidden">
                  <CardContent className="p-6">
                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white/30 rotate-45"></div>
                      <div className="absolute top-12 left-12 w-6 h-6 border-2 border-white/20 rotate-12"></div>
                      <div className="absolute bottom-8 right-8 w-10 h-10 border-2 border-white/25 -rotate-12"></div>
                      <div className="absolute bottom-4 right-4 w-4 h-4 border-2 border-white/30 rotate-45"></div>
                    </div>
                    
                    <div className="relative z-10">
                      <p className="text-white/90 text-sm mb-2">{currentBudget.period}</p>
                      <p className="text-4xl font-bold">₦ {currentBudget.amount.toLocaleString()}.00</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Budget Categories */}
                <div className="grid grid-cols-2 gap-4">
                  {budgetCategories.map((category) => (
                    <Card key={category.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{category.icon}</span>
                            <span className="font-medium text-[#1E293B] text-sm">{category.name}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="p-1">
                            <PlusIcon className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-[#1E293B]">₦{category.spent.toLocaleString()}</span>
                            <span className="text-xs text-[#64748B]">20% spent</span>
                          </div>
                          
                          {/* Circular Progress */}
                          <div className="flex justify-center">
                            <div className="relative w-16 h-16">
                              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                                <circle
                                  cx="32"
                                  cy="32"
                                  r="28"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  fill="none"
                                  className="text-gray-200"
                                />
                                <circle
                                  cx="32"
                                  cy="32"
                                  r="28"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  fill="none"
                                  strokeDasharray={`${category.percentage * 1.76} 176`}
                                  className={category.color.includes('pink') ? 'text-pink-400' : 
                                           category.color.includes('green') ? 'text-green-400' :
                                           category.color.includes('red') ? 'text-red-400' : 'text-yellow-400'}
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs font-bold">{category.percentage}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Middle Section - Budget Goals */}
              <div className="col-span-3 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-[#1E293B]">Budget Goals</h3>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <span>{selectedPeriod}</span>
                        <ChevronDownIcon className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Donut Chart */}
                    <div className="flex justify-center mb-6">
                      <div className="relative w-32 h-32">
                        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
                          {/* Background circle */}
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="none"
                            className="text-gray-200"
                          />
                          {/* Progress segments */}
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray="193.6 351.9"
                            className="text-slate-800"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray="70.4 351.9"
                            strokeDashoffset="-193.6"
                            className="text-purple-400"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-xs text-[#64748B]">Total Assets</span>
                          <span className="text-lg font-bold text-[#1E293B]">₦{totalAssets.amount.toLocaleString()}</span>
                          <span className="text-xs text-green-600">{totalAssets.change}</span>
                        </div>
                      </div>
                    </div>

                    {/* Budget Goals List */}
                    <div className="space-y-3">
                      {budgetGoals.map((goal, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 ${goal.color} rounded`}></div>
                            <span className="text-sm font-medium text-[#1E293B]">{goal.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-[#1E293B]">{goal.percentage}%</div>
                            <div className="text-xs text-[#64748B]">₦{goal.amount.toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Section - Transactions */}
              <div className="col-span-4 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-[#1E293B]">Transactions</h3>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <span>{transactionPeriod}</span>
                        <ChevronDownIcon className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Transaction Headers */}
                    <div className="grid grid-cols-4 gap-4 text-xs font-medium text-[#64748B] pb-3 border-b mb-4">
                      <span>Transaction Type</span>
                      <span>Date & Time</span>
                      <span>Amount</span>
                      <span>Brief Note</span>
                    </div>

                    {/* Transaction List */}
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {transactions.map((transaction) => (
                        <div key={transaction.id} className="grid grid-cols-4 gap-4 text-sm py-2 hover:bg-gray-50 rounded-lg px-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              transaction.type === 'Income' ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                              {transaction.type === 'Income' ? (
                                <ArrowUpIcon className="w-3 h-3 text-green-600" />
                              ) : (
                                <ArrowDownIcon className="w-3 h-3 text-red-600" />
                              )}
                            </div>
                            <div>
                              <div className={`text-xs font-medium ${
                                transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {transaction.type}
                              </div>
                              <div className="text-xs text-[#64748B]">{transaction.member}</div>
                            </div>
                          </div>
                          <div className="text-xs text-[#64748B]">
                            <div>{transaction.date}</div>
                            <div>{transaction.time}</div>
                          </div>
                          <div className={`text-xs font-medium ${
                            transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'Income' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                          </div>
                          <div className="text-xs text-[#64748B]">{transaction.description}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <header className="bg-white px-4 py-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
              <ArrowLeftIcon className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-semibold text-[#1E293B]">SureBudget</h1>
          </div>
        </header>

        <main className="p-4 pb-20">
          <div className="space-y-6">
            {/* Mobile Current Budget */}
            <Card className="bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-500 text-white">
              <CardContent className="p-6 text-center">
                <BarChart3Icon className="w-12 h-12 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Current Budget</h3>
                <p className="text-3xl font-bold">₦{currentBudget.amount.toLocaleString()}</p>
              </CardContent>
            </Card>

            {/* Mobile Budget Categories */}
            <div className="grid grid-cols-2 gap-4">
              {budgetCategories.map((category) => (
                <Card key={category.id}>
                  <CardContent className="p-4 text-center">
                    <span className="text-2xl mb-2 block">{category.icon}</span>
                    <h4 className="font-medium text-[#1E293B] text-sm mb-2">{category.name}</h4>
                    <p className="text-lg font-bold">₦{category.spent.toLocaleString()}</p>
                    <p className="text-xs text-[#64748B]">{category.percentage}% spent</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Mobile Transactions */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-[#1E293B] mb-4">Recent Transactions</h3>
                <div className="space-y-3">
                  {transactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          transaction.type === 'Income' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {transaction.type === 'Income' ? (
                            <ArrowUpIcon className="w-4 h-4 text-green-600" />
                          ) : (
                            <ArrowDownIcon className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{transaction.member}</p>
                          <p className="text-xs text-[#64748B]">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-semibold ${
                          transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'Income' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex items-center justify-around">
            {mobileNavItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center py-2 cursor-pointer" onClick={item.onClick}>
                <div className={`${item.active ? 'text-[#5B52FF]' : 'text-gray-400'}`}>
                  {item.icon}
                </div>
                <span className={`text-xs mt-1 ${item.active ? 'text-[#5B52FF] font-medium' : 'text-gray-400'}`}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};