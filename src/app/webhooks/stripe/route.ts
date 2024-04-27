import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function POST(req: NextRequest) {
  const event = await stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get('stripe-signature') as string,
    process.env.STRIPE_WEBHOOK_SECRET as string,
  )

  if (event.type === 'charge.succeeded') {
    const charge = event.data.object
    const productId = charge.metadata.productId
    const email = charge.billing_details.email
    const pricePaid = charge.amount

    const product = await prisma.product.findUnique({ where: { id: productId } })

    const user = await prisma.profiles.findFirst({
      where: { user: { email } },
    })

    if (product == null || user == null) return new NextResponse('Bad response', { status: 401 })

    await prisma.order.create({
      data: {
        pricePaid,
        productId,
        userId: user.id,
      },
    })
  }

  return new NextResponse()
}
