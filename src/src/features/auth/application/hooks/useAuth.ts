import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAuthStore } from '../../infrastructure/repositories/auth.store';
import { AuthService } from '../services/AuthService';
import { authKeys } from '../auth.keys';
import type { IAuthCredentialsProps } from '../../domain/entities/AuthCredentials';
import { AuthRepositoryImpl } from '../../infrastructure/repositories/authRepository';
import navigationService from '../../../../infra/navigation/navigationService';


const authRepository = new AuthRepositoryImpl();


export const useAuth = () => {
  const queryClient = useQueryClient();
  
  const { isAuthenticated, user, setUser, clearUser } = useAuthStore();

  const { data: sessionUser } = useQuery({
    queryKey: authKeys.session(),
    queryFn: AuthService.getMe,
    enabled: !!authRepository.getStoredToken(),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (sessionUser) {
      setUser(sessionUser);
    }
  }, [sessionUser, setUser]);

  const loginMutation = useMutation({
    mutationFn: (credentials: IAuthCredentialsProps) => AuthService.login(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.session() })
      navigationService.navigateTo('/', { replace: true });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => Promise.resolve(AuthService.logout()),
    onSuccess: () => {
      clearUser();
      queryClient.setQueryData(authKeys.session(), null);
    },
  });

  return {
    isAuthenticated,
    user,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error as Error | null,
  };
}; 