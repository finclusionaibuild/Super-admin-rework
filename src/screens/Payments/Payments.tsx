import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../../contexts/AccountContext";
import { useAccountBalance, useAccountNavigation } from "../../hooks/useAccountData";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { BellIcon, SearchIcon, ArrowLeftIcon, PlusIcon, ArrowRightIcon, ChevronDownIcon, CreditCardIcon, WalletIcon, BanknoteIcon as BanknotesIcon, PhoneIcon, WifiIcon, ZapIcon, TvIcon, CarIcon, HomeIcon, GraduationCapIcon, ReceiptIcon, PiggyBankIcon, BarChart3Icon, HandshakeIcon, InboxIcon, StarIcon, UserIcon, DropletIcon } from "lucide-react";

export const Payments = (): JSX.Element => {
  const { currentAccount, isBusinessAccount } = useAccount();
  const { balanceInfo } = useAccountBalance();
  const [kycLevel, setKycLevel] = useState(2); // Get from account context
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const navigate = useNavigate();

  const paymentCategories = [
    { id: "airtime", name: "Airtime", icon: <PhoneIcon className="w-6 h-6" />, color: "bg-blue-500", action: () => navigate("/bill-payment?type=airtime") },
    { id: "data", name: "Data", icon: <WifiIcon className="w-6 h-6" />, color: "bg-green-500", action: () => navigate("/bill-payment?type=data") },
    { id: "electricity", name: "Electricity", icon: <ZapIcon className="w-6 h-6" />, color: "bg-yellow-500", action: () => navigate("/bill-payment?type=electricity") },
    { id: "cable", name: "Cable TV", icon: <TvIcon className="w-6 h-6" />, color: "bg-purple-500", action: () => navigate("/bill-payment?type=cable") },
    { id: "internet", name: "Internet", icon: <WifiIcon className="w-6 h-6" />, color: "bg-indigo-500", action: () => navigate("/bill-payment?type=internet") },
    { id: "transport", name: "Transport", icon: <CarIcon className="w-6 h-6" />, color: "bg-red-500", action: () => navigate("/bill-payment?type=transport") },
    { id: "rent", name: "Rent", icon: <HomeIcon className="w-6 h-6" />, color: "bg-orange-500", action: () => navigate("/bill-payment?type=rent") },
    { id: "water", name: "Water", icon: <DropletIcon className="w-6 h-6" />, color: "bg-blue-400", action: () => navigate("/bill-payment?type=water") },
    { id: "education", name: "Education/Exam", icon: <GraduationCapIcon className="w-6 h-6" />, color: "bg-green-600", action: () => navigate("/bill-payment?type=education") },
  ];

  const recentPayments = [
    { name: "MTN Airtime", amount: "₦1,000", date: "Today", status: "Successful", type: "airtime" },
    { name: "DSTV Subscription", amount: "₦4,500", date: "Yesterday", status: "Successful", type: "cable" },
    { name: "EKEDC Bill", amount: "₦8,200", date: "2 days ago", status: "Pending", type: "electricity" },
    { name: "Glo Data", amount: "₦2,000", date: "3 days ago", status: "Failed", type: "data" },
  ];

  const quickAmounts = ["₦500", "₦1,000", "₦2,000", "₦5,000"];


  // Mobile Navigation Items with navigation functions
  const mobileNavItems = [
    { 
      name: "Home", 
      icon: <HomeIcon className="w-6 h-6" />, 
      active: false,
      onClick: () => navigate("/dashboard")
    },
    { 
      name: "Transfer", 
      icon: <ArrowRightIcon className="w-6 h-6" />,
      onClick: () => navigate("/transfer")
    },
    { 
      name: "Payments", 
      icon: <CreditCardIcon className="w-6 h-6" />,
      active: true,
      onClick: () => navigate("/payments")
    },
    { 
      name: "Cards", 
      icon: <WalletIcon className="w-6 h-6" />,
      onClick: () => navigate("/cards")
    },
    { 
      name: "Profile", 
      icon: <UserIcon className="w-6 h-6" />,
      onClick: () => navigate("/profile")
    },
  ];

  const handlePayNow = () => {
    if (amount && recipient) {
      // Navigate to the appropriate bill payment page based on the selected category
      if (selectedCategory !== "all") {
        const category = paymentCategories.find(cat => cat.id === selectedCategory);
        if (category) {
          category.action();
        }
      } else {
        // Default to airtime if no category is selected
        navigate("/bill-payment?type=airtime");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Standardized Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
          <div className="p-6 border-b border-gray-200">
            <img 
              src="/Logo Main Trans.png" 
              alt="SureBanker" 
              className="h-8 w-auto object-contain"
            />
          </div>

          <nav className="flex-1 p-4 overflow-hidden">
            <div className="space-y-1">
              {[
                { name: "Dashboard", icon: <HomeIcon className="w-5 h-5" />, active: false, hasDropdown: false, onClick: () => navigate("/dashboard") },
                { name: "Payments", icon: <CreditCardIcon className="w-5 h-5" />, active: true, hasDropdown: true, onClick: () => navigate("/payments") },
                { name: "Transactions", icon: <ReceiptIcon className="w-5 h-5" />, hasDropdown: false, onClick: () => navigate("/transactions") },
                { name: "Cards", icon: <CreditCardIcon className="w-5 h-5" />, hasDropdown: false, onClick: () => navigate("/cards") },
                { name: "SureSavings", icon: <PiggyBankIcon className="w-5 h-5" />, hasDropdown: false, onClick: () => navigate("/sure-savings") },
                { name: "SureBudget", icon: <BarChart3Icon className="w-5 h-5" />, hasDropdown: false, onClick: () => navigate("/sure-budget") },
                { name: "SureEscrow", icon: <HandshakeIcon className="w-5 h-5" />, hasDropdown: false, onClick: () => navigate("/sure-escrow") },
                { name: "Inbox", icon: <InboxIcon className="w-5 h-5" />, notifications: 99, hasDropdown: false, onClick: () => navigate("/inbox") },
                { name: "Rate Us", icon: <StarIcon className="w-5 h-5" />, hasDropdown: false, onClick: () => navigate("/ratings") }
              ].map((item, index) => (
                <div
                  key={index}
                  onClick={item.onClick}
                  className={`px-3 py-2 rounded-lg flex items-center gap-3 cursor-pointer transition-colors ${
                    item.active
                      ? "bg-[#5B52FF] text-white"
                      : "text-[#64748B] hover:bg-gray-50"
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
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-[#1E293B]">Payments</h1>
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
                   onClick={() => navigate("/inbox")}
                 >
                    <BellIcon className="w-5 h-5 text-[#64748B]" />
                  </Button>
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0">
                    1
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-[#1E293B]">{currentAccount?.name || 'User'}</div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Payment Content */}
          <main className="flex-1 p-6">
            {/* KYC Upgrade Prompt for Payments */}
            {kycLevel < 2 && (
              <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <CreditCardIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900">Unlock Higher Payment Limits</h3>
                      <p className="text-sm text-blue-700">Complete KYC Tier 2 to increase your payment limits</p>
                    </div>
                  </div>
                  <Button 
                    className="bg-blue-600 text-white hover:bg-blue-700"
                    onClick={() => navigate("/notifications")}
                  >
                    Upgrade KYC
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-3 gap-6">
              {/* Payment Categories */}
              <div className="col-span-2">
                <h2 className="text-lg font-semibold text-[#1E293B] mb-6">Payment Categories</h2>
                <div className="grid grid-cols-4 gap-4 mb-8">
                  {paymentCategories.map((category) => (
                    <Card 
                      key={category.id} 
                      className={`cursor-pointer transition-all hover:shadow-md card-no-shadow ${
                        selectedCategory === category.id ? 'ring-2 ring-[#5B52FF]' : ''
                      }`}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        category.action();
                      }}
                    >
                      <CardContent className="p-4 text-center">
                        <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-3 text-white`}>
                          {category.icon}
                        </div>
                        <p className="text-sm font-medium text-[#1E293B]">{category.name}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recent Payments */}
                <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Recent Payments</h3>
                <div className="space-y-3">
                  {recentPayments.map((payment, index) => (
                    <Card key={index} className="card-no-shadow">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#F1F5F9] rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">{payment.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium text-[#1E293B]">{payment.name}</p>
                            <p className="text-sm text-[#64748B]">{payment.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#1E293B]">{payment.amount}</p>
                          <Badge 
                            className={`text-xs ${
                              payment.status === "Successful" 
                                ? "bg-green-100 text-green-800" 
                                : payment.status === "Failed"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {payment.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Payment Form */}
              <div>
                <Card className="card-no-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-[#1E293B] mb-6">Make Payment</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#1E293B] mb-2">
                          Select Service
                        </label>
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                          <option value="all">Choose service...</option>
                          <option value="airtime">MTN Airtime</option>
                          <option value="airtime">Airtel Airtime</option>
                          <option value="airtime">Glo Airtime</option>
                          <option value="airtime">9mobile Airtime</option>
                          <option value="data">Data Bundles</option>
                          <option value="electricity">Electricity Bills</option>
                          <option value="cable">Cable TV</option>
                          <option value="water">Water Bills</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#1E293B] mb-2">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          placeholder="Enter phone number"
                          value={recipient}
                          onChange={(e) => setRecipient(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#1E293B] mb-2">
                          Amount
                        </label>
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                        <div className="flex gap-2 mt-2">
                          {quickAmounts.map((quickAmount) => (
                            <Button
                              key={quickAmount}
                              variant="outline"
                              size="sm"
                              onClick={() => setAmount(quickAmount.replace('₦', '').replace(',', ''))}
                              className="text-xs"
                            >
                              {quickAmount}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-[#5B52FF] hover:bg-[#4338CA] text-white btn-primary"
                        onClick={handlePayNow}
                        disabled={!amount || !recipient}
                      >
                        Pay Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Balance Card */}
                <Card className="mt-6 card-no-shadow">
                  <CardContent className="p-6">
                    <h4 className="text-sm font-medium text-[#64748B] mb-2">Available Balance</h4>
                    <p className="text-2xl font-bold text-[#1E293B]">₦{balanceInfo?.mainBalance.toLocaleString() || '0'}.00</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-3 w-full"
                      onClick={() => navigate("/add-money")}
                    >
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Add Money
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Layout - STANDARDIZED */}
      <div className="lg:hidden bg-white">
        {/* Mobile Header - Consistent with Dashboard */}
        <header className="bg-white px-4 py-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-[#5B52FF] text-white">{currentAccount?.avatar || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold text-[#1E293B]">Payments</h1>
              <p className="text-xs text-[#64748B]">{isBusinessAccount ? 'Business payments' : 'Pay bills & services'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <BellIcon className="w-6 h-6 text-[#64748B]" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-white text-xs flex items-center justify-center p-0">
                1
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <span>NGN</span>
              <div className="w-6 h-4 bg-green-500 rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Content - Standardized Layout */}
        <main className="p-4 pb-20">
          {/* Balance Card - Standard Height */}
          <Card className="bg-gradient-to-r from-[#5B52FF] to-[#7C3AED] text-white mb-6 card-no-shadow">
            <CardContent className="p-4">
              <p className="text-sm opacity-80 mb-1">Available Balance</p>
              <p className="text-2xl font-bold">₦{balanceInfo?.mainBalance.toLocaleString() || '0'}.00</p>
            </CardContent>
          </Card>

          {/* Payment Categories Grid - Standard Layout */}
          <h2 className="text-lg font-semibold text-[#1E293B] mb-4">Payment Categories</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {paymentCategories.slice(0, 6).map((category) => (
              <Card 
                key={category.id} 
                className="cursor-pointer card-no-shadow"
                onClick={category.action}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-2 text-white`}>
                    {category.icon}
                  </div>
                  <p className="text-sm font-medium text-[#1E293B]">{category.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Payment Form - Standard Height */}
          <Card className="mb-6 card-no-shadow">
            <CardContent className="p-4">
              <h3 className="font-semibold text-[#1E293B] mb-4">Quick Payment</h3>
              <div className="space-y-3">
                <Input placeholder="Phone number" value={recipient} onChange={(e) => setRecipient(e.target.value)} className="h-12" />
                <Input placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-12" />
                <Button 
                  className="w-full bg-[#5B52FF] text-white btn-primary h-14"
                  onClick={handlePayNow}
                  disabled={!amount || !recipient}
                >
                  Pay Now
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Payments - Standard Layout */}
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Recent Payments</h3>
          <div className="space-y-3">
            {recentPayments.slice(0, 3).map((payment, index) => (
              <Card key={index} className="card-no-shadow">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#F1F5F9] rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">{payment.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1E293B]">{payment.name}</p>
                      <p className="text-xs text-[#64748B]">{payment.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#1E293B]">{payment.amount}</p>
                    <Badge 
                      className={`text-xs ${
                        payment.status === "Successful" 
                          ? "bg-green-100 text-green-800" 
                          : payment.status === "Failed"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {payment.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>

        {/* Mobile Bottom Navigation - Consistent with Dashboard */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex items-center justify-around">
            {mobileNavItems.map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center py-2 cursor-pointer"
                onClick={item.onClick}
              >
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