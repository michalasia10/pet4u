import type { RouteObject } from 'react-router-dom';
import CommunityPage from '../../features/community/presentation/pages/CommunityPage';

export const communityRoutes: RouteObject[] = [
  {
    path: '/community',
    element: <CommunityPage />,
  },
]; 