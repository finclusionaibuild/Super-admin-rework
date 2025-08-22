import React, { useState } from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { 
  XIcon, 
  CheckIcon, 
  ShieldIcon, 
  AlertTriangleIcon, 
  ArrowRightIcon,
  BuildingIcon,
  FileTextIcon,
  UserIcon,
  CreditCardIcon
} from 'lucide-react';

interface KYBVerificationProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: number;
  onUpgrade: (tier: number) => void;
}

export const KYBVerification: React.FC<KYBVerificationProps> = ({
  isOpen,
  onClose,
  currentTier,
  onUpgrade
}) => {
  const [selectedTier, setSelectedTier] = useState(currentTier < 2 ? 2 : 3);
  
  const tiers = [
    {
      tier: 1,
      name: "Basic",
      description: "Limited access to business features",
      limit: "₦500,000",
      features: [
        "Basic dashboard access",
        "View account information",
        "Limited wallet operations"
      ],
      requirements: [
        "Business email verification",
        "Phone number verification"
      ]
    },
    {
      tier: 2,
      name: "Standard",
      description: "Essential business banking features",
      limit: "₦5,000,000",
      features: [
        "All Tier 1 features",
        "Bulk transfers (limited)",
        "Basic reporting",
        "Multiple user access"
      ],
      requirements: [
        "Business registration documents",
        "Director's ID verification",
        "Proof of business address"
      ]
    },
    {
      tier: 3,
      name: "Premium",
      description: "Full access to all business features",
      limit: "₦50,000,000",
      features: [
        "All Tier 2 features",
        "Payroll management",
        "POS integration",
        "Business loans",
        "Advanced reporting"
      ],
      requirements: [
        "Bank statements (3 months)",
        "Tax clearance certificate",
        "Financial statements",
        "Additional director verification"
      ]
    }
  ];

  const handleUpgrade = () => {
    onUpgrade(selectedTier);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#5B52FF] rounded-lg flex items-center justify-center">
                <BuildingIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#1E293B]">Business Verification Levels</h2>
                <p className="text-sm text-[#64748B]">Upgrade your KYB tier to unlock more features</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={onClose}
            >
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Current Status */}
          <div className="mb-6">
            <Card className={`${
              currentTier === 1 ? 'bg-blue-50 border-blue-200' :
              currentTier === 2 ? 'bg-green-50 border-green-200' :
              'bg-purple-50 border-purple-200'
            }`}>
              <CardContent className="p-4 flex items-start gap-3">
                <ShieldIcon className={`w-6 h-6 ${
                  currentTier === 1 ? 'text-blue-600' :
                  currentTier === 2 ? 'text-green-600' :
                  'text-purple-600'
                }`} />
                <div>
                  <p className="font-semibold text-[#1E293B]">
                    Current Level: Tier {currentTier} ({tiers[currentTier - 1].name})
                  </p>
                  <p className="text-sm text-[#64748B]">
                    Daily Transaction Limit: {tiers[currentTier - 1].limit}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Tier Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {tiers.slice(1).map((tier) => (
              <Card 
                key={tier.tier}
                className={`cursor-pointer transition-all ${
                  selectedTier === tier.tier ? 'ring-2 ring-[#5B52FF] bg-[#F8F9FF]' : 'hover:shadow-md'
                } ${currentTier >= tier.tier ? 'opacity-50 pointer-events-none' : ''}`}
                onClick={() => currentTier < tier.tier && setSelectedTier(tier.tier)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        tier.tier === 2 ? 'bg-green-100' : 'bg-purple-100'
                      }`}>
                        <span className={`text-lg font-bold ${
                          tier.tier === 2 ? 'text-green-600' : 'text-purple-600'
                        }`}>{tier.tier}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1E293B]">Tier {tier.tier}: {tier.name}</h3>
                        <p className="text-sm text-[#64748B]">{tier.description}</p>
                      </div>
                    </div>
                    {currentTier >= tier.tier ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckIcon className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    ) : (
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        selectedTier === tier.tier 
                          ? 'border-[#5B52FF] bg-[#5B52FF]' 
                          : 'border-gray-300'
                      }`}>
                        {selectedTier === tier.tier && (
                          <CheckIcon className="w-3 h-3 text-white m-0.5" />
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#64748B]">Transaction Limit</span>
                      <span className="font-semibold text-[#1E293B]">{tier.limit}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-[#1E293B] mb-2">Features:</p>
                    <ul className="text-sm text-[#64748B] space-y-1">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-[#1E293B] mb-2">Requirements:</p>
                    <ul className="text-sm text-[#64748B] space-y-1">
                      {tier.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <FileTextIcon className="w-4 h-4 text-[#5B52FF] mt-0.5 flex-shrink-0" />
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Warning */}
          {currentTier < 3 && (
            <Card className="bg-yellow-50 border-yellow-200 mb-6">
              <CardContent className="p-4 flex items-start gap-3">
                <AlertTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">Important Notice</p>
                  <p className="text-xs text-yellow-700">
                    Upgrading to a higher tier requires additional verification. This process may take 1-3 business days to complete after document submission.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
            {currentTier < 3 && (
              <Button 
                className="bg-[#5B52FF] text-white"
                onClick={handleUpgrade}
                disabled={selectedTier <= currentTier}
              >
                {selectedTier === 2 ? 'Upgrade to Tier 2' : 'Upgrade to Tier 3'}
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};