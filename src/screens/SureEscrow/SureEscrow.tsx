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
  HandshakeIcon,
  ShieldCheckIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon,
  EyeIcon,
  FileTextIcon,
  DollarSignIcon,
  HomeIcon,
  CreditCardIcon,
  ReceiptIcon,
  PiggyBankIcon,
  BarChart3Icon,
  InboxIcon,
  StarIcon,
  UserIcon
} from "lucide-react";

export const SureEscrow = (): JSX.Element => {
  const { currentAccount } = useAccount();
  const navigate = useNavigate();
  const [newEscrowAmount, setNewEscrowAmount] = useState("");
  const [newEscrowDescription, setNewEscrowDescription] = useState("");

  const escrowData = {
    totalEscrow: 120000,
    activeJobs: 12,
    completedJobs: 45,
    pendingReleases: 3
  };

  const escrowJobs = [
    {
      id: "ESC001",
      title: "Website Development",
      amount: 50000,
      status: "In Progress",
      client: "Tech Corp Ltd",
      freelancer: "John Developer",
      dueDate: "Sep 15, 2024",
      progress: 75
    },
    {
      id: "ESC002", 
      title: "Logo Design",
      amount: 25000,
      status: "Completed",
      client: "StartUp Inc",
      freelancer: "Jane Designer",
      dueDate: "Aug 30, 2024",
      progress: 100
    },
    {
      id: "ESC003",
      title: "Mobile App UI",
      amount: 75000,
      status: "Pending Release",
      client: "Mobile Solutions",
      freelancer: "Mike Designer",
      dueDate: "Sep 10, 2024",
      progress: 100
    },
    {
      id: "ESC004",
      title: "Content Writing",
      amount: 15000,
      status: "Disputed",
      client: "Content Agency",
      freelancer: "Sarah Writer",
      dueDate: "Aug 25, 2024",
      progress: 50
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "Pending Release": return "bg-yellow-100 text-yellow-800";
      case "Disputed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Progress": return <ClockIcon className="w-4 h-4" />;
      case "Completed": return <CheckCircleIcon className="w-4 h-4" />;
      case "Pending Release": return <ShieldCheckIcon className="w-4 h-4" />;
      case "Disputed": return <XCircleIcon className="w-4 h-4" />;
      default: return <FileTextIcon className="w-4 h-4" />;
    }
  };

  const mobileNavItems = [
    { name: "Home", icon: <HomeIcon className="w-6 h-6" />, onClick: () => navigate("/dashboard") },
    { name: "Escrow", icon: <HandshakeIcon className="w-6 h-6" />, active: true, onClick: () => navigate("/sure-escrow") },
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
              {[
                { name: "Dashboard", icon: <HomeIcon className="w-5 h-5" />, onClick: () => navigate("/dashboard") },
                { name: "Payments", icon: <CreditCardIcon className="w-5 h-5" />, onClick: () => navigate("/payments") },
                { name: "Transactions", icon: <ReceiptIcon className="w-5 h-5" />, onClick: () => navigate("/transactions") },
                { name: "Cards", icon: <CreditCardIcon className="w-5 h-5" />, onClick: () => navigate("/cards") },
                { name: "SureSavings", icon: <PiggyBankIcon className="w-5 h-5" />, onClick: () => navigate("/sure-savings") },
                { name: "SureBudget", icon: <BarChart3Icon className="w-5 h-5" />, onClick: () => navigate("/sure-budget") },
                { name: "SureEscrow", icon: <HandshakeIcon className="w-5 h-5" />, active: true, onClick: () => navigate("/sure-escrow") },
                { name: "Inbox", icon: <InboxIcon className="w-5 h-5" />, notifications: 99, onClick: () => navigate("/inbox") },
                { name: "Rate Us", icon: <StarIcon className="w-5 h-5" />, onClick: () => navigate("/ratings") }
              ].map((item, index) => (
                <div
                  key={index}
                  onClick={item.onClick}
                  className={`px-3 py-2 rounded-lg flex items-center gap-3 cursor-pointer transition-colors ${
                    item.active ? "bg-[#5B52FF] text-white" : "text-[#64748B] hover:bg-gray-50"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
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
                <h1 className="text-xl font-semibold text-[#1E293B]">SureEscrow</h1>
              </div>
              <div className="flex items-center gap-3">
                <Button className="bg-[#5B52FF] text-white">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Create Escrow
                </Button>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-[#5B52FF] text-white">{currentAccount?.avatar || 'CA'}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">
            {/* Escrow Overview */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-[#7007f6] to-[#8b5cf6] text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSignIcon className="w-8 h-8" />
                    <div>
                      <h3 className="font-semibold">Total Escrow</h3>
                      <p className="text-white/80 text-sm">Funds in escrow</p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold">₦{escrowData.totalEscrow.toLocaleString()}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#3b82f6] to-[#2563eb] text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <ClockIcon className="w-8 h-8" />
                    <div>
                      <h3 className="font-semibold">Active Jobs</h3>
                      <p className="text-white/80 text-sm">In progress</p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold">{escrowData.activeJobs}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircleIcon className="w-8 h-8" />
                    <div>
                      <h3 className="font-semibold">Completed</h3>
                      <p className="text-white/80 text-sm">Successfully finished</p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold">{escrowData.completedJobs}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#f59e0b] to-[#d97706] text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <ShieldCheckIcon className="w-8 h-8" />
                    <div>
                      <h3 className="font-semibold">Pending Release</h3>
                      <p className="text-white/80 text-sm">Awaiting approval</p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold">{escrowData.pendingReleases}</p>
                </CardContent>
              </Card>
            </div>

            {/* Escrow Jobs */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-[#1E293B]">Escrow Jobs</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileTextIcon className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button className="bg-[#5B52FF] text-white" size="sm">
                      <PlusIcon className="w-4 h-4 mr-2" />
                      New Escrow
                    </Button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">JOB ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TITLE</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CLIENT</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">FREELANCER</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">AMOUNT</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">DUE DATE</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">PROGRESS</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {escrowJobs.map((job, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{job.id}</td>
                          <td className="py-3 px-4 text-sm text-[#1E293B]">{job.title}</td>
                          <td className="py-3 px-4 text-sm text-[#64748B]">{job.client}</td>
                          <td className="py-3 px-4 text-sm text-[#64748B]">{job.freelancer}</td>
                          <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">₦{job.amount.toLocaleString()}</td>
                          <td className="py-3 px-4 text-sm text-[#64748B]">{job.dueDate}</td>
                          <td className="py-3 px-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-[#5B52FF] h-2 rounded-full" 
                                style={{ width: `${job.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-[#64748B] mt-1">{job.progress}%</span>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={`${getStatusColor(job.status)} flex items-center gap-1 w-fit`}>
                              {getStatusIcon(job.status)}
                              {job.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <EyeIcon className="w-4 h-4" />
                              </Button>
                              {job.status === "Pending Release" && (
                                <Button size="sm" className="bg-green-600 text-white">
                                  Release
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
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
            <h1 className="text-lg font-semibold text-[#1E293B]">SureEscrow</h1>
          </div>
          <Button className="bg-[#5B52FF] text-white" size="sm">
            <PlusIcon className="w-4 h-4" />
          </Button>
        </header>

        <main className="p-4 pb-20">
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-[#7007f6] to-[#8b5cf6] text-white">
              <CardContent className="p-6 text-center">
                <HandshakeIcon className="w-12 h-12 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Total Escrow</h3>
                <p className="text-3xl font-bold">₦{escrowData.totalEscrow.toLocaleString()}</p>
                <p className="text-white/80 text-sm mt-2">{escrowData.activeJobs} active jobs</p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {escrowJobs.map((job, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-[#1E293B]">{job.title}</h4>
                      <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                    </div>
                    <p className="text-sm text-[#64748B] mb-2">{job.client} → {job.freelancer}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#1E293B]">₦{job.amount.toLocaleString()}</span>
                      <span className="text-sm text-[#64748B]">{job.progress}% complete</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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