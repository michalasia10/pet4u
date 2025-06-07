import type { TFunction } from 'i18next';
import { z } from 'zod';

export const getLoginFormSchema = (t: TFunction) =>
  z.object({
    email: z.string().email(t('validation.email.invalid')),
    pass: z.string().min(1, t('validation.password.required')),
  });

export type LoginFormValues = z.infer<ReturnType<typeof getLoginFormSchema>>; 