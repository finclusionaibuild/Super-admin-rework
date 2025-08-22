import React, { useState, useEffect } from "react";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { XIcon, ArrowRightIcon, ArrowLeftIcon, PlayIcon } from "lucide-react";

interface TourStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  action?: () => void;
}

interface TourGuideProps {
  steps: TourStep[];
  isActive: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export const TourGuide: React.FC<TourGuideProps> = ({
  steps,
  isActive,
  onComplete,
  onSkip
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (isActive && steps[currentStep]) {
      const element = document.querySelector(steps[currentStep].target) as HTMLElement;
      setTargetElement(element);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Add highlight class
        element.classList.add('tour-highlight');
      }
    }

    return () => {
      // Remove highlight from all elements
      document.querySelectorAll('.tour-highlight').forEach(el => {
        el.classList.remove('tour-highlight');
      });
    };
  }, [currentStep, isActive, steps]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onSkip();
  };

  if (!isActive || !steps[currentStep] || !targetElement) {
    return null;
  }

  const step = steps[currentStep];
  const rect = targetElement.getBoundingClientRect();
  
  let tooltipStyle: React.CSSProperties = {};
  let arrowClass = '';

  switch (step.position) {
    case 'top':
      tooltipStyle = {
        top: rect.top - 10,
        left: rect.left + rect.width / 2,
        transform: 'translate(-50%, -100%)'
      };
      arrowClass = 'tour-arrow-bottom';
      break;
    case 'bottom':
      tooltipStyle = {
        top: rect.bottom + 10,
        left: rect.left + rect.width / 2,
        transform: 'translate(-50%, 0)'
      };
      arrowClass = 'tour-arrow-top';
      break;
    case 'left':
      tooltipStyle = {
        top: rect.top + rect.height / 2,
        left: rect.left - 10,
        transform: 'translate(-100%, -50%)'
      };
      arrowClass = 'tour-arrow-right';
      break;
    case 'right':
      tooltipStyle = {
        top: rect.top + rect.height / 2,
        left: rect.right + 10,
        transform: 'translate(0, -50%)'
      };
      arrowClass = 'tour-arrow-left';
      break;
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />
      
      {/* Spotlight */}
      <div 
        className="fixed z-50 pointer-events-none"
        style={{
          top: rect.top - 4,
          left: rect.left - 4,
          width: rect.width + 8,
          height: rect.height + 8,
          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
          borderRadius: '8px'
        }}
      />

      {/* Tooltip */}
      <div 
        className="fixed z-50 max-w-sm"
        style={tooltipStyle}
      >
        <Card className="bg-white shadow-xl border-2 border-[#5B52FF]">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <PlayIcon className="w-5 h-5 text-[#5B52FF]" />
                <h3 className="font-semibold text-[#1E293B]">{step.title}</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="p-1 h-auto"
              >
                <XIcon className="w-4 h-4" />
              </Button>
            </div>
            
            <p className="text-[#64748B] text-sm mb-6 leading-relaxed">
              {step.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#64748B]">
                  {currentStep + 1} of {steps.length}
                </span>
                <div className="flex gap-1">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentStep ? 'bg-[#5B52FF]' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevious}
                  >
                    <ArrowLeftIcon className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={handleNext}
                  className="bg-[#5B52FF] text-white hover:bg-[#4338CA]"
                >
                  {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                  {currentStep < steps.length - 1 && (
                    <ArrowRightIcon className="w-4 h-4 ml-1" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Arrow */}
        <div className={`absolute ${arrowClass}`} />
      </div>
    </>
  );
};

// Tour steps for different pages
export const dashboardTourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to SureBanker Business!',
    description: 'This is your business dashboard where you can manage all your financial operations. Let\'s take a quick tour of the key features.',
    target: '[data-tour="dashboard-header"]',
    position: 'bottom'
  },
  {
    id: 'wallet',
    title: 'Business Wallet',
    description: 'View your main wallet balance and manage multi-tier wallets for different departments like Staff and Operations.',
    target: '[data-tour="wallet-section"]',
    position: 'bottom'
  },
  {
    id: 'quick-actions',
    title: 'Quick Actions',
    description: 'Access frequently used features like transfers, bill payments, and payroll with just one click.',
    target: '[data-tour="quick-actions"]',
    position: 'top'
  },
  {
    id: 'navigation',
    title: 'Navigation Menu',
    description: 'Use the sidebar to navigate between different modules. Each section has detailed features for business management.',
    target: '[data-tour="navigation"]',
    position: 'right'
  }
];

export const paymentsTourSteps: TourStep[] = [
  {
    id: 'payments-overview',
    title: 'Payments Hub',
    description: 'Manage all your business payments from this central hub. Send money, pay bills, and handle bulk payments.',
    target: '[data-tour="payments-header"]',
    position: 'bottom'
  },
  {
    id: 'transfer-options',
    title: 'Transfer Options',
    description: 'Send money to bank accounts, other SureBanker users, or use QR codes for quick payments.',
    target: '[data-tour="transfer-options"]',
    position: 'bottom'
  },
  {
    id: 'bulk-payments',
    title: 'Bulk Payments',
    description: 'Upload CSV files to process multiple payments at once - perfect for payroll and vendor payments.',
    target: '[data-tour="bulk-payments"]',
    position: 'top'
  }
];

export const payrollTourSteps: TourStep[] = [
  {
    id: 'payroll-dashboard',
    title: 'Payroll Management',
    description: 'Streamline your salary disbursements and manage employee payments efficiently.',
    target: '[data-tour="payroll-header"]',
    position: 'bottom'
  },
  {
    id: 'salary-tool',
    title: 'Salary Disbursement',
    description: 'Set up automated salary payments and manage employee payment schedules.',
    target: '[data-tour="salary-tool"]',
    position: 'bottom'
  },
  {
    id: 'csv-upload',
    title: 'CSV Upload',
    description: 'Upload employee data and payment information in bulk using CSV files.',
    target: '[data-tour="csv-upload"]',
    position: 'top'
  }
];