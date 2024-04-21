import { z } from 'zod'

export const ProductSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Name must contain at least 3 characters',
    })
    .max(50, {
      message: 'Name must contain at most 50 characters',
    }),
  description: z.string().max(500, {
    message: 'Description must contain at most 500 characters',
  }),
  price: z.coerce
    .number({
      required_error: 'Price must be filled',
    })
    .min(100, {
      message: 'Price must be greater than or equal to £1',
    })
    .max(1000, {
      message: 'Price must be lower than or equal to £10',
    }),
  image: z.string(),

  model: z.string(),
})

export type ProductPayload = z.infer<typeof ProductSchema>
