'use client'

import { ShoppingCart } from 'lucide-react'

import { Button } from '@/components/ui/button'
import useCart from '@/hooks/useCart'
import { navigate } from '@/app/actions'
import { useEffect, useState } from 'react'

export const CartNavButton = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const cart = useCart()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Button
      onClick={() => navigate('/cart')}
      size='sm'
      className='gap-2'
      variant='outline'
      aria-label={`${cart.items.length}-items-in-cart`}
    >
      <ShoppingCart className='w-4 h-4' />
      {cart.items.length}
    </Button>
  )
}
