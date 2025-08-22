export type FeedbackType = 'success' | 'error' | 'warning' | 'info';

export type FeedbackPosition = 
  | 'top-left' 
  | 'top-center' 
  | 'top-right' 
  | 'bottom-left' 
  | 'bottom-center' 
  | 'bottom-right';

export interface FeedbackItem {
  id: string;
  type: FeedbackType;
  title?: string;
  message: string;
  duration?: number; // in milliseconds, 0 for persistent
  position?: FeedbackPosition;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
  timestamp: number;
}

export interface FeedbackState {
  items: FeedbackItem[];
  defaultDuration: number;
  defaultPosition: FeedbackPosition;
  maxItems: number;
}

export interface FeedbackActions {
  addFeedback: (feedback: Omit<FeedbackItem, 'id' | 'timestamp'>) => string;
  removeFeedback: (id: string) => void;
  clearAll: () => void;
  success: (message: string, options?: Partial<FeedbackItem>) => string;
  error: (message: string, options?: Partial<FeedbackItem>) => string;
  warning: (message: string, options?: Partial<FeedbackItem>) => string;
  info: (message: string, options?: Partial<FeedbackItem>) => string;
}

export type FeedbackStore = FeedbackState & FeedbackActions;
