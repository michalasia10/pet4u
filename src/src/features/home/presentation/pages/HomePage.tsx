import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuthContext } from '../../../../shared/context/AuthContext';
import { useHomePagePresenter } from '../hooks/useHomePagePresenter';

export const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useAuthContext();
  const { welcomeText, subtitleText, loginButtonText, canStartText, hiText } = useHomePagePresenter();

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h2" component="h1" gutterBottom>
        {welcomeText}
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        {subtitleText}
      </Typography>
      {isAuthenticated ? (
        <>
        <Typography variant="h6">
          {hiText}, {user?.firstName}!
        </Typography>
        <Button
          component={RouterLink}
          to="/community"
          variant="contained"
          size="large"
          sx={{ mt: 4 }}
        >
          {canStartText}
        </Button>
        </>
      ) : (
        <Button
          component={RouterLink}
          to="/auth/login"
          variant="contained"
          size="large"
          sx={{ mt: 4 }}
        >
          {loginButtonText}
        </Button>
      )}
    </Box>
  );
}; 