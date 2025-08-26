import React from 'react';
import { Card, CardContent } from '../../../../components/ui/card';
import {
  CreditCardIcon,
  CheckCircleIcon,
  TrendingUpIcon,
  AlertTriangleIcon,
  ActivityIcon,
  DollarSignIcon,
  ClockIcon,
  XCircleIcon
} from 'lucide-react';

interface TransactionStatsCardsProps {
  totalTransactions?: string;
  successRate?: string;
  totalVolume?: string;
  disputedCount?: string;
}

export const TransactionStatsCards: React.FC<TransactionStatsCardsProps> = ({
  totalTransactions = "45.6M",
  successRate = "98.2%",
  totalVolume = "₦125B",
  disputedCount = "1,234"
}) => {
  const stats = [
    {
      title: "Total Transactions",
      value: totalTransactions,
      change: "+12.5% this month",
      icon: <CreditCardIcon className="w-6 h-6 text-blue-600" />,
      bgColor: "bg-blue-100"
    },
    {
      title: "Success Rate",
      value: successRate,
      change: "+0.3% vs last month",
      icon: <CheckCircleIcon className="w-6 h-6 text-green-600" />,
      bgColor: "bg-green-100"
    },
    {
      title: "Total Volume",
      value: totalVolume,
      change: "+18.2% this month",
      icon: <DollarSignIcon className="w-6 h-6 text-emerald-600" />,
      bgColor: "bg-emerald-100"
    },
    {
      title: "Disputed",
      value: disputedCount,
      change: "-8.1% this month",
      icon: <AlertTriangleIcon className="w-6 h-6 text-orange-600" />,
      bgColor: "bg-orange-100"
    },
    {
      title: "Today Transactions",
      value: "45,623",
      change: "+15.3% vs yesterday",
      icon: <ActivityIcon className="w-6 h-6 text-purple-600" />,
      bgColor: "bg-purple-100"
    },
    {
      title: "Pending",
      value: "2,341",
      change: "-5.2% today",
      icon: <ClockIcon className="w-6 h-6 text-yellow-600" />,
      bgColor: "bg-yellow-100"
    },
    {
      title: "Failed",
      value: "1,234",
      change: "-12.1% this week",
      icon: <XCircleIcon className="w-6 h-6 text-red-600" />,
      bgColor: "bg-red-100"
    },
    {
      title: "Revenue",
      value: "₦2.4M",
      change: "+8.2% vs yesterday",
      icon: <TrendingUpIcon className="w-6 h-6 text-indigo-600" />,
      bgColor: "bg-indigo-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-[#64748B]">{stat.title}</p>
                <p className="text-2xl font-bold text-[#1E293B]">{stat.value}</p>
                <p className="text-sm text-green-600">{stat.change}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
