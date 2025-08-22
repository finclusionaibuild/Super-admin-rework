import React from "react";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { XIcon, ArrowRightIcon, BuildingIcon, TrendingUpIcon, CreditCardIcon, UsersIcon } from "lucide-react";

interface BusinessPromotionProps {
  isVisible: boolean;
  onClose: () => void;
  onGetStarted: () => void;
}

export const BusinessPromotion: React.FC<BusinessPromotionProps> = ({
  isVisible,
  onClose,
  onGetStarted
}) => {
  if (!isVisible) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Card className="bg-gradient-to-r from-[#F8F9FF] to-[#E8E6FF] border-none overflow-hidden relative card-no-shadow">
      <CardContent className="p-6 relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/20 text-[#1E293B]"
        >
          <XIcon className="w-4 h-4" />
        </Button>

        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="w-full lg:w-1/2">
            <h3 className="text-xl font-bold text-[#1E293B] mb-3">Upgrade to Business Account</h3>
            <p className="text-[#64748B] mb-4">
              Take your business to the next level with dedicated business banking features, higher transaction limits, and specialized support.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#5B52FF]/10 rounded-full flex items-center justify-center">
                  <BuildingIcon className="w-4 h-4 text-[#5B52FF]" />
                </div>
                <span className="text-sm text-[#1E293B]">Business Profile</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#5B52FF]/10 rounded-full flex items-center justify-center">
                  <TrendingUpIcon className="w-4 h-4 text-[#5B52FF]" />
                </div>
                <span className="text-sm text-[#1E293B]">Higher Limits</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#5B52FF]/10 rounded-full flex items-center justify-center">
                  <CreditCardIcon className="w-4 h-4 text-[#5B52FF]" />
                </div>
                <span className="text-sm text-[#1E293B]">Business Cards</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#5B52FF]/10 rounded-full flex items-center justify-center">
                  <UsersIcon className="w-4 h-4 text-[#5B52FF]" />
                </div>
                <span className="text-sm text-[#1E293B]">Team Access</span>
              </div>
            </div>
            
            <Button 
              onClick={onGetStarted}
              className="bg-[#5B52FF] text-white btn-primary"
            >
              Get Started
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center">
            <img 
              src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Business Team" 
              className="rounded-lg max-h-48 object-cover"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};