import { AuthRepositoryImpl } from '../../infrastructure/repositories/authRepository';
import { useAuthStore } from '../../infrastructure/repositories/auth.store';
import type { IAuthCredentialsProps } from '../../domain/entities/AuthCredentials';
import { authApi } from '../../infrastructure/api/authApi';
import { User } from '../../domain/entities/User';

const authRepository = new AuthRepositoryImpl();

export const AuthService = {
  login: async (credentials: IAuthCredentialsProps): Promise<void> => {
    try {
      const { user } = await authRepository.login(credentials);
      useAuthStore.getState().setUser(user);
    } catch (error) {
      console.error("Login failed in AuthService:", error);
      throw error;
    }
  },

  logout: (): void => {
    authRepository.clearStoredToken();
    useAuthStore.getState().clearUser();
  },
  
  getMe: async (): Promise<User | null> => {
    const token = authRepository.getStoredToken();
    if(!token) return null;

    try {
      const userProps = await authApi.getMe();
      return User.create(userProps);
    } catch(error) {
      console.error("AuthService: Failed to fetch user with token", error);
      // Jeśli token jest nieważny, czyścimy go
      authRepository.clearStoredToken();
      return null;
    }
  }
}; 