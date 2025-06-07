import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email('Nieprawidłowy format adresu e-mail'),
  pass: z.string().min(1, 'Hasło jest wymagane'),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>; 