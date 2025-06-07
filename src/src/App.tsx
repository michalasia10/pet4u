import React, { useEffect } from 'react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRoutes } from './infra/router';
import { MainLayout } from './shared/MainLayout';
import { theme } from './shared/theme';
import navigationService from './infra/navigation/navigationService';
import { setupApiClientAuth } from './app/setup';
import { AuthProvider } from './features/auth/application/context/AuthContext';


setupApiClientAuth();

const queryClient = new QueryClient();


const NavigationSetter: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigationService.setNavigateFunction(navigate);
  }, [navigate]);
  return null;
};

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CssBaseline />
          <Router>
            <NavigationSetter />
            <MainLayout>
              <AppRoutes />
            </MainLayout>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}; 