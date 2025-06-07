import React from 'react';
import { Box, TextField, Button, CircularProgress } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../application/hooks/useAuth';
import { loginFormSchema } from '../validation/loginFormSchema';
import type { IAuthCredentialsProps } from '../../domain/entities/AuthCredentials';
import { useNavigate } from 'react-router-dom';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoggingIn, loginError } = useAuth();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthCredentialsProps>({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: 'test@test.com',
      pass: 'test',
    },
  });

  const onSubmit = async (data: IAuthCredentialsProps) => {
    try {
      await login(data);
      // Po udanym logowaniu nawigujemy do strony głównej
      navigate('/');
    } catch (err) {
      // Błędy z mutacji są już dostępne w `loginError`, 
      // więc nie trzeba ich tu dodatkowo łapać, chyba że dla specyficznej logiki.
      console.error("Login failed in component", err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 1 }}
    >
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adres Email"
            autoComplete="email"
            autoFocus
            error={!!errors.email}
            helperText={errors.email?.message}
            disabled={isLoggingIn}
          />
        )}
      />
      <Controller
        name="pass"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            label="Hasło"
            type="password"
            id="pass"
            autoComplete="current-password"
            error={!!errors.pass}
            helperText={errors.pass?.message}
            disabled={isLoggingIn}
          />
        )}
      />
      {loginError && (
         <Box sx={{ color: 'error.main', mt: 2, textAlign: 'center' }}>
           {loginError.message}
         </Box>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoggingIn}
      >
        {isLoggingIn ? <CircularProgress size={24} /> : 'Zaloguj się'}
      </Button>
    </Box>
  );
}; 