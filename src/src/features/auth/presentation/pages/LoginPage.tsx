import React from 'react';
import { Box, Typography, Container, Paper, Grid, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
        }}
      >
        <Typography component="h1" variant="h5">
          Zaloguj się
        </Typography>
        <Box sx={{ mt: 3, width: '100%' }}>
          <LoginForm />
        </Box>
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs>
            <Link component={RouterLink} to="/forgot-password" variant="body2">
              Zapomniałeś hasła?
            </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="/register" variant="body2">
              {"Nie masz konta? Zarejestruj się"}
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}; 