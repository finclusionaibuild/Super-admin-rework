import React from 'react';
import { Card, CardContent } from '../../../../components/ui/card';
import { 
  BuildingIcon, 
  CheckCircleIcon, 
  WifiOffIcon, 
  XCircleIcon, 
  CreditCardIcon, 
  TrendingUpIcon,
  UserIcon
} from 'lucide-react';
import { PosTerminal } from '../../../../types/pos';

interface PosStatsCardsProps {
  posTerminals: PosTerminal[];
  pagination: {
    totalCount: number;
  };
}

export const PosStatsCards: React.FC<PosStatsCardsProps> = ({
  posTerminals,
  pagination
}) => {
  // Calculate statistics
  const connectedTerminals = posTerminals.filter(t => t.linkStatus === true).length;
  const disconnectedTerminals = posTerminals.filter(t => t.linkStatus === false).length;
  const assignedTerminals = posTerminals.filter(t => Boolean(t.businessId && t.businessId !== '')).length;
  const unassignedTerminals = posTerminals.filter(t => !t.businessId || t.businessId === '').length;

  const stats = [
    {
      title: "Total Terminals",
      value: pagination.totalCount.toLocaleString(),
      change: "+12 this month",
      icon: <BuildingIcon className="w-6 h-6 text-blue-600" />,
      bgColor: "bg-blue-100"
    },
    {
      title: "Connected",
      value: connectedTerminals.toLocaleString(),
      change: "+8 today",
      icon: <CheckCircleIcon className="w-6 h-6 text-green-600" />,
      bgColor: "bg-green-100"
    },
    {
      title: "Disconnected",
      value: disconnectedTerminals.toLocaleString(),
      change: "-2 today",
      icon: <WifiOffIcon className="w-6 h-6 text-red-600" />,
      bgColor: "bg-red-100"
    },
    {
      title: "Assigned",
      value: assignedTerminals.toLocaleString(),
      change: "+5 this week",
      icon: <UserIcon className="w-6 h-6 text-purple-600" />,
      bgColor: "bg-purple-100"
    },
    {
      title: "Unassigned",
      value: unassignedTerminals.toLocaleString(),
      change: "-3 this week",
      icon: <XCircleIcon className="w-6 h-6 text-orange-600" />,
      bgColor: "bg-orange-100"
    },
    {
      title: "Daily Transactions",
      value: "45,623",
      change: "+15.3% vs yesterday",
      icon: <CreditCardIcon className="w-6 h-6 text-indigo-600" />,
      bgColor: "bg-indigo-100"
    },
    {
      title: "Revenue",
      value: "₦2.4M",
      change: "+8.2% vs yesterday",
      icon: <TrendingUpIcon className="w-6 h-6 text-emerald-600" />,
      bgColor: "bg-emerald-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6 mb-8">
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
