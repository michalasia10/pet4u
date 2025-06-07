import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAuthStore } from '../../infrastructure/repositories/auth.store';
import { AuthService } from '../services/AuthService';
import { authKeys } from '../auth.keys';
import type { IAuthCredentialsProps } from '../../domain/entities/AuthCredentials';
import { AuthRepositoryImpl } from '../../infrastructure/repositories/authRepository';

// Utworzenie jednej instancji repozytorium, aby uniknąć jej wielokrotnego tworzenia
const authRepository = new AuthRepositoryImpl();

/**
 * Hook dostarczający API do interakcji z funkcją autentykacji, oparty na TanStack Query.
 */
export const useAuth = () => {
  const queryClient = useQueryClient();
  
  // Bezpośrednia subskrypcja stanu z zustand dla komponentów UI
  const { isAuthenticated, user, setUser, clearUser } = useAuthStore();

  // Używamy useQuery do pobierania i cachowania danych sesji (użytkownika)
  // Zapytanie jest aktywne tylko, jeśli posiadamy token
  const { data: sessionUser } = useQuery({
    queryKey: authKeys.session(),
    queryFn: AuthService.getMe,
    enabled: !!authRepository.getStoredToken(),
    staleTime: Infinity, // Sesja jest "świeża" dopóki nie zostanie unieważniona
  });

  // Efekt do synchronizacji stanu z useQuery do zustand
  useEffect(() => {
    if (sessionUser) {
      setUser(sessionUser);
    }
  }, [sessionUser, setUser]);

  // Używamy useMutation do obsługi logowania
  const loginMutation = useMutation({
    mutationFn: (credentials: IAuthCredentialsProps) => AuthService.login(credentials),
    onSuccess: () => {
      // Po pomyślnym zalogowaniu, unieważniamy zapytanie o sesję.
      // To spowoduje automatyczne ponowne pobranie danych użytkownika przez useQuery.
      queryClient.invalidateQueries({ queryKey: authKeys.session() });
    },
  });

  // Używamy useMutation do obsługi wylogowania
  const logoutMutation = useMutation({
    mutationFn: () => Promise.resolve(AuthService.logout()),
    onSuccess: () => {
      // Po wylogowaniu również unieważniamy sesję i czyścimy store
      clearUser();
      queryClient.setQueryData(authKeys.session(), null);
    },
  });

  return {
    // Stan (z lustra w zustand)
    isAuthenticated,
    user,
    // Mutacje
    login: loginMutation.mutateAsync, // Używamy async, aby komponent mógł obsłużyć błąd
    logout: logoutMutation.mutate,
    // Stany mutacji
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error as Error | null,
  };
}; 