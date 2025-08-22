import React, { useState, useEffect } from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { XIcon, ArrowRightIcon, ArrowLeftIcon, PlayIcon } from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  action?: () => void;
}

interface IndividualTourGuideProps {
  steps: TourStep[];
  isActive: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export const IndividualTourGuide: React.FC<IndividualTourGuideProps> = ({
  steps,
  isActive,
  onComplete,
  onSkip
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (isActive && steps[currentStep]) {
      const element = document.querySelector(`[data-tour="${steps[currentStep].target}"]`) as HTMLElement;
      setTargetElement(element);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('tour-highlight');
      }
    }

    return () => {
      if (targetElement) {
        targetElement.classList.remove('tour-highlight');
      }
    };
  }, [currentStep, isActive, steps, targetElement]);

  const handleNext = () => {
    if (targetElement) {
      targetElement.classList.remove('tour-highlight');
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (targetElement) {
      targetElement.classList.remove('tour-highlight');
    }

    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (targetElement) {
      targetElement.classList.remove('tour-highlight');
    }
    onSkip();
  };

  if (!isActive || !steps[currentStep]) {
    return null;
  }

  const step = steps[currentStep];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" />
      
      {/* Tour Card */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card className="bg-white max-w-md w-full">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <PlayIcon className="w-5 h-5 text-[#5B52FF]" />
                <span className="text-sm font-medium text-[#64748B]">
                  {currentStep + 1} of {steps.length}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleSkip}>
                <XIcon className="w-4 h-4" />
              </Button>
            </div>

            <h3 className="text-lg font-semibold text-[#1E293B] mb-2">
              {step.title}
            </h3>
            
            <p className="text-[#64748B] mb-6">
              {step.description}
            </p>

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Previous
              </Button>

              <div className="flex gap-2">
                <Button variant="ghost" onClick={handleSkip}>
                  Skip Tour
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-[#5B52FF] text-white flex items-center gap-2"
                >
                  {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                  <ArrowRightIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

// Tour steps for individual dashboard
export const individualDashboardTourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to SureBanker!',
    description: 'Let\'s take a quick tour of your personal banking dashboard and show you how to get the most out of your account.',
    target: 'dashboard-header',
    position: 'bottom'
  },
  {
    id: 'account-cards',
    title: 'Your Account Overview',
    description: 'These cards show your different account balances. Click on any card to view detailed information and transaction history.',
    target: 'account-cards',
    position: 'bottom'
  },
  {
    id: 'quick-actions',
    title: 'Quick Actions',
    description: 'Use these shortcuts for common tasks like buying airtime, data, and paying bills. More actions are available in the Payments section.',
    target: 'quick-actions',
    position: 'top'
  },
  {
    id: 'tap-to-send',
    title: 'Tap to Send',
    description: 'Quickly send money to your frequent contacts. Click "Add" to add new contacts for faster transfers.',
    target: 'tap-to-send',
    position: 'top'
  },
  {
    id: 'cashflow-chart',
    title: 'Cashflow Insights',
    description: 'Track your income and expenses over time. This helps you understand your spending patterns and manage your budget better.',
    target: 'cashflow-chart',
    position: 'left'
  },
  {
    id: 'expense-statistics',
    title: 'Expense Breakdown',
    description: 'See how your money is being spent across different categories. This helps you identify areas where you can save more.',
    target: 'expense-statistics',
    position: 'left'
  },
  {
    id: 'kyc-banner',
    title: 'Complete Your KYC',
    description: 'Verify your identity to unlock higher transaction limits and access all features. Start with Tier 1 verification using your BVN.',
    target: 'kyc-banner',
    position: 'bottom'
  },
  {
    id: 'transaction-history',
    title: 'Transaction History',
    description: 'View all your transactions with detailed filters and search. You can also download statements and track specific payments.',
    target: 'transaction-history',
    position: 'top'
  }
];