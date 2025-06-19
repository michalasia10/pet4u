import React, { useEffect } from 'react';
import { BrowserRouter as Router, useNavigate, useLocation, useRoutes, matchRoutes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainLayout } from './shared/MainLayout';
import { PublicLayout } from './shared/PublicLayout';
import { theme } from './shared/theme';
import navigationService from './infra/navigation/navigationService';
import { setupApiClientAuth } from './app/setup';
import { AuthProvider } from './features/auth/application/context/AuthContext';
import { appRoutes, type AppRoute } from './infra/router';
import { ProtectedRoute } from './infra/router/ProtectedRoute';

setupApiClientAuth();

const queryClient = new QueryClient();

const NavigationSetter: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigationService.setNavigateFunction(navigate);
  }, [navigate]);
  return null;
};

const wrapProtectedRoutes = (routes: AppRoute[]): AppRoute[] => {
  return routes.map((route) => {
    const newRoute = { ...route };
    if (newRoute.isPublic === false) {
      newRoute.element = <ProtectedRoute>{route.element}</ProtectedRoute>;
    }
    if (newRoute.children) {
      newRoute.children = wrapProtectedRoutes(newRoute.children);
    }
    return newRoute;
  });
};

const processedRoutes = wrapProtectedRoutes(appRoutes);

const AppLayoutManager: React.FC = () => {
  const location = useLocation();
  const matchedRoutes = matchRoutes(appRoutes, location);
  const currentRoute = matchedRoutes ? matchedRoutes[matchedRoutes.length - 1] : null;

  const element = useRoutes(processedRoutes);

  const isPublic = currentRoute?.route.isPublic ?? true;

  if (isPublic) {
    return <PublicLayout>{element}</PublicLayout>;
  }

  return <MainLayout>{element}</MainLayout>;
};

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CssBaseline />
          <Router>
            <NavigationSetter />
            <AppLayoutManager />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App; 