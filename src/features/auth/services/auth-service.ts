import { authApi } from "../api/auth-api";
import { LoginCredentials, RegisterCredentials } from "../types";

export const authService = {
  login: async (credentials: LoginCredentials) => {
    return await authApi.login(credentials);
  },

  register: async (credentials: RegisterCredentials) => {
    return await authApi.register(credentials);
  },

  logout: async () => {
    return await authApi.logout();
  },

  getCurrentUser: async () => {
    return await authApi.getUser();
  },

  signInWithGoogle: async () => {
    return await authApi.signInWithGoogle();
  },

  getProfile: async (userId: string) => {
    return await authApi.getProfile(userId);
  },

  updateProfile: async (userId: string, updates: any) => {
    return await authApi.updateProfile(userId, updates);
  },

  checkOnboardingStatus: async (userId: string) => {
    return await authApi.checkOnboardingStatus(userId);
  },
};
