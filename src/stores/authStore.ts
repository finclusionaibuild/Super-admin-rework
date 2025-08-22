import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthStore, LoginRequest } from '../types/auth';
import { serverActions } from '../hooks/serverActions';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      refreshToken: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials: LoginRequest) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await serverActions.adminLogin(credentials);
          
          const { user, token, refresh_token } = response.data.ssoUser;
          const { role } = response.data;
          
          set({
            user,
            token,
            refreshToken: refresh_token,
            role,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          // Optionally store in localStorage as backup
          localStorage.setItem('admin-auth', JSON.stringify({
            user,
            token,
            refreshToken: refresh_token,
            role,
            timestamp: Date.now(),
          }));

        } catch (error: any) {
          const errorMessage = error.message || 'Login failed. Please try again.';
          
          set({
            user: null,
            token: null,
            refreshToken: null,
            role: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage,
          });

          // Remove any stored auth data on error
          localStorage.removeItem('admin-auth');
          
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          role: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });

        // Clear localStorage
        localStorage.removeItem('admin-auth');
        
        // Call server logout if needed
        const { token } = get();
        if (token) {
          serverActions.adminLogout(token).catch(console.error);
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'admin-auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
