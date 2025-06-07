import { z } from 'zod';

export const authTokenSchema = z.object({
  accessToken: z.string().min(1, { message: "Access token cannot be empty" }),
  refreshToken: z.string().min(1, { message: "Refresh token cannot be empty" }),
});

export type AuthTokenDTO = z.infer<typeof authTokenSchema>; 