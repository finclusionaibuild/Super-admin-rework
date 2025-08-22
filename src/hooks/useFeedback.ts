import { useFeedbackStore } from '../stores/feedbackStore';
import { FeedbackItem } from '../types/feedback';

/**
 * Custom hook for easy feedback management
 * Provides convenient methods to show different types of feedback
 */
export const useFeedback = () => {
  const store = useFeedbackStore();

  return {
    // Direct access to store methods
    ...store,

    // Enhanced convenience methods with common use cases
    
    /**
     * Show a success message
     * @param message Success message to display
     * @param options Additional options
     */
    showSuccess: (message: string, options?: Partial<FeedbackItem>) => {
      return store.success(message, {
        title: 'Success',
        ...options,
      });
    },

    /**
     * Show an error message
     * @param message Error message to display
     * @param options Additional options
     */
    showError: (message: string, options?: Partial<FeedbackItem>) => {
      return store.error(message, {
        title: 'Error',
        ...options,
      });
    },

    /**
     * Show a warning message
     * @param message Warning message to display
     * @param options Additional options
     */
    showWarning: (message: string, options?: Partial<FeedbackItem>) => {
      return store.warning(message, {
        title: 'Warning',
        ...options,
      });
    },

    /**
     * Show an info message
     * @param message Info message to display
     * @param options Additional options
     */
    showInfo: (message: string, options?: Partial<FeedbackItem>) => {
      return store.info(message, {
        title: 'Information',
        ...options,
      });
    },

    /**
     * Show loading feedback with action to dismiss
     * @param message Loading message
     */
    showLoading: (message: string = 'Processing...') => {
      return store.info(message, {
        title: 'Loading',
        duration: 3000, // Persistent until manually closed
        action: {
          label: 'Cancel',
          onClick: () => {}, // Will be closed automatically when clicked
        },
      });
    },

    /**
     * Show confirmation feedback with action
     * @param message Confirmation message
     * @param onConfirm Callback when confirmed
     * @param onCancel Callback when cancelled (optional)
     */
    showConfirmation: (
      message: string, 
      onConfirm: () => void,
      onCancel?: () => void
    ) => {
      return store.warning(message, {
        title: 'Confirmation Required',
        duration: 3000, // Persistent until action taken
        action: {
          label: 'Confirm',
          onClick: onConfirm,
        },
        onClose: onCancel,
      });
    },

    /**
     * Show API response feedback - automatically detects success/error
     * @param response Response object with success flag and message
     * @param successTitle Custom success title
     * @param errorTitle Custom error title
     */
    showApiResponse: (
      response: { success: boolean; message: string; statusCode?: number },
      successTitle: string = 'Success',
      errorTitle: string = 'Error'
    ) => {
      if (response.success) {
        return store.success(response.message, { title: successTitle });
      } else {
        return store.error(response.message, { 
          title: `${errorTitle}${response.statusCode ? ` (${response.statusCode})` : ''}` 
        });
      }
    },

    /**
     * Utility to clear all feedback
     */
    clear: store.clearAll,
  };
};
