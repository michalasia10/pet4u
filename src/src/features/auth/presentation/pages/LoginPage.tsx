import React from 'react';
import { Box, Typography, Container, Paper, Grid, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { useLoginPagePresenter } from '../hooks/useLoginPagePresenter';

export const LoginPage: React.FC = () => {
  const { titleText, forgotPasswordText, noAccountText } = useLoginPagePresenter();

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
          borderRadius: 2,
        }}
      >
        <Typography component="h1" variant="h5">
          {titleText}
        </Typography>
        <Box sx={{ mt: 3, width: '100%' }}>
          <LoginForm />
        </Box>
        <Grid container direction="column" alignItems="center" sx={{ mt: 2, gap: 1 }}>
          <Grid item>
            <Link component={RouterLink} to="/forgot-password" variant="body2">
              {forgotPasswordText}
            </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="/register" variant="body2">
              {noAccountText}
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}; 