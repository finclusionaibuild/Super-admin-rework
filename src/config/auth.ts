// Centralized authentication configuration
export const AUTH_CONFIG = {
  // Base API URL
  baseUrl: 'https://admin-dev.dotnet.surebanker.ai/api/admin',
  
  // Current auth token - update this when it expires
  authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MjAiLCJmaW5jbHVzaW9uSWQiOiJTQ1NCTkcyMDEyMjQ2NDY4NjgiLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJuYmYiOjE3NTU3OTE2OTYsImV4cCI6MTc1NTc5ODg5NiwiaWF0IjoxNzU1NzkxNjk2fQ.4pueJWu6zFhNwU-Jn7J_TGfksRzkD9f69SifERBaCvI',
  
  // Common headers for API requests
  getHeaders: () => ({
    'accept': 'text/plain',
    'Authorization': `Bearer ${AUTH_CONFIG.authToken}`,
    'Content-Type': 'application/json'
  }),
  
  // Update token when it expires
  updateToken: (newToken: string) => {
    AUTH_CONFIG.authToken = newToken;
  }
};

// Helper function to handle 401 errors
export const handleAuthError = (error: any) => {
  if (error.message?.includes('401') || error.status === 401) {
    console.error('Authentication token expired. Please update the token in src/config/auth.ts');
    throw new Error('Authentication token expired. Please contact administrator.');
  }
  throw error;
};
