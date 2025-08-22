interface CSSProperties {
  [key: string]: any;
}

interface HTMLAttributes {
  style?: CSSProperties;
}

// Add CSS properties for 3D transforms
declare namespace React {
  interface CSSProperties {
    transformStyle?: 'preserve-3d' | 'flat';
    backfaceVisibility?: 'visible' | 'hidden';
    perspective?: string | number;
  }
}

// Add CSS classes for 3D transforms
declare global {
  interface Window {
    confetti: any;
  }
}

export {};