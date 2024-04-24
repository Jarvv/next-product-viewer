import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(3, {
      message: 'Name must contain at least 3 characters',
    })
    .max(50, {
      message: 'Name must contain at most 50 characters',
    }),
  description: z.string().max(100, {
    message: 'Description must contain at most 100 characters',
  }),
  price: z.coerce
    .number({
      required_error: 'Price must be filled',
    })
    .int()
    .min(1, {
      message: 'Price must be greater than or equal to £1',
    }),
  image: z.string(),
  model: z.string(),
})

export type ProductPayload = z.infer<typeof ProductSchema>

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: 'Invalid password',
  }),
})

export type LoginPayload = z.infer<typeof LoginSchema>
