import type { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { AuthContext } from '../../../../shared/context/AuthContext';
import { User } from '../../domain/entities/User';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();

  const user = auth.user instanceof User ? {
    id: auth.user.getId(),
    email: auth.user.getEmail(),
    firstName: auth.user.getFirstName(),
    lastName: auth.user.getLastName(),
  } : null;

  const value = { ...auth, user };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 