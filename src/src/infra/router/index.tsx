import { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { authRoutes } from './auth';
import { homeRoutes } from './home';
import { ProtectedRoute } from './ProtectedRoute';

const protectedAppRoutes: RouteObject[] = [

].map((route: RouteObject) => ({
  ...route,
  element: <ProtectedRoute>{route.element}</ProtectedRoute>
}));

const allRoutes = [
  ...homeRoutes,
  ...authRoutes,
  ...protectedAppRoutes,
];

export const AppRoutes = () => {
  const element = useRoutes(allRoutes);
  return element;
}; 