import PlacePage from '../../features/places/presentation/pages/PlacePage';
import type { RouteObject } from 'react-router-dom';

export const placeRoutes: RouteObject[] = [
  {
    path: '/places',
    element: <PlacePage />,
  },
]; 