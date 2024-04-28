import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'
import { notFound } from 'next/navigation'
import { Stripe } from 'stripe'
import Image from 'next/image'
import { Heading } from '@/components/Heading'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { payment_intent: string }
}) {
  const paymentIntent = await stripe.paymentIntents.retrieve(searchParams.payment_intent)

  if (paymentIntent.metadata.productId == null) return notFound()

  const product = await prisma.product.findUnique({
    where: {
      id: paymentIntent.metadata.productId,
    },
  })

  if (product == null) return notFound()

  const isSuccess = paymentIntent.status == 'succeeded'

  return (
    <div className='p-4 sm:p-6 lg:px-8 w-full'>
      <Heading title={isSuccess ? 'Success!' : 'Error!'} />
      <div className='grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:items-start lg:gap-x-8'>
        <div className='aspect-square relative h-full w-full rounded-lg overflow-hidden'>
          <Image fill src={product.imageUrl} alt='Image' className='object-cover object-center' />
        </div>
        <div>
          <h1 className='text-3xl font-semibold text-gray-900'>{product.name}</h1>
          <div className='mt-3 flex items-end justify-between'>
            <h2 className='text-2xl font-medium text-gray-900'>{formatPrice(product.price)}</h2>
          </div>
          <Separator className='my-4' />
          <div className='flex flex-col gap-y-6'>
            {product.description ? <p>{product.description}</p> : <p>No description</p>}
          </div>
          <Button className='mt-4' asChild>
            {isSuccess ? (
              <a href={product.modelUrl}>Download</a>
            ) : (
              <Link href={'/cart'}>Try again</Link>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
