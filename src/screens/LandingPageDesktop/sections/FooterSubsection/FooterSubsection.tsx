import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "lucide-react";

export const FooterSubsection = (): JSX.Element => {
  const socialIcons = [
    { icon: <FacebookIcon className="w-4 lg:w-5 h-4 lg:h-5" />, label: "Facebook" },
    { icon: <InstagramIcon className="w-4 lg:w-5 h-4 lg:h-5" />, label: "Instagram" },
    { icon: <TwitterIcon className="w-4 lg:w-5 h-4 lg:h-5" />, label: "Twitter" },
    { icon: <LinkedinIcon className="w-4 lg:w-5 h-4 lg:h-5" />, label: "LinkedIn" },
  ];

  return (
    <footer className="w-full bg-[#1c274c] py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="bg-[#ffffff14] border-none rounded-2xl lg:rounded-3xl">
          <CardContent className="p-8 lg:p-16 text-center">
            <div className="mb-8 lg:mb-12">
              <div className="flex justify-center mb-4 lg:mb-6">
                <img 
                  src="/Logo Alternate Transparent.png" 
                  alt="SureBanker" 
                  className="h-6 lg:h-8 w-auto object-contain"
                />
              </div>
              <p className="text-[#ffffffc7] text-base lg:text-lg max-w-md mx-auto mb-6 lg:mb-8 leading-relaxed">
                Join Sure Banker today—where every transaction brings you closer
                to your goals.
              </p>
              <p className="text-[#ffffffc7] font-bold text-sm lg:text-base">
                Terms & Conditions
              </p>
            </div>

            <div className="flex justify-center gap-3 lg:gap-4">
              {socialIcons.map((social, index) => (
                <div
                  key={social.label}
                  className="flex items-center justify-center w-10 lg:w-12 h-10 lg:h-12 bg-[#ffffff1a] rounded-full hover:bg-[#ffffff2a] transition-colors cursor-pointer"
                  aria-label={social.label}
                >
                  <div className="text-white">
                    {social.icon}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </footer>
  );
};