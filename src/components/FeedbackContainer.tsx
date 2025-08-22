import React from 'react';
import { useFeedbackStore } from '../stores/feedbackStore';
import { FeedbackPopup } from './ui/feedback-popup';
import { FeedbackPosition } from '../types/feedback';

export const FeedbackContainer: React.FC = () => {
  const { items, removeFeedback } = useFeedbackStore();

  // Group items by position
  const groupedItems = items.reduce((acc, item) => {
    const position = item.position || 'top-right';
    if (!acc[position]) {
      acc[position] = [];
    }
    acc[position].push(item);
    return acc;
  }, {} as Record<FeedbackPosition, typeof items>);

  const getPositionStyles = (position: FeedbackPosition) => {
    const baseStyles = 'fixed z-50 flex flex-col gap-3 pointer-events-none';
    
    switch (position) {
      case 'top-left':
        return `${baseStyles} top-4 left-4`;
      case 'top-center':
        return `${baseStyles} top-4 left-1/2 transform -translate-x-1/2`;
      case 'top-right':
        return `${baseStyles} top-4 right-4`;
      case 'bottom-left':
        return `${baseStyles} bottom-4 left-4`;
      case 'bottom-center':
        return `${baseStyles} bottom-4 left-1/2 transform -translate-x-1/2`;
      case 'bottom-right':
        return `${baseStyles} bottom-4 right-4`;
      default:
        return `${baseStyles} top-4 right-4`;
    }
  };

  return (
    <>
      {Object.entries(groupedItems).map(([position, positionItems]) => (
        <div
          key={position}
          className={getPositionStyles(position as FeedbackPosition)}
        >
          {positionItems.map((item) => (
            <div key={item.id} className="pointer-events-auto">
              <FeedbackPopup
                item={item}
                onRemove={removeFeedback}
              />
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
