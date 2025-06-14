import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../shared/context/AuthContext';
import { useMainLayoutPresenter } from './hooks/useMainLayoutPresenter';
import { PetSwitcher } from './components/PetSwitcher';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();
  const { appTitle, logoutButtonText, loginButtonText } = useMainLayoutPresenter();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ color: 'inherit', textDecoration: 'none' }}
          >
            {appTitle}
          </Typography>
          <Button
            color="inherit"
            component={RouterLink}
            to="/community"
            sx={{ ml: 2 }}
          >
            Miejsca
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          {isAuthenticated ? (
            <>
              <PetSwitcher />
              <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
                {logoutButtonText}
              </Button>
            </>
          ) : (
            <Button color="inherit" component={RouterLink} to="/auth/login">
              {loginButtonText}
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container
        maxWidth={false}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </Container>
    </Box>
  );
}; 