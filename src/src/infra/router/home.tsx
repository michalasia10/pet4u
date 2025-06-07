import React from 'react';
import type { RouteObject } from 'react-router-dom';
import { HomePage } from '../../features/home/presentation/pages/HomePage';

export const homeRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
]; 