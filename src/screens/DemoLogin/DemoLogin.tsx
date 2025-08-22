import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { 
  UserIcon, 
  ShieldIcon, 
  CrownIcon, 
  HeadphonesIcon, 
  BuildingIcon,
  CodeIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from "lucide-react";

export const DemoLogin = (): JSX.Element => {
  const navigate = useNavigate();

  const demoAccounts = [
    
    {
      id: "super-admin",
      name: "Sarah SuperAdmin",
      email: "sarah.superadmin@surebanker.com",
      role: "Super Admin",
      description: "Full platform access with system configuration and feature flags",
      icon: <CrownIcon className="w-6 h-6" />,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      badgeColor: "bg-purple-500",
      route: "/super-admin",
      features: ["Platform Overview", "Feature Flags", "API Management", "System Health", "Security Center"]
    }
  ];

  const handleDemoLogin = (account: typeof demoAccounts[0]) => {
    // Store user data in localStorage
    localStorage.setItem('demoUser', JSON.stringify({
      id: account.id,
      name: account.name,
      email: account.email,
      role: account.role
    }));
    
    // Set account type and route based on user type
    let targetRoute = account.route;
    
    if (account.id === 'business') {
      localStorage.setItem('accountType', 'business');
      targetRoute = '/business-dashboard';
    } else if (account.id === 'customer') {
      localStorage.setItem('accountType', 'individual');
      targetRoute = '/dashboard';
    } else if (account.id === 'developer') {
      localStorage.setItem('accountType', 'developer');
      targetRoute = '/developer-dashboard';
    } else {
      // For admin, super-admin, support - use their specific routes
      localStorage.setItem('accountType', 'individual');
      // Keep their original routes: /admin, /super-admin, /support
    }
    
    // Small delay to ensure localStorage is written before navigation
    setTimeout(() => {
      navigate(targetRoute);
    }, 50);
  };

  handleDemoLogin(demoAccounts[0]);
  return (
    <div className="min-h-screen bg-gradient-to-br opacity-0 from-[#f8f9ff] to-[#e8e6ff] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-12 h-12 bg-[#5B52FF] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#201f4f]">SureBanker</h1>
              <p className="text-sm text-[#667085]">Demo Environment</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-[#201f4f] mb-4 font-raleway">
            Choose Your Demo Account
          </h2>
          <p className="text-lg text-[#667085] max-w-2xl mx-auto">
            Experience SureBanker from different user perspectives. Click on any account below to automatically log in and explore the platform.
          </p>
        </div>

        {/* Demo Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {demoAccounts.map((account) => (
            <Card 
              key={account.id} 
              className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-[#5B52FF] group"
              onClick={() => handleDemoLogin(account)}
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-16 h-16 ${account.bgColor} rounded-xl flex items-center justify-center ${account.iconColor}`}>
                    {account.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-[#201f4f]">{account.name}</h3>
                      <Badge className={`${account.badgeColor} text-white text-xs px-3 py-1`}>
                        {account.role}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#667085] mb-1">{account.email}</p>
                    <p className="text-sm text-[#667085]">{account.description}</p>
                  </div>
                </div>

                {/* Features List */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-[#201f4f] mb-3">Available Features:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {account.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircleIcon className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-[#667085]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Login Button */}
                <Button 
                  className="w-full bg-[#5B52FF] text-white hover:bg-[#4338CA] transition-colors flex items-center justify-center gap-2 group-hover:bg-[#4338CA]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDemoLogin(account);
                  }}
                >
                  Login as {account.role}
                  <ArrowRightIcon className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Demo Info */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Demo Environment Information</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• All data is simulated and for demonstration purposes only</li>
                  <li>• No real transactions or financial operations are performed</li>
                  <li>• You can switch between different user roles at any time</li>
                  <li>• All features are fully functional in this demo environment</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};