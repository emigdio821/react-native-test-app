import { z } from 'zod'

const requiredStringField = z.string().min(1, 'Required field')
const emailField = z.string().min(1, 'Required field')

export const loginSchema = z.object({
  email: emailField,
  password: requiredStringField,
})

export const signupSchema = z.object({
  firstName: requiredStringField,
  lastName: requiredStringField,
  email: emailField,
  password: requiredStringField,
  avatarUrl: requiredStringField,
})

export const updateProfileSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  password: z.string().optional(),
  avatarUrl: z.string(),
})
