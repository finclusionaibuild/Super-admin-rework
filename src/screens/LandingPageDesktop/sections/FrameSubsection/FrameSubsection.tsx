import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CalendarIcon,
  ChevronDownIcon,
  CreditCardIcon,
  NetworkIcon,
  PlusIcon,
  SearchIcon,
  UserIcon,
  WalletIcon,
} from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback } from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

export const FrameSubsection = (): JSX.Element => {
  // Account cards data
  const accountCards = [
    {
      type: "Surebanker",
      title: "Current Balance",
      amount: "₦120,000.00",
      bgColor: "bg-[#4340ff]",
      textColor: "text-white",
      details: "Tap for view Account Details",
    },
    {
      type: "SureSavings",
      title: "Yesterday interest",
      amount: "₦120,000.00",
      interest: "+₦18,000",
      bgColor: "bg-[#f7f7ff]",
      textColor: "text-[#0030dc]",
      detailsColor: "text-[#667085]",
    },
    {
      type: "SureBudget",
      amount: "₦120,000.00",
      bgColor: "bg-[#ffbd16]",
      textColor: "text-white",
    },
    {
      type: "SureEscrow",
      amount: "₦120,000.00",
      bgColor: "bg-[#7007f6]",
      textColor: "text-white",
      jobs: "12",
    },
  ];

  // Quick actions data
  const quickActions = [
    { title: "Airtime", icon: <CreditCardIcon className="h-3.5 w-3.5" /> },
    { title: "Data", icon: <NetworkIcon className="h-3.5 w-3.5" /> },
    { title: "Bills", icon: <WalletIcon className="h-3.5 w-3.5" /> },
  ];

  // Contacts data
  const contacts = [
    { name: "Tosin" },
    { name: "Wallmart" },
    { name: "Dada" },
    { name: "Tosin" },
    { name: "Wallmart" },
  ];

  // Monthly data for chart
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Expense categories data
  const expenseCategories = [
    {
      name: "Rent & Living",
      percentage: "60%",
      amount: "₦10,100",
      bgColor: "bg-[#1c274c]",
      textColor: "text-[#e1e1ee]",
    },
    {
      name: "Investment",
      percentage: "15%",
      amount: "₦500",
      bgColor: "bg-[#a6a4fa]",
      textColor: "text-black",
    },
    {
      name: "Education",
      percentage: "12%",
      amount: "₦500",
      bgColor: "bg-[#e1e1ee]",
      textColor: "text-black",
    },
    {
      name: "Food & Drink",
      percentage: "8%",
      amount: "₦500",
      bgColor: "bg-[#f1f1f1]",
      textColor: "text-black",
    },
    {
      name: "Entertainment",
      percentage: "5%",
      amount: "₦500",
      bgColor: "bg-[#c0c0c0]",
      textColor: "text-black",
    },
  ];

  // Transaction data
  const transactions = [
    {
      name: "Oyi Nneka",
      type: "Credit",
      bank: "Zenith",
      amount: "N100,000.00",
      id: "#CGA479847299244",
      date: "Aug 26, 2024",
      time: "14:30:23",
      description: "Buying Fuel",
    },
    {
      name: "Francis Okafor",
      type: "Debit",
      bank: "GTB",
      amount: "N100,000.00",
      id: "#CGA479847299244",
      date: "Aug 26, 2024",
      time: "14:30:23",
      description: "Airtime Purchase",
    },
    {
      name: "Ifechi Ezeh",
      type: "Credit",
      bank: "Zenith",
      amount: "N100,000.00",
      id: "#CGA479847299244",
      date: "Aug 26, 2024",
      time: "14:30:23",
      description: "Buying Fuel",
    },
    {
      name: "Dominic Ojebor",
      type: "Debit",
      bank: "UBA",
      amount: "N20,000.00",
      id: "#CGA479847299244",
      date: "Aug 26, 2024",
      time: "14:30:23",
      description: "Airtime Purchase",
    },
    {
      name: "Dominic Ojebor",
      type: "Credit",
      bank: "Unity",
      amount: "N32,000.00",
      id: "#CGA479847299244",
      date: "Aug 26, 2024",
      time: "14:30:23",
      description: "Buying Fuel",
    },
    {
      name: "Temitope Adeniyi",
      type: "Debit",
      bank: "GTB",
      amount: "N21,456.00",
      id: "#CGA479847299244",
      date: "Aug 26, 2024",
      time: "14:30:23",
      description: "Airtime Purchase",
    },
    {
      name: "Emma Sotomi",
      type: "Credit",
      bank: "UBA",
      amount: "N72,000.00",
      id: "#CGA479847299244",
      date: "Aug 26, 2024",
      time: "14:30:23",
      description: "Buying Fuel",
    },
    {
      name: "Antoni Parabelli",
      type: "Debit",
      bank: "Unity",
      amount: "N32,800.00",
      id: "#CGA479847299244",
      date: "Aug 26, 2024",
      time: "14:30:23",
      description: "Airtime Purchase",
    },
    {
      name: "Marie Stone",
      type: "Credit",
      bank: "GTB",
      amount: "N21,890.00",
      id: "#CGA479847299244",
      date: "Aug 26, 2024",
      time: "14:30:23",
      description: "Buying Fuel",
    },
    {
      name: "Anne Unbrigde",
      type: "Credit",
      bank: "Zenith",
      amount: "N21,456",
      id: "#CGA479847299244",
      date: "Aug 26, 2024",
      time: "14:30:23",
      description: "Airtime Purchase",
    },
  ];

  // Navigation items
  const navItems = [
    { name: "Dashboard", icon: "Icon nav squaresfour", active: true },
    { name: "Payments", icon: "Icon nav creditcard", hasDropdown: true },
    { name: "Transactions", icon: "Icon nav" },
    { name: "Cards", icon: "Icon nav cardholder" },
    { name: "SureSavings", icon: "Icon nav coins" },
    { name: "SureBudget", icon: "Outline business" },
    { name: "SureEscrow", icon: "Outline hands hand" },
    { name: "Inbox", icon: "Icon nav envelope", notifications: 99 },
    { name: "Rate Us", icon: "Outline like medal" },
  ];

  return (
    <section className="w-full">
      <div className="mx-auto rounded-3xl bg-[#eaeaff] overflow-hidden relative">
        <div className="w-full">
          {/* Main heading */}
          <div className="text-center pt-24 pb-12">
            <h1 className="text-6xl font-semibold text-[#201f4f] tracking-normal leading-normal max-w-3xl mx-auto">
              Effortlessly Manage & control your spending
            </h1>
          </div>

          {/* Dashboard preview */}
          <div className="bg-white rounded-lg border border-[#4340ff1a] border-[10.42px] mx-auto max-w-5xl overflow-hidden">
            {/* Dashboard header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-[#ededf1]">
              <div className="font-bold text-[#41276d] text-sm">
                Good day, Carchy
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="p-1.5 bg-[#efefff] rounded-full">
                    {/* Search icon placeholder */}
                    <div className="w-2.5 h-2.5"></div>
                  </div>
                  <div className="p-1.5 bg-[#efefff] rounded-full relative">
                    {/* Bell icon placeholder */}
                    <div className="w-2.5 h-2.5"></div>
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 bg-[#ff0f0f] text-[0.5rem]">
                      1
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="font-bold text-[#1c274c] text-xs">
                      Carchy Atinse
                    </div>
                  </div>
                  <Avatar className="h-5 w-5">
                    <AvatarFallback>CA</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>

            <div className="flex">
              {/* Sidebar */}
              <div className="w-32 bg-[#ebebff] p-2 flex flex-col gap-3 h-[640px]">
                <div className="flex flex-col gap-1">
                  <div className="h-7 flex items-center">
                    {/* Logo placeholder */}
                    <div className="w-14 h-7 text-center font-bold text-xs">
                      SUREBANKER
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[5.7px] text-[#667085] font-semibold">
                    <span>Secure</span>
                    <div className="w-0.5 h-0.5 bg-[#0030dc] rounded-full"></div>
                    <span>Reliable</span>
                    <div className="w-0.5 h-0.5 bg-[#0030dc] rounded-full"></div>
                    <span>Trusted</span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-1">
                  {navItems.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs ${
                        item.active
                          ? "bg-[#4340ff] text-white"
                          : "text-gray-30 hover:bg-[#ededff] transition-colors"
                      }`}
                    >
                      <div className="w-3.5 h-3.5"></div>
                      <div className="flex-1 font-semibold">{item.name}</div>
                      {item.hasDropdown && (
                        <ChevronDownIcon className="w-2 h-2" />
                      )}
                      {item.notifications && (
                        <div className="bg-[#f63440] rounded-full w-3 h-3 flex items-center justify-center text-[0.5rem] text-white">
                          {item.notifications}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <Card className="bg-[#1c274c] text-white p-2 rounded-md">
                  <CardContent className="p-0 flex flex-col gap-2">
                    <div className="text-[6.9px] text-[#ecf4e9]">
                      Gain full access to rewards and bonuses when you get your
                      friends to use{" "}
                      <span className="font-bold">SureBanker</span>
                    </div>
                    <Button className="bg-[#4340ff] text-white text-[8px] h-6 px-2 py-1">
                      Refer & Earn
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Main content */}
              <div className="flex-1 p-4">
                {/* Action buttons */}
                <div className="flex justify-end gap-3 mb-4">
                  <Button className="bg-[#4340ff] text-white text-[8px] h-6 px-2 py-1 border border-[#0e3ee7] flex items-center gap-1">
                    <PlusIcon className="h-2 w-2" />
                    <span>Add Money</span>
                  </Button>
                  <Button className="bg-[#4340ff] text-white text-[8px] h-6 px-2 py-1 border border-[#0e3ee7] flex items-center gap-1">
                    <ArrowRightIcon className="h-2 w-2" />
                    <span>Transfer</span>
                  </Button>
                </div>

                {/* Account cards */}
                <div className="flex gap-2 mb-6">
                  {accountCards.map((card, index) => (
                    <Card
                      key={index}
                      className={`${card.bgColor} w-48 h-24 relative overflow-hidden`}
                    >
                      <CardContent className="p-4 flex flex-col items-center">
                        <div className="text-center">
                          <div
                            className={`font-bold text-[8px] ${card.textColor}`}
                          >
                            {card.type}
                          </div>
                          {card.title && (
                            <div
                              className={`text-[6.9px] ${card.textColor || "text-neutral-100"}`}
                            >
                              {card.title}
                            </div>
                          )}
                        </div>
                        <div
                          className={`font-bold text-sm mt-1 ${card.textColor}`}
                        >
                          {card.amount}
                        </div>
                        {card.interest && (
                          <div className="text-[6.9px] text-[#0030dc] font-semibold mt-1">
                            {card.interest}
                          </div>
                        )}
                        {card.details && (
                          <div
                            className={`text-[6.9px] font-semibold ${card.textColor} absolute bottom-2`}
                          >
                            {card.details}
                          </div>
                        )}
                        {card.jobs && (
                          <div className="absolute top-2 left-8 flex flex-col items-center">
                            <div className="text-[6.9px] text-[#d8d7ff]">
                              Jobs
                            </div>
                            <div className="bg-[#4340ff] w-6 h-6 rounded border border-white flex items-center justify-center">
                              <span className="text-white font-bold text-[9.2px]">
                                {card.jobs}
                              </span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* KYC notification */}
                <Card className="bg-[#f1f0ff] border border-[#a7a5ff] mb-6">
                  <CardContent className="p-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-white w-7 h-7 rounded flex items-center justify-center">
                        <UserIcon className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#1e1e1e] text-[8px]">
                          Complete Your KYC
                        </div>
                        <div className="text-[#596682] text-[6.9px] font-medium">
                          Complete your KYC to create an account on surebanker.
                        </div>
                      </div>
                    </div>
                    <Button className="bg-[#4340ff] text-white text-[8px] h-6 px-4">
                      Complete
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick actions and contacts */}
                <div className="flex justify-between mb-6">
                  {/* Quick actions */}
                  <div className="flex flex-col gap-1.5">
                    <div className="text-[#7b7b7b] font-bold text-[8px]">
                      Quick Actions
                    </div>
                    <div className="flex gap-2.5">
                      {quickActions.map((action, index) => (
                        <div
                          key={index}
                          className="bg-[#f5f5ff] border border-[#d8d7ff] shadow-[0px_4px_11px_rgba(68,64,255,0.12)] rounded w-[61px] h-10 p-1 relative"
                        >
                          <div className="absolute top-1.5 left-1.5">
                            {action.icon}
                          </div>
                          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[#7b7b7b] text-[6.9px] font-semibold">
                            {action.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contacts */}
                  <div className="flex flex-col gap-1.5">
                    <div className="text-[#7b7b7b] font-bold text-[8px]">
                      Tap to Send
                    </div>
                    <div className="flex gap-4">
                      {contacts.map((contact, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="bg-[#f2f9ff] w-8 h-8 rounded-full mb-1"></div>
                          <div className="text-[6.9px] font-light">
                            {contact.name}
                          </div>
                        </div>
                      ))}
                      <div className="flex flex-col items-center">
                        <div className="bg-[#f5f5ff] w-8 h-8 rounded-full mb-1 flex items-center justify-center">
                          <PlusIcon className="h-2 w-2" />
                        </div>
                        <div className="text-[6.9px] font-bold text-[#4340ff]">
                          Add
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Charts and statistics */}
                <div className="flex gap-6 mb-6">
                  {/* Cashflow chart */}
                  <Card className="border border-[#e4e6e5] flex-1">
                    <CardContent className="p-2">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-bold text-[#2a2a35] text-[9.2px]">
                          Cashflow
                        </div>
                        <div className="border border-[#e4e6e5] rounded px-1.5 py-1 text-[6.9px] font-semibold text-[#21204b] flex items-center gap-1">
                          This Year
                          <ChevronDownIcon className="h-2 w-2" />
                        </div>
                      </div>

                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <div className="text-[#383847] text-[5.7px]">
                            Total Balance
                          </div>
                          <div className="font-bold text-[#21204b] text-sm">
                            ₦120,000
                          </div>
                        </div>
                        <div className="flex gap-3 text-[6.9px]">
                          <div className="flex items-center gap-1">
                            <div className="w-1 h-1 bg-[#21204b] rounded-sm"></div>
                            <span className="font-semibold text-[#383847]">
                              Income
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-1 h-1 bg-[#408cff] rounded-sm"></div>
                            <span className="font-semibold text-[#383847]">
                              Expense
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Chart visualization - simplified representation */}
                      <div className="h-44 flex items-end justify-between">
                        {months.map((month, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center w-10"
                          >
                            <div className="w-6 h-36 relative">
                              <div
                                className={`absolute bottom-0 left-0 right-0 bg-[#4340ff] rounded-b-sm ${index === 5 ? "border-2 border-[#4340ff3d]" : ""}`}
                                style={{
                                  height: `${20 + Math.random() * 40}%`,
                                }}
                              ></div>
                              <div
                                className={`absolute bottom-0 left-0 right-0 bg-[#1c274c] rounded-t-sm ${index === 5 ? "border-2 border-[#4340ff3d]" : ""}`}
                                style={{
                                  height: `${10 + Math.random() * 30}%`,
                                  bottom: `${20 + Math.random() * 40}%`,
                                }}
                              ></div>
                            </div>
                            <div className="text-[#292934] text-[5.7px] mt-1">
                              {month}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Expense statistics */}
                  <Card className="border border-[#e6e6e6] w-60">
                    <CardContent className="p-2">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-bold text-[#2d2d38] text-[9.2px]">
                          Statistic
                        </div>
                        <div className="text-[#1c274c] text-[6.9px] font-semibold flex items-center gap-1">
                          This Month
                          <ChevronDownIcon className="h-2 w-2" />
                        </div>
                      </div>

                      <div className="flex mb-2">
                        <div className="flex-1 pb-1 border-b border-[#f1f1f1] text-[6.9px] font-semibold text-[#686871]">
                          Income <span className="text-[5.7px]">(₦48,000)</span>
                        </div>
                        <div className="flex-1 pb-1 border-b-[1.72px] border-[#a6a4fa] text-[6.9px] font-semibold text-[#1c274c]">
                          Expense{" "}
                          <span className="text-[5.7px]">(₦30,000)</span>
                        </div>
                      </div>

                      {/* Donut chart - simplified representation */}
                      <div className="h-20 flex items-center justify-center mb-2">
                        <div className="relative w-20 h-20 rounded-full border-8 border-[#1c274c] bg-white flex items-center justify-center">
                          <div className="absolute top-0 right-0 w-10 h-10 border-8 border-[#a6a4fa] rounded-tr-full"></div>
                          <div className="absolute bottom-0 right-0 w-10 h-10 border-8 border-[#e1e1ee] rounded-br-full"></div>
                          <div className="absolute bottom-0 left-0 w-10 h-10 border-8 border-[#f1f1f1] rounded-bl-full"></div>
                          <div className="text-center">
                            <div className="text-[4.6px] text-[#686871]">
                              Total Expense
                            </div>
                            <div className="font-bold text-[#1c274c] text-xs">
                              ₦30,100
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expense categories */}
                      <div className="flex flex-col gap-1.5">
                        {expenseCategories.map((category, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center"
                          >
                            <div className="flex items-center gap-1.5">
                              <div
                                className={`${category.bgColor} w-4.5 h-4.5 rounded flex items-center justify-center`}
                              >
                                <span
                                  className={`text-[6.9px] ${category.textColor}`}
                                >
                                  {category.percentage}
                                </span>
                              </div>
                              <div className="text-[6.9px] font-medium">
                                {category.name}
                              </div>
                            </div>
                            <div className="text-xs font-semibold">
                              {category.amount}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent transactions */}
                <div className="mb-4">
                  <div className="font-bold text-[#2a2a35] text-[9.2px] mb-2">
                    Recent Transactions
                  </div>

                  <div className="flex justify-between mb-2">
                    <div className="flex gap-2">
                      <Input
                        className="h-7 text-[8px] w-32"
                        placeholder="Search"
                        suffix={<SearchIcon className="h-2 w-2" />}
                      />
                      <Select>
                        <SelectTrigger className="h-7 text-[8px] w-28 bg-neutral-50 border-[#d4d4e1]">
                          <SelectValue placeholder="All Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Category</SelectItem>
                          <SelectItem value="income">Income</SelectItem>
                          <SelectItem value="expense">Expense</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger className="h-7 text-[8px] w-28 bg-neutral-50 border-[#d4d4e1]">
                          <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="h-7 text-[8px] flex items-center gap-1"
                      >
                        <CalendarIcon className="h-3 w-3" />
                        <span>1-30 August 2024</span>
                        <ChevronDownIcon className="h-3 w-3" />
                      </Button>
                      <Button className="h-7 text-[8px] bg-[#1c274c]">
                        Download
                      </Button>
                    </div>
                  </div>

                  <Table>
                    <TableHeader className="bg-[#eeeeff]">
                      <TableRow>
                        <TableHead className="text-[6.9px] font-semibold text-gray-500 py-1.5">
                          ACCOUNT NAME
                        </TableHead>
                        <TableHead className="text-[6.9px] font-semibold text-gray-500 py-1.5">
                          TRANSACTION
                        </TableHead>
                        <TableHead className="text-[6.9px] font-semibold text-gray-500 py-1.5">
                          TO BANK
                        </TableHead>
                        <TableHead className="text-[6.9px] font-semibold text-gray-500 py-1.5">
                          AMOUNT
                        </TableHead>
                        <TableHead className="text-[6.9px] font-semibold text-gray-500 py-1.5">
                          TRANSACTION ID
                        </TableHead>
                        <TableHead className="text-[6.9px] font-semibold text-gray-500 py-1.5">
                          DATE & TIME
                        </TableHead>
                        <TableHead className="text-[6.9px] font-semibold text-gray-500 py-1.5">
                          DESCRIPTION
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction, index) => (
                        <TableRow key={index}>
                          <TableCell className="py-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-4.5 w-4.5">
                                <AvatarFallback className="text-[8px]">
                                  {transaction.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-[8px] font-medium text-gray-900">
                                {transaction.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                  transaction.type === "Credit"
                                    ? "bg-[#e7fff0]"
                                    : "bg-[#fff1f1]"
                                }`}
                              >
                                {transaction.type === "Credit" ? (
                                  <ArrowUpIcon className="h-2 w-2" />
                                ) : (
                                  <ArrowDownIcon className="h-2 w-2" />
                                )}
                              </div>
                              <span
                                className={`text-[8px] font-medium ${
                                  transaction.type === "Credit"
                                    ? "text-[#009b3a]"
                                    : "text-[#ff0f0f]"
                                }`}
                              >
                                {transaction.type}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-[8px] text-gray-500">
                            {transaction.bank}
                          </TableCell>
                          <TableCell className="text-[8px] text-gray-500">
                            {transaction.amount}
                          </TableCell>
                          <TableCell className="text-[8px] text-[#667084]">
                            {transaction.id}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-[8px] text-gray-900">
                                {transaction.date}
                              </span>
                              <span className="text-[6.9px] text-gray-500">
                                {transaction.time}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-[8px] text-[#1e1e1e]">
                            {transaction.description}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>

          {/* CTA section */}
          <div className="text-center py-12">
            <Button className="bg-[#4340ff] text-white border border-[#0e3ee7] rounded-xl px-6 py-4 flex items-center gap-2 h-[51px]">
              <span className="font-semibold text-sm">Get Started</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};