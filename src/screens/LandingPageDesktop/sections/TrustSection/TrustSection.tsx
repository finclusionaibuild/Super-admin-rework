import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { ShieldCheckIcon, HeadphonesIcon, TrendingUpIcon } from "lucide-react";

export const TrustSection = (): JSX.Element => {
  const trustFeatures = [
    {
      icon: <ShieldCheckIcon className="w-8 lg:w-12 h-8 lg:h-12 text-[#4340ff]" />,
      title: "100% Secure",
      description: "Bank-grade security with advanced encryption to protect your data",
    },
    {
      icon: <HeadphonesIcon className="w-8 lg:w-12 h-8 lg:h-12 text-[#4340ff]" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support to assist you whenever you need help",
    },
    {
      icon: <TrendingUpIcon className="w-8 lg:w-12 h-8 lg:h-12 text-[#4340ff]" />,
      title: "Fast & Reliable",
      description: "Lightning-fast transactions with 99.9% uptime guarantee",
    },
  ];

  return (
    <section className="w-full bg-white py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-semibold text-[#201f4f] mb-4 font-raleway">
            Join Millions Who Trust SureBanker
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {trustFeatures.map((feature, index) => (
            <Card key={index} className="border-none bg-[#f8f9ff] rounded-2xl text-center">
              <CardContent className="p-6 lg:p-8">
                <div className="flex justify-center mb-4 lg:mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-[#201f4f] mb-3 lg:mb-4 font-raleway">
                  {feature.title}
                </h3>
                <p className="text-[#667085] leading-relaxed text-sm lg:text-base">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row justify-center gap-6 lg:gap-8 mt-12 lg:mt-16">
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <div className="w-10 lg:w-12 h-10 lg:h-12 bg-[#4340ff] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm lg:text-base">G</span>
            </div>
            <span className="text-[#667085] font-medium">Google Play</span>
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <div className="w-10 lg:w-12 h-10 lg:h-12 bg-[#4340ff] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm lg:text-base">A</span>
            </div>
            <span className="text-[#667085] font-medium">App Store</span>
          </div>
        </div>
      </div>
    </section>
  );
};