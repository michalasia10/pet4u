import React from 'react';
import type { NonIndexRouteObject } from 'react-router-dom';
import { LoginPage } from '../../features/auth/presentation/pages/LoginPage';

export const authRoutes: NonIndexRouteObject[] = [
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: '*',
        element: <LoginPage />,
      },
    ],
  },
]; 