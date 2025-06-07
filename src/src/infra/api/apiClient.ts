import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import navigationService from '../navigation/navigationService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

let _getAccessToken: () => string | null = () => {
  console.warn('apiClient: _getAccessToken not configured');
  return null;
};
let _attemptTokenRefresh: () => Promise<string | null> = async () => {
  console.warn('apiClient: _attemptTokenRefresh not configured');
  return null;
};
let _onAuthFailure: () => void = () => {
  console.warn('apiClient: _onAuthFailure not configured. Navigating to login by default.');
  navigationService.navigateTo('/auth/login');
};

export interface AuthClientHooks {
  getAccessToken: () => string | null;
  attemptTokenRefresh: () => Promise<string | null>;
  onAuthFailure: () => void;
}

export function setAuthHooks(hooks: AuthClientHooks): void {
  _getAccessToken = hooks.getAccessToken;
  _attemptTokenRefresh = hooks.attemptTokenRefresh;
  _onAuthFailure = hooks.onAuthFailure;
}

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = _getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        console.log('Attempting to refresh token via auth hook...');
        const newAccessToken = await _attemptTokenRefresh();
        
        if (newAccessToken) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }
          return apiClient(originalRequest); 
        } else {
          console.error('Token refresh failed: new access token not received.');
          _onAuthFailure();
          return Promise.reject(new Error('Token refresh failed and new token not provided.'));
        }
      } catch (refreshError) {
        console.error('Error during token refresh attempt:', refreshError);
        _onAuthFailure();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient; 