import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { ArrowRightIcon, CheckIcon, CreditCardIcon, PiggyBankIcon, BuildingIcon, WalletIcon } from "lucide-react";

export const SmarterBankingSection = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      title: "SureSavings",
      subtitle: "Your Savings Solution",
    },
    {
      title: "SureBudget", 
      subtitle: "Track your Expenses",
    },
    {
      title: "Business Account",
      subtitle: "Business Banking for you",
    },
    {
      title: "Cards",
      subtitle: "Smart card for secure transactions",
    },
  ];

  const serviceContent = [
    {
      // SureSavings
      title: "Automate Savings, Earn More, and Worry Less",
      description: "Build your financial future with our intelligent savings platform that helps you save automatically and earn competitive interest rates.",
      features: [
        "Set Personal Savings Goals",
        "Automate Contributions", 
        "Earn Competitive Interest",
        "Track Progress in Real-time",
      ],
      buttonText: "Start Saving Today",
      icon: <PiggyBankIcon className="w-8 lg:w-12 h-8 lg:h-12 text-[#4340ff]" />,
      image: "https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      // SureBudget
      title: "Take Control of Your Spending Habits",
      description: "Monitor, analyze, and optimize your expenses with our comprehensive budgeting tools designed to help you achieve financial wellness.",
      features: [
        "Real-time Expense Tracking",
        "Smart Budget Categories",
        "Spending Insights & Analytics",
        "Bill Reminders & Alerts",
      ],
      buttonText: "Start Budgeting",
      icon: <WalletIcon className="w-8 lg:w-12 h-8 lg:h-12 text-[#4340ff]" />,
      image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      // Business Account
      title: "Streamline Your Business Operations",
      description: "Comprehensive business banking solutions designed to help you manage payments, payroll, and grow your business efficiently.",
      features: [
        "Business Payment Processing",
        "Payroll Management",
        "Multi-user Access Control",
        "Advanced Reporting Tools",
      ],
      buttonText: "Open Business Account",
      icon: <BuildingIcon className="w-8 lg:w-12 h-8 lg:h-12 text-[#4340ff]" />,
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      // Cards
      title: "Smart Cards for Modern Banking",
      description: "Secure, flexible payment cards with advanced features, real-time controls, and comprehensive fraud protection for all your transactions.",
      features: [
        "Instant Virtual Cards",
        "Real-time Transaction Controls",
        "Advanced Security Features",
        "Cashback & Rewards Program",
      ],
      buttonText: "Get Your Card",
      icon: <CreditCardIcon className="w-8 lg:w-12 h-8 lg:h-12 text-[#4340ff]" />,
      image: "https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  const currentContent = serviceContent[activeTab];

  return (
    <section className="w-full bg-[#f8f9ff] py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#201f4f] tracking-[-1px] lg:tracking-[-2px] mb-4 font-raleway">
            Smarter Banking for a Smarter You
          </h2>
        </div>

        {/* Service Navigation Tabs - Mobile Responsive */}
        <div className="flex justify-center mb-12 lg:mb-16 overflow-x-auto">
          <div className="flex bg-white rounded-xl lg:rounded-2xl p-1 lg:p-2 shadow-sm border border-gray-100 gap-1 lg:gap-2 min-w-max">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-3 lg:px-6 py-3 lg:py-4 rounded-lg lg:rounded-xl font-medium transition-all text-xs lg:text-sm min-w-[140px] lg:min-w-[200px] text-left ${
                  activeTab === index
                    ? "bg-[#4340ff] text-white shadow-sm"
                    : "text-[#667085] hover:text-[#4340ff] hover:bg-gray-50"
                }`}
              >
                <div className="font-semibold">{service.title}</div>
                <div className={`text-xs lg:text-sm ${activeTab === index ? "text-white/80" : "text-[#667085]"}`}>
                  {service.subtitle}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Content Section - Mobile Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-3 lg:gap-4 mb-4 lg:mb-6">
              {currentContent.icon}
              <h3 className="text-2xl lg:text-4xl font-semibold text-[#201f4f] leading-tight font-raleway">
                {currentContent.title}
              </h3>
            </div>
            
            <p className="text-[#667085] text-base lg:text-lg mb-6 lg:mb-8 leading-relaxed">
              {currentContent.description}
            </p>
            
            <div className="space-y-3 lg:space-y-4 mb-8 lg:mb-10">
              {currentContent.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 lg:w-6 h-5 lg:h-6 bg-[#4340ff] rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckIcon className="w-3 lg:w-4 h-3 lg:h-4 text-white" />
                  </div>
                  <span className="text-[#667085] text-sm lg:text-lg">{feature}</span>
                </div>
              ))}
            </div>

            <Button className="bg-[#4340ff] text-white px-6 lg:px-8 py-3 lg:py-4 text-sm lg:text-base font-semibold rounded-xl hover:bg-[#3632e6] transition-colors flex items-center gap-2 h-12 lg:h-[51px] w-full lg:w-auto" asChild>
              <Link to="/signup">
                {currentContent.buttonText}
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Right Content - Service Image */}
          <div className="flex justify-center order-1 lg:order-2">
            <div className="relative">
              <img 
                src={currentContent.image}
                alt={services[activeTab].title}
                className="w-full max-w-sm lg:w-96 lg:h-96 object-cover rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl"
              />
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#4340ff]/20 to-transparent rounded-2xl lg:rounded-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};