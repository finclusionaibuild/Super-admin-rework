import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import { Avatar, AvatarFallback } from "../../../../components/ui/avatar";
import { 
  ArrowRightIcon, 
  PlusIcon, 
  ChevronDownIcon,
  SearchIcon,
  UserIcon,
  CreditCardIcon,
  NetworkIcon,
  WalletIcon,
  BellIcon
} from "lucide-react";

export const DashboardPreview = (): JSX.Element => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 mx-auto max-w-6xl overflow-hidden shadow-xl">
      {/* Dashboard header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <img 
            src="/Logo Alternate Transparent.png" 
            alt="SureBanker" 
            className="h-8 w-auto object-contain"
          />
          <div className="flex items-center gap-2 text-sm text-[#667085]">
            <span>Secure</span>
            <div className="w-1 h-1 bg-[#4340ff] rounded-full"></div>
            <span>Reliable</span>
            <div className="w-1 h-1 bg-[#4340ff] rounded-full"></div>
            <span>Trusted</span>
          </div>
        </div>
        
        <div className="font-semibold text-[#4340ff] text-lg">
          Good day, Carchy
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="p-2">
              <SearchIcon className="w-4 h-4 text-[#667085]" />
            </Button>
            <div className="relative">
              <Button variant="ghost" size="sm" className="p-2">
                <BellIcon className="w-4 h-4 text-[#667085]" />
              </Button>
              <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 bg-[#ff0f0f] text-xs">
                1
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="font-semibold text-[#1c274c] text-sm">
                Carchy Atinse
              </div>
            </div>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-[#4340ff] text-white text-sm">CA</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-[#f8f9ff] p-4 flex flex-col gap-4 min-h-[500px]">
          <div className="flex flex-col gap-2">
            <Button variant="ghost" className="text-sm text-[#667085] hover:bg-[#ededff] justify-start px-3 py-2">
              Switch to Business
              <span className="ml-auto bg-[#4340ff] text-white text-xs px-2 py-1 rounded">Personal</span>
            </Button>
          </div>

          <div className="flex-1 flex flex-col gap-1">
            {[
              { name: "Dashboard", active: true, icon: "📊" },
              { name: "Payments", hasDropdown: true, icon: "💳" },
              { name: "Transactions", icon: "📋" },
              { name: "Cards", icon: "💳" },
              { name: "SureSavings", icon: "💰" },
              { name: "SureBudget", icon: "📊" },
              { name: "SureEscrow", icon: "🤝" },
              { name: "Inbox", notifications: 99, icon: "📧" },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  item.active
                    ? "bg-[#1c274c] text-white"
                    : "text-[#667085] hover:bg-[#ededff]"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <div className="flex-1 font-medium">{item.name}</div>
                {item.hasDropdown && (
                  <ChevronDownIcon className="w-4 h-4" />
                )}
                {item.notifications && (
                  <div className="bg-[#f63440] rounded-full w-5 h-5 flex items-center justify-center text-xs text-white font-bold">
                    {item.notifications > 99 ? "99+" : item.notifications}
                  </div>
                )}
              </div>
            ))}
          </div>

          <Card className="bg-[#1c274c] text-white p-4 rounded-xl">
            <CardContent className="p-0 flex flex-col gap-3">
              <div className="text-sm text-[#ecf4e9]">
                Gain full access to rewards and bonuses when you get your
                friends to use <span className="font-bold">SureBanker</span>
              </div>
              <Button className="bg-[#4340ff] text-white text-sm h-10 px-4 py-2 hover:bg-[#3632e6]">
                Refer & Earn
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          {/* Action buttons */}
          <div className="flex justify-end gap-3 mb-6">
            <Button className="bg-[#4340ff] text-white text-sm h-10 px-6 py-2 flex items-center gap-2 hover:bg-[#3632e6]">
              <PlusIcon className="h-4 w-4" />
              <span>Add Money</span>
            </Button>
            <Button className="bg-[#4340ff] text-white text-sm h-10 px-6 py-2 flex items-center gap-2 hover:bg-[#3632e6]">
              <ArrowRightIcon className="h-4 w-4" />
              <span>Transfer</span>
            </Button>
          </div>

          {/* Account cards - Matching reference image exactly */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {/* SureBanker Card */}
            <Card className="bg-gradient-to-br from-[#4340ff] to-[#6366f1] text-white h-32 relative overflow-hidden">
              <CardContent className="p-4 flex flex-col justify-between h-full relative">
                {/* Decorative circles */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/5 rounded-full"></div>
                <div className="absolute top-8 right-2 w-8 h-8 bg-yellow-400 rounded-full"></div>
                
                <div className="relative z-10">
                  <div className="font-semibold text-sm mb-1">SureBanker</div>
                  <div className="text-xs opacity-80">Current Balance</div>
                </div>
                <div className="relative z-10">
                  <div className="font-bold text-xl">₦120,000.00</div>
                  <div className="text-xs opacity-80 mt-1">
                    Click to view Account Details
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SureSavings Card */}
            <Card className="bg-[#f8f9ff] text-[#1c274c] h-32 border border-gray-100">
              <CardContent className="p-4 flex flex-col justify-between h-full">
                <div>
                  <div className="font-semibold text-sm mb-1">SureSavings</div>
                  <div className="text-xs text-[#667085]">Yesterday interest</div>
                </div>
                <div>
                  <div className="font-bold text-xl text-[#4340ff]">₦120,000.00</div>
                  <div className="text-sm font-semibold text-[#4340ff] mt-1">+₦18,000</div>
                </div>
              </CardContent>
            </Card>

            {/* SureBudget Card */}
            <Card className="bg-gradient-to-br from-[#ffbd16] to-[#f59e0b] text-white h-32">
              <CardContent className="p-4 flex flex-col justify-between h-full">
                <div className="font-semibold text-sm">SureBudget</div>
                <div className="font-bold text-xl">₦120,000.00</div>
              </CardContent>
            </Card>

            {/* SureEscrow Card */}
            <Card className="bg-gradient-to-br from-[#7007f6] to-[#8b5cf6] text-white h-32 relative">
              <CardContent className="p-4 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs text-white/80 mb-1">Jobs</div>
                    <div className="bg-[#4340ff] w-8 h-8 rounded border-2 border-white flex items-center justify-center">
                      <span className="text-white font-bold text-sm">12</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-sm">SureEscrow</div>
                  </div>
                </div>
                <div className="font-bold text-xl">₦120,000.00</div>
              </CardContent>
            </Card>
          </div>

          {/* KYC notification */}
          <Card className="bg-[#f1f0ff] border border-[#a7a5ff] mb-6">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-[#4340ff]" />
                </div>
                <div>
                  <div className="font-semibold text-[#1e1e1e] text-base">
                    Complete Your KYC
                  </div>
                  <div className="text-[#596682] text-sm">
                    Complete your KYC to create an account on surebanker.
                  </div>
                </div>
              </div>
              <Button className="bg-[#4340ff] text-white text-sm h-10 px-6 hover:bg-[#3632e6]">
                Complete
              </Button>
            </CardContent>
          </Card>

          {/* Quick actions */}
          <div className="mb-6">
            <div className="text-[#667085] font-semibold text-sm mb-3">
              Quick Actions
            </div>
            <div className="flex gap-4">
              {[
                { title: "Business Hub", icon: "🏢" },
                { title: "Airtime", icon: "📱" },
                { title: "Data", icon: "📶" },
              ].map((action, index) => (
                <div
                  key={index}
                  className="bg-[#f5f5ff] border border-[#d8d7ff] rounded-xl w-24 h-20 p-3 flex flex-col items-center justify-center gap-2 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="text-2xl">{action.icon}</div>
                  <div className="text-[#667085] text-xs font-medium text-center">
                    {action.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};