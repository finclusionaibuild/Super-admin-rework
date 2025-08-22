import React, { useEffect, useState } from 'react';
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { FeedbackItem, FeedbackPosition } from '../../types/feedback';
import { Button } from './button';

interface FeedbackPopupProps {
  item: FeedbackItem;
  onRemove: (id: string) => void;
}

export const FeedbackPopup: React.FC<FeedbackPopupProps> = ({ item, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Animation control
  useEffect(() => {
    // Trigger enter animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove(item.id);
      item.onClose?.();
    }, 300); // Match exit animation duration
  };

  const getIcon = () => {
    switch (item.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getColorClasses = () => {
    switch (item.type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getProgressBarColor = () => {
    switch (item.type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div
      className={`
        fixed z-50 flex items-center max-w-sm w-full transition-all duration-300 ease-in-out
        ${isVisible && !isExiting ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}
        ${isExiting ? 'scale-95 opacity-0' : ''}
      `}
      style={{
        ...(item.position?.includes('top') ? { top: '1rem' } : { bottom: '1rem' }),
        ...(item.position?.includes('left') ? { left: '1rem' } : {}),
        ...(item.position?.includes('right') ? { right: '1rem' } : {}),
        ...(item.position?.includes('center') ? { 
          left: '50%', 
          transform: `translateX(-50%) ${isVisible && !isExiting ? 'translateY(0)' : 'translateY(-10px)'}` 
        } : {}),
      }}
    >
      <div className={`
        relative flex items-start gap-3 p-4 rounded-lg border shadow-lg backdrop-blur-sm
        ${getColorClasses()}
        min-w-0 flex-1
      `}>
        {/* Progress bar for timed feedback */}
        {item.duration && item.duration > 0 && (
          <div className="absolute bottom-0 left-0 h-1 bg-black bg-opacity-10 w-full rounded-b-lg overflow-hidden">
            <div 
              className={`h-full ${getProgressBarColor()}`}
              style={{
                width: '100%',
                animation: `feedback-shrink ${item.duration}ms linear`,
              }}>
              </div>
          </div>
        )}

        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {item.title && (
            <h4 className="font-semibold text-sm mb-1 truncate">
              {item.title}
            </h4>
          )}
          <p className="text-sm leading-relaxed">
            {item.message}
          </p>
          
          {/* Action button */}
          {item.action && (
            <div className="mt-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  item.action?.onClick();
                  handleClose();
                }}
                className="text-xs h-7 px-3"
              >
                {item.action.label}
              </Button>
            </div>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 rounded-md hover:bg-black hover:bg-opacity-10 transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>


    </div>
  );
};
