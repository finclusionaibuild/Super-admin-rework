import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAccount } from "../../contexts/AccountContext";
import { useAccountNavigation } from "../../hooks/useAccountData";
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
  BuildingIcon,
  UserCheckIcon
} from "lucide-react";

interface NavigationMenuProps {
  className?: string;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isBusinessAccount } = useAccount();
  const { navigationItems } = useAccountNavigation();

  const getIcon = (iconName: string) => {
    const iconMap = {
      "home": <HomeIcon className="w-5 h-5" />,
      "credit-card": <CreditCardIcon className="w-5 h-5" />,
      "receipt": <ReceiptIcon className="w-5 h-5" />,
      "piggy-bank": <PiggyBankIcon className="w-5 h-5" />,
      "bar-chart": <BarChart3Icon className="w-5 h-5" />,
      "handshake": <HandshakeIcon className="w-5 h-5" />,
      "inbox": <InboxIcon className="w-5 h-5" />,
      "star": <StarIcon className="w-5 h-5" />,
      "users": <UsersIcon className="w-5 h-5" />,
      "building": <BuildingIcon className="w-5 h-5" />,
      "user-check": <UserCheckIcon className="w-5 h-5" />
    };
    return iconMap[iconName as keyof typeof iconMap] || <HomeIcon className="w-5 h-5" />;
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`flex-1 p-4 overflow-hidden ${className}`}>
      <div className="space-y-1">
        {navigationItems.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            className={`px-3 py-2 rounded-lg flex items-center gap-3 cursor-pointer transition-colors ${
              isActivePath(item.path)
                ? "bg-[#5B52FF] text-white"
                : "text-[#64748B] hover:bg-gray-50"
            }`}
          >
            {getIcon(item.icon)}
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
  );
};

// Refer & Earn Card Component
export const ReferEarnCard: React.FC = () => {
  return (
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
  );
};