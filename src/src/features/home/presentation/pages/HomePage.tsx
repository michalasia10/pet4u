import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../../auth/application/hooks/useAuth';

export const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Witaj w Pet4U!
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Wszystko dla Twojego zwierzaka w jednym miejscu.
      </Typography>
      {isAuthenticated ? (
        <Typography variant="h6">
          Cześć, {user?.getFirstName()}!
        </Typography>
      ) : (
        <Button
          component={RouterLink}
          to="/auth/login"
          variant="contained"
          size="large"
          sx={{ mt: 4 }}
        >
          Zaloguj się, aby rozpocząć
        </Button>
      )}
    </Box>
  );
}; 