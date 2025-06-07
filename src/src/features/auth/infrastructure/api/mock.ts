import { User } from '../../domain/entities/User';
import { AuthToken } from '../../domain/valueObjects/AuthToken';
import type { IAuthCredentialsProps } from '../../domain/entities/AuthCredentials';

export const mockedUser = User.create({
  id: '1',
  email: 'test@test.com',
  firstName: 'Jan',
  lastName: 'Kowalski',
});

export const mockedToken = AuthToken.create({
  accessToken: 'mock_access_token_123',
  refreshToken: 'mock_refresh_token_456',
});

export const mockedCredentials: IAuthCredentialsProps = {
  email: 'test@test.com',
  pass: 'test',
}; 