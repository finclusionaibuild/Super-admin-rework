import React from 'react';
import { Card, CardContent } from '../../../../components/ui/card';
import {
  UserIcon,
  BuildingIcon,
  ShieldIcon,
  HeadphonesIcon,
  CodeIcon,
  CrownIcon,
  TrendingUpIcon,
  UsersIcon,
  CheckCircleIcon,
  ClockIcon
} from 'lucide-react';

interface CustomerStatsCardsProps {
  totalCustomers?: number;
  individualCount?: number;
  businessCount?: number;
  adminCount?: number;
  supportCount?: number;
  developerCount?: number;
  superAdminCount?: number;
  activeCount?: number;
  dormantCount?: number;
  suspendedCount?: number;
}

export const CustomerStatsCards: React.FC<CustomerStatsCardsProps> = ({
  totalCustomers = 0,
  individualCount = 0,
  businessCount = 0,
  adminCount = 0,
  supportCount = 0,
  developerCount = 0,
  superAdminCount = 0,
  activeCount = 0,
  dormantCount = 0,
  suspendedCount = 0
}) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const stats = [
    {
      title: "Total Customers",
      value: formatNumber(totalCustomers),
      change: "+12.5% this month",
      icon: <UsersIcon className="w-6 h-6 text-blue-600" />,
      bgColor: "bg-blue-100"
    },
    {
      title: "Individual",
      value: formatNumber(individualCount),
      change: "+8.2% this month",
      icon: <UserIcon className="w-6 h-6 text-blue-600" />,
      bgColor: "bg-blue-100"
    },
    {
      title: "Business",
      value: formatNumber(businessCount),
      change: "+15.3% this month",
      icon: <BuildingIcon className="w-6 h-6 text-green-600" />,
      bgColor: "bg-green-100"
    },
    {
      title: "Active Users",
      value: formatNumber(activeCount),
      change: "+5.1% this month",
      icon: <CheckCircleIcon className="w-6 h-6 text-green-600" />,
      bgColor: "bg-green-100"
    },
    {
      title: "Dormant",
      value: formatNumber(dormantCount),
      change: "-2.3% this month",
      icon: <ClockIcon className="w-6 h-6 text-yellow-600" />,
      bgColor: "bg-yellow-100"
    },
    {
      title: "Suspended",
      value: formatNumber(suspendedCount),
      change: "-8.1% this month",
      icon: <ShieldIcon className="w-6 h-6 text-red-600" />,
      bgColor: "bg-red-100"
    },
    {
      title: "Admin",
      value: formatNumber(adminCount),
      change: "+2.1% this month",
      icon: <ShieldIcon className="w-6 h-6 text-purple-600" />,
      bgColor: "bg-purple-100"
    },
    {
      title: "SuperAdmin",
      value: formatNumber(superAdminCount),
      change: "No change",
      icon: <CrownIcon className="w-6 h-6 text-pink-600" />,
      bgColor: "bg-pink-100"
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
