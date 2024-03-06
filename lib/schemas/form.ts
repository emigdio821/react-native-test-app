import { z } from 'zod'

const requiredStringField = z.string().min(1, 'Required field')

export const loginSchema = z.object({
  email: z.string().email().min(1, 'Required field'),
  password: requiredStringField,
})
