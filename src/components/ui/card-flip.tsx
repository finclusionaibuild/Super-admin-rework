import React, { useState } from "react";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import { ArrowRightIcon, CopyIcon } from "lucide-react";

interface CardFlipProps {
  card: {
    type: string;
    title: string;
    amount: string;
    bgColor: string;
    textColor: string;
    details: string;
    hasDecorations?: boolean;
  };
  accountDetails: {
    accountNumber: string;
    accountName: string;
    bankName: string;
    bvn: string;
    accountType: string;
    dateOpened: string;
    branch: string;
    kycLevel: string;
    monthlyLimit: string;
    dailyLimit: string;
    lastTransaction: string;
    totalTransactions: string;
  };
  onViewFullDetails: () => void;
}

export const CardFlip: React.FC<CardFlipProps> = ({ 
  card, 
  accountDetails,
  onViewFullDetails
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const copyToClipboard = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="perspective-1000 relative h-full">
      <div 
        className={`relative w-full h-full transition-all duration-500 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of Card */}
        <Card 
          className={`${card.bgColor} ${card.textColor} absolute w-full h-full backface-hidden cursor-pointer card-no-shadow`}
          onClick={handleFlip}
        >
          <CardContent className="p-6 h-full flex flex-col justify-between">
            {/* Decorative elements */}
            {card.hasDecorations && (
              <>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
                <div className="absolute top-1/2 right-4 w-8 h-8 bg-yellow-400/20 rounded-full"></div>
              </>
            )}
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{card.type}</h3>
                  <div className="text-sm opacity-80">{card.title}</div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-2xl font-bold">{card.amount}</div>
              </div>
            </div>
            
            <div className="relative z-10 text-center">
              <p className="text-sm font-medium opacity-90">{card.details}</p>
            </div>
          </CardContent>
        </Card>

        {/* Back of Card */}
        <Card 
          className={`${card.bgColor} ${card.textColor} absolute w-full h-full backface-hidden rotate-y-180 card-no-shadow`}
          onClick={handleFlip}
        >
          <CardContent className="p-6 h-full flex flex-col justify-between">
            <div className="relative z-10">
              <h3 className="font-semibold text-lg mb-4">Account Details</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="opacity-80">Account Number</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{accountDetails.accountNumber}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-1 hover:bg-white/10"
                      onClick={(e) => copyToClipboard(accountDetails.accountNumber, e)}
                    >
                      <CopyIcon className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">Account Name</span>
                  <span className="font-medium">{accountDetails.accountName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">Bank Name</span>
                  <span className="font-medium">{accountDetails.bankName}</span>
                </div>
              </div>
            </div>
            
            <div className="relative z-10 flex flex-col gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-white/30 text-white hover:bg-white/10"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewFullDetails();
                }}
              >
                View Full Details
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-white/30 text-white hover:bg-white/10"
                onClick={handleFlip}
              >
                Back to Balance
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};