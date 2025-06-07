import { authApi } from '../api/authApi';
import { AuthToken } from '../../domain/valueObjects/AuthToken';
import { User } from '../../domain/entities/User';
import type { IAuthCredentialsProps } from '../../domain/entities/AuthCredentials';

const TOKEN_STORAGE_KEY = 'authToken';

export class AuthRepositoryImpl {
  public async login(credentials: IAuthCredentialsProps): Promise<{ user: User; token: AuthToken }> {
    const { user: userDto, token: tokenDto } = await authApi.login(credentials);
    
    const user = User.create(userDto);
    const token = AuthToken.create(tokenDto);

    this.setStoredToken(token);
    return { user, token };
  }

  public async refreshToken(): Promise<AuthToken | null> {
    const currentToken = this.getStoredToken();
    if (!currentToken) return null;

    const tokenDto = await authApi.refreshToken(currentToken.getRefreshToken());
    
    const newToken = AuthToken.create(tokenDto);
    
    this.setStoredToken(newToken);
    return newToken;
  }
  
  public getStoredToken(): AuthToken | null {
    const stored = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!stored) return null;
    try {
      return AuthToken.create(JSON.parse(stored));
    } catch (e) {
      console.error('Failed to parse stored token', e);
      this.clearStoredToken();
      return null;
    }
  }

  public setStoredToken(token: AuthToken): void {
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token.toJSON()));
  }

  public clearStoredToken(): void {
    authApi.logout(); // Wywołujemy wylogowanie na serwerze
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
} 