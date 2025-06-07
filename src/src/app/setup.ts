import { setAuthHooks } from '../infra/api/apiClient';
import { AuthRepositoryImpl } from '../features/auth/infrastructure/repositories/authRepository';
import navigationService from '../infra/navigation/navigationService';

const authRepository = new AuthRepositoryImpl();

export function setupApiClientAuth(): void {
  setAuthHooks({
    getAccessToken: () => {
      const token = authRepository.getStoredToken();
      return token ? token.getAccessToken() : null;
    },
    attemptTokenRefresh: async () => {
      try {
        const newToken = await authRepository.refreshToken();
        return newToken ? newToken.getAccessToken() : null;
      } catch (error) {
        console.error('AuthHook: Failed to refresh token via repository:', error);
        return null;
      }
    },
    onAuthFailure: () => {
      console.log('AuthHook: Authentication failure, clearing token and redirecting to login.');
      authRepository.clearStoredToken();
      // Przekierowujemy na główną ścieżkę logowania
      navigationService.navigateTo('/auth/login', { replace: true });
    }
  });
} 