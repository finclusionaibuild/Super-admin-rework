export interface LoginRequest {
  username: string;
  password: string;
  countryCode: string;
  isPhone: boolean;
}

export interface User {
  id: number;
  slug: string;
  phone: string;
  email: string;
  firstName: string;
  middleName: string;
  userReferral: string;
  lastName: string;
  companyName: string;
  shortId: string;
  finclusionId: string;
  userType: string;
  apps: Array<{
    code: string;
    appType: string;
  }>;
  deviceId: string;
  country: string;
  appCode: {
    id: number;
    updatedAt: string;
    createdAt: string;
    deletedAt: null;
    code: null;
    name: null;
  };
  dob: null;
}

export interface SsoUser {
  user: User;
  token: string;
  refresh_token: string;
}

export interface LoginResponse {
  statusCode: number;
  message: string;
  data: {
    ssoUser: SsoUser;
    role: string;
    token: string;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  role: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthActions {
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export type AuthStore = AuthState & AuthActions;
