import React, { useState, useEffect } from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { XIcon, ArrowRightIcon } from 'lucide-react';

interface TourStep {
  target: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

interface BusinessTourGuideProps {
  steps: TourStep[];
  isActive: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export const businessDashboardTourSteps: TourStep[] = [
  {
    target: 'dashboard-header',
    title: 'Welcome to SureBanker Business',
    content: 'This is your business dashboard where you can manage all your business finances in one place.',
    position: 'bottom'
  },
  {
    target: 'wallet-section',
    title: 'Business Wallets',
    content: 'Manage your main wallet and create additional wallets for different departments or purposes.',
    position: 'bottom'
  },
  {
    target: 'quick-actions',
    title: 'Quick Actions',
    content: 'Access frequently used features like Payroll, Bulk Transfers, and more from here.',
    position: 'top'
  },
  {
    target: 'approvals-section',
    title: 'Pending Approvals',
    content: 'Review and approve transactions that require authorization.',
    position: 'left'
  }
];

export const BusinessTourGuide: React.FC<BusinessTourGuideProps> = ({
  steps,
  isActive,
  onComplete,
  onSkip
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [spotlightPosition, setSpotlightPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });

  useEffect(() => {
    if (isActive && steps.length > 0) {
      const targetElement = document.querySelector(`[data-tour="${steps[currentStep].target}"]`);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        setSpotlightPosition({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height
        });
        
        // Add highlight class to target element
        targetElement.classList.add('tour-highlight');
        
        // Scroll element into view if needed
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        return () => {
          targetElement.classList.remove('tour-highlight');
        };
      }
    }
  }, [currentStep, isActive, steps]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
      setCurrentStep(0);
    }
  };

  const handleSkip = () => {
    onSkip();
    setCurrentStep(0);
  };

  if (!isActive) return null;

  const currentTourStep = steps[currentStep];
  
  // Calculate tooltip position
  const getTooltipPosition = () => {
    const padding = 20;
    const tooltipWidth = 320;
    const tooltipHeight = 180;
    
    let top = 0;
    let left = 0;
    let arrowClass = '';
    
    switch (currentTourStep.position) {
      case 'top':
        top = spotlightPosition.top - tooltipHeight - padding;
        left = spotlightPosition.left + (spotlightPosition.width / 2) - (tooltipWidth / 2);
        arrowClass = 'tour-arrow-bottom';
        break;
      case 'bottom':
        top = spotlightPosition.top + spotlightPosition.height + padding;
        left = spotlightPosition.left + (spotlightPosition.width / 2) - (tooltipWidth / 2);
        arrowClass = 'tour-arrow-top';
        break;
      case 'left':
        top = spotlightPosition.top + (spotlightPosition.height / 2) - (tooltipHeight / 2);
        left = spotlightPosition.left - tooltipWidth - padding;
        arrowClass = 'tour-arrow-right';
        break;
      case 'right':
        top = spotlightPosition.top + (spotlightPosition.height / 2) - (tooltipHeight / 2);
        left = spotlightPosition.left + spotlightPosition.width + padding;
        arrowClass = 'tour-arrow-left';
        break;
    }
    
    // Ensure tooltip stays within viewport
    if (left < 20) left = 20;
    if (left + tooltipWidth > window.innerWidth - 20) left = window.innerWidth - tooltipWidth - 20;
    if (top < 20) top = 20;
    if (top + tooltipHeight > window.innerHeight - 20) top = window.innerHeight - tooltipHeight - 20;
    
    return { top, left, arrowClass };
  };
  
  const { top, left, arrowClass } = getTooltipPosition();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleSkip}></div>
      
      {/* Spotlight */}
      <div 
        className="tour-spotlight absolute"
        style={{
          top: `${spotlightPosition.top}px`,
          left: `${spotlightPosition.left}px`,
          width: `${spotlightPosition.width}px`,
          height: `${spotlightPosition.height}px`
        }}
      ></div>
      
      {/* Tooltip */}
      <Card 
        className={`absolute z-50 w-80 ${arrowClass}`}
        style={{ top: `${top}px`, left: `${left}px` }}
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-[#1E293B]">{currentTourStep.title}</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0" 
              onClick={handleSkip}
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-[#64748B] mb-4">{currentTourStep.content}</p>
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-1">
              {steps.map((_, index) => (
                <div 
                  key={index} 
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep ? 'bg-[#5B52FF]' : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSkip}
              >
                Skip
              </Button>
              <Button 
                size="sm" 
                className="bg-[#5B52FF] text-white"
                onClick={handleNext}
              >
                {currentStep < steps.length - 1 ? (
                  <>Next <ArrowRightIcon className="ml-1 h-4 w-4" /></>
                ) : (
                  'Finish'
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};