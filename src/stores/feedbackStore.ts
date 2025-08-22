import { create } from 'zustand';
import { FeedbackStore, FeedbackItem } from '../types/feedback';

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useFeedbackStore = create<FeedbackStore>((set, get) => ({
  // Initial state
  items: [],
  defaultDuration: 5000, // 5 seconds
  defaultPosition: 'top-right',
  maxItems: 5,

  // Actions
  addFeedback: (feedback) => {
    const id = generateId();
    const timestamp = Date.now();
    
    const newItem: FeedbackItem = {
      id,
      timestamp,
      duration: get().defaultDuration,
      position: get().defaultPosition,
      ...feedback,
    };

    set((state) => {
      let newItems = [...state.items, newItem];
      
      // Limit the number of items
      if (newItems.length > state.maxItems) {
        newItems = newItems.slice(-state.maxItems);
      }
      
      return { items: newItems };
    });

    // Auto-remove after duration (if not persistent)
    if (newItem.duration && newItem.duration > 0) {
      setTimeout(() => {
        get().removeFeedback(id);
      }, newItem.duration);
    }

    return id;
  },

  removeFeedback: (id) => {
    set((state) => ({
      items: state.items.filter(item => item.id !== id)
    }));
  },

  clearAll: () => {
    set({ items: [] });
  },

  // Convenience methods
  success: (message, options = {}) => {
    return get().addFeedback({
      type: 'success',
      message,
      ...options,
    });
  },

  error: (message, options = {}) => {
    return get().addFeedback({
      type: 'error',
      message,
      duration: 4000, // Errors persist until manually closed
      ...options,
    });
  },

  warning: (message, options = {}) => {
    return get().addFeedback({
      type: 'warning',
      message,
      duration: 7000, // Warnings stay a bit longer
      ...options,
    });
  },

  info: (message, options = {}) => {
    return get().addFeedback({
      type: 'info',
      message,
      ...options,
    });
  },
}));
