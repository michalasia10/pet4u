import { createContext, useContext } from 'react';
import type { IUser } from '../types/user';

export interface IAuthContext {
  isAuthenticated: boolean;
  user: IUser | null;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  isLoggingIn: boolean;
  loginError: Error | null;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}; 