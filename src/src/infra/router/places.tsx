import PlacePage from '../../features/places/presentation/pages/PlacePage';
import PlaceDetailPage from '../../features/places/presentation/pages/PlaceDetailPage';
import type { RouteObject } from 'react-router-dom';

export const placeRoutes: RouteObject[] = [
  {
    path: '/places',
    element: <PlacePage />,
  },
  {
    path: '/places/:id',
    element: <PlaceDetailPage />,
  },
]; 