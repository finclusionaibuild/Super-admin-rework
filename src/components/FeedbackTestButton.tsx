import React from 'react';
import { Button } from './ui/button';
import { useFeedback } from '../hooks/useFeedback';

export const FeedbackTestButton: React.FC = () => {
  const { 
    showSuccess, 
    showError, 
    showWarning, 
    showInfo, 
    showLoading, 
    showConfirmation,
    clear 
  } = useFeedback();

  const testFeedback = () => {
    // Clear existing feedback first
    clear();

    // Test different types with delays
    setTimeout(() => {
      showSuccess("Operation completed successfully!");
    }, 100);

    setTimeout(() => {
      showInfo("This is an informational message", {
        position: 'top-left',
      });
    }, 600);

    setTimeout(() => {
      showWarning("This is a warning message", {
        position: 'bottom-center',
      });
    }, 1100);

    setTimeout(() => {
      showError("This is an error message", {
        position: 'bottom-left',
        action: {
          label: 'Retry',
          onClick: () => console.log('Retry clicked!'),
        },
      });
    }, 1600);

    setTimeout(() => {
      showLoading("Processing your request...");
    }, 2100);

    setTimeout(() => {
      showConfirmation(
        "Are you sure you want to delete this item?",
        () => console.log('Confirmed!'),
        () => console.log('Cancelled!')
      );
    }, 2600);
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex gap-2">
        <Button onClick={testFeedback} className="bg-purple-600 hover:bg-purple-700">
          Test Feedback System
        </Button>
        <Button onClick={clear} variant="outline">
          Clear All
        </Button>
      </div>
    </div>
  );
};
