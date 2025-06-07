// import apiClient from '../../../../infra/api/apiClient';
import type { IAuthCredentialsProps } from '../../domain/entities/AuthCredentials';
import type { IAuthTokenProps } from '../../domain/valueObjects/AuthToken';
import type { IUserProps } from '../../domain/entities/User';
import { mockedUser, mockedToken } from './mock';

export const authApi = {
  async login(credentials: IAuthCredentialsProps): Promise<{ user: IUserProps; token: IAuthTokenProps }> {
    console.log('authApi: login called with', credentials);
    // const response = await apiClient.post('/auth/login', credentials);
    // return response.data;

    // Mocked response
    await new Promise(resolve => setTimeout(resolve, 500));
    if (credentials.email !== 'test@test.com' || credentials.pass !== 'test') {
      throw new Error('API Mock: Nieprawidłowe dane logowania');
    }
    return Promise.resolve({ user: mockedUser.toJSON(), token: mockedToken.toJSON() });
  },

  async logout(): Promise<void> {
    console.log('authApi: logout called');
    // await apiClient.post('/auth/logout');
    return Promise.resolve();
  },

  async refreshToken(refreshToken: string): Promise<IAuthTokenProps> {
    console.log('authApi: refreshToken called with', refreshToken);
    // const response = await apiClient.post('/auth/refresh', { refreshToken });
    // return response.data;

    // Mocked response
    await new Promise(resolve => setTimeout(resolve, 300));
    const newMockToken: IAuthTokenProps = {
      accessToken: `new_mock_access_token_${Date.now()}`,
      refreshToken: refreshToken,
    };
    return Promise.resolve(newMockToken);
  },

  async getMe(): Promise<IUserProps> {
    console.log('authApi: getMe called');
    // const response = await apiClient.get('/users/me');
    // return response.data;
    
    // Mocked response
    return Promise.resolve(mockedUser.toJSON());
  }
}; 