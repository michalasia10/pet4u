import type { IndexRouteObject, NonIndexRouteObject, RouteObject } from 'react-router-dom';
import { authRoutes } from './auth';
import { homeRoutes } from './home';
import { communityRoutes } from './community';

export type AppRoute = (Omit<NonIndexRouteObject, 'children'> | IndexRouteObject) & {
  isPublic?: boolean;
  children?: AppRoute[];
};

const markRoutePublic = (routes: RouteObject[], markAsPublic: boolean): AppRoute[] => {
  return routes.map((route) => {
      const { children, ...rest } = route;
      const newRoute: AppRoute = {
          ...rest,
          isPublic: markAsPublic,
      };
      if (children) {
          newRoute.children = markRoutePublic(children, markAsPublic);
      }
      return newRoute;
  });
};

const publicRoutes: AppRoute[] = markRoutePublic([...authRoutes, ...homeRoutes], true);
const protectedRoutes: AppRoute[] = markRoutePublic(communityRoutes, false);

export const appRoutes: AppRoute[] = [
  ...publicRoutes,
  ...protectedRoutes,
]; 