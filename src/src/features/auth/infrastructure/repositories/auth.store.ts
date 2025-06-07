import { create } from 'zustand';
import type { IAuthState } from '../../domain/repositories/IAuthRepository';
import type { User } from '../../domain/entities/User';

export const useAuthStore = create<IAuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => set({ user, isAuthenticated: true }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
})); 