import { useRoutes } from 'react-router-dom';
import { authRoutes } from './auth';
import { homeRoutes } from './home';

const allRoutes = [
  ...homeRoutes,
  ...authRoutes,
];

export const AppRoutes = () => {
  const element = useRoutes(allRoutes);
  return element;
}; 