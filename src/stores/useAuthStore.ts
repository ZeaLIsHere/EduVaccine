import { create } from 'zustand';
import { User } from '../types';
import * as authService from '../services/authService';

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAdmin: false,
  isLoading: false,
  isAuthenticated: false,
  error: null,

  signIn: async (email: string, password: string): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      const user = await authService.signIn(email, password);
      set({
        user,
        isAdmin: user.role === 'admin',
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Login gagal.',
        isLoading: false,
      });
    }
  },

  signUp: async (email: string, password: string, displayName: string): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      const user = await authService.signUp(email, password, displayName);
      set({
        user,
        isAdmin: false,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Pendaftaran gagal.',
        isLoading: false,
      });
    }
  },

  signOut: async (): Promise<void> => {
    set({ isLoading: true });
    try {
      await authService.signOut();
      set({
        user: null,
        isAdmin: false,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Logout gagal.',
        isLoading: false,
      });
    }
  },

  setUser: (user: User | null): void => {
    set({
      user,
      isAdmin: user?.role === 'admin',
      isAuthenticated: !!user,
    });
  },

  clearError: (): void => {
    set({ error: null });
  },
}));
