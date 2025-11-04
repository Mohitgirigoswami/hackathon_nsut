import { z } from "zod"

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" })
    .refine((data) => /[A-Z]/.test(data), "Password must contain at least one uppercase letter")
    .refine((data) => /[a-z]/.test(data), "Password must contain at least one lowercase letter")
    .refine((data) => /[0-9]/.test(data), "Password must contain at least one number")
    .refine((data) => /[!@#$%^&*()]/.test(data), "Password must contain at least one special character")
})

export type SignInForm = z.infer<typeof signInSchema>
