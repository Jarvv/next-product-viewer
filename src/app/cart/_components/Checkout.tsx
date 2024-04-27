'use client'

import { paymentIntent } from '@/app/actions/payments'
import { Button } from '@/components/ui/button'
import useCart from '@/hooks/useCart'
import { formatPrice } from '@/lib/utils'
import { loadStripe } from '@stripe/stripe-js'
import { FormEvent, useState } from 'react'
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { userOrderExists } from '@/app/actions/orders'
import { createClient } from '@/utils/supabase/client'
import { CartList } from './CartList'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

export const Checkout = () => {
  const cart = useCart()
  const [clientSecret, setClientSecret] = useState<string>()

  const totalPrice = cart.items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0)

  const onCheckout = async () => {
    const secret = await paymentIntent(cart.items[0])
    setClientSecret(secret)
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
      {clientSecret ? (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <StripeForm totalPrice={totalPrice} productId={cart.items[0].id} />
        </Elements>
      ) : (
        <>
          <CartList />
          <Card className='bg-gray-50 lg:col-span-5'>
            <CardContent>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription className='flex items-center justify-between'>
                  <span>Order total</span>
                  {formatPrice(totalPrice)}
                </CardDescription>
              </CardHeader>

              <CardFooter>
                <Button
                  disabled={cart.items.length === 0}
                  onClick={() => onCheckout()}
                  className='w-full mt-6'
                >
                  Checkout
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

const StripeForm = ({ totalPrice, productId }: { totalPrice: number; productId: string }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (stripe == null || elements == null) return

    setIsLoading(true)

    const supabase = createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setErrorMessage('User error')
      return
    }

    const orderExists = await userOrderExists(user.email!, productId)

    if (orderExists) {
      setErrorMessage('You have already ordered one of these items')
    }

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/payments/success`,
        },
      })
      .then(({ error }) => {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setErrorMessage(error.message)
        } else {
          setErrorMessage('An uknown error occured')
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <form onSubmit={handleSubmit} className='lg:col-span-12'>
      <Card className='bg-gray-50 '>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          {errorMessage && (
            <CardDescription className='text-destructive'>{errorMessage}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <PaymentElement />
          <Separator className='mt-8' />
        </CardContent>
        <CardFooter>
          <Button
            disabled={stripe == null || elements == null || isLoading}
            className='w-full mt-6'
          >
            {isLoading ? 'Purchasing...' : `Purchase - ${formatPrice(totalPrice)}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
