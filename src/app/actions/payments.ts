'use server'

import { Product } from '@prisma/client'
import { Stripe } from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export const paymentIntent = async (product: Product) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.price,
    currency: 'GBP',
    metadata: { productId: product.id },
  })

  if (paymentIntent.client_secret == null) {
    throw Error('Stripe failed')
  }

  return paymentIntent.client_secret
}
