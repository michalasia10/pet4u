import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().min(1),
  email: z.string().email({ message: "Invalid email format" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
});

export type UserDTO = z.infer<typeof userSchema>; 