import { Box, TextField, Button, CircularProgress, Alert } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema, type LoginFormValues } from '../../presentation/validation/loginFormSchema';
import { useAuth } from '../../application/hooks/useAuth';

export function LoginForm() {
  const { login, isLoggingIn, loginError } = useAuth();
  
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      pass: '',
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        maxWidth: '400px',
      }}
    >
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />
        )}
      />
      <Controller
        name="pass"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Password"
            type="password"
            variant="outlined"
            error={!!errors.pass}
            helperText={errors.pass?.message}
            fullWidth
          />
        )}
      />
      
      {loginError && <Alert severity="error">{loginError.message}</Alert>}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!isDirty || !isValid || isLoggingIn}
        fullWidth
      >
        {isLoggingIn ? <CircularProgress size={24} /> : 'Login'}
      </Button>
    </Box>
  );
} 