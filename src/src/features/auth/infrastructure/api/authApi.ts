// import apiClient from '../../../../infra/api/apiClient';
import type { IAuthCredentialsProps } from '../../domain/entities/AuthCredentials';
import { mockedUser, mockedToken } from './mock';
import { userSchema, type UserDTO } from '../../domain/schemas/user.schema';
import { authTokenSchema, type AuthTokenDTO } from '../../domain/schemas/authToken.schema';

export const authApi = {
  async login(credentials: IAuthCredentialsProps): Promise<{ user: UserDTO; token: AuthTokenDTO }> {
    console.log('authApi: login called with', credentials);
    // const response = await apiClient.post('/auth/login', credentials);
    // const rawData = response.data;
    
    // Mocked response
    await new Promise(resolve => setTimeout(resolve, 500));
    if (credentials.email !== 'test@test.com' || credentials.pass !== 'test') {
      throw new Error('API Mock: Nieprawidłowe dane logowania');
    }
    const rawData = { user: mockedUser.toJSON(), token: mockedToken.toJSON() };

   
    const parsedUser = userSchema.parse(rawData.user);
    const parsedToken = authTokenSchema.parse(rawData.token);

    return { user: parsedUser, token: parsedToken };
  },

  async logout(): Promise<void> {
    console.log('authApi: logout called');
    // await apiClient.post('/auth/logout');
    return Promise.resolve();
  },

  async refreshToken(refreshToken: string): Promise<AuthTokenDTO> {
    console.log('authApi: refreshToken called with', refreshToken);
    // const response = await apiClient.post('/auth/refresh', { refreshToken });
    // const rawData = response.data;

    // Mocked response
    await new Promise(resolve => setTimeout(resolve, 300));
    const rawData: AuthTokenDTO = {
      accessToken: `new_mock_access_token_${Date.now()}`,
      refreshToken: refreshToken,
    };
    
    // Walidacja i parsowanie za pomocą Zod
    const parsedToken = authTokenSchema.parse(rawData);
    return parsedToken;
  },

  async getMe(): Promise<UserDTO> {
    console.log('authApi: getMe called');
    // const response = await apiClient.get('/users/me');
    // const rawData = response.data;
    
    // Mocked response
    const rawData = mockedUser.toJSON();
    
    // Walidacja i parsowanie za pomocą Zod
    const parsedUser = userSchema.parse(rawData);
    return parsedUser;
  }
}; 