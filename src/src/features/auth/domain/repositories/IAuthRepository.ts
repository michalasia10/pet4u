import type { User } from '../entities/User';

export interface IAuthState {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
} 