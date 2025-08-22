import { useAuthStore } from '../stores/authStore';

export const useAuth = () => {
  const authStore = useAuthStore();

  return {
    ...authStore,
    // Helper to check if user has specific role
    hasRole: (role: string) => authStore.role === role || authStore.role === 'super_admin',
    
    // Helper to get user display name
    getUserDisplayName: () => {
      if (!authStore.user) return '';
      return `${authStore.user.firstName} ${authStore.user.lastName}`.trim() || authStore.user.email;
    },

    // Helper to get user initials
    getUserInitials: () => {
      if (!authStore.user) return '';
      const firstName = authStore.user.firstName || '';
      const lastName = authStore.user.lastName || '';
      if (firstName && lastName) {
        return `${firstName[0]}${lastName[0]}`.toUpperCase();
      }
      if (authStore.user.email) {
        return authStore.user.email.slice(0, 2).toUpperCase();
      }
      return 'U';
    }
  };
};
