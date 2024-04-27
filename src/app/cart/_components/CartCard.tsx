'use client'

import { Product } from '@prisma/client'
import { X } from 'lucide-react'
import Image from 'next/image'
import useCart from '@/hooks/useCart'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export const CartCard = ({ product }: { product: Product }) => {
  const cart = useCart()

  const onRemove = () => {
    cart.removeItem(product.id)
  }

  return (
    <li className='flex py-4'>
      <Card className='flex flex-row relative flex-grow'>
        <div className='relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48'>
          <Image
            src={product.imageUrl}
            fill
            sizes='200'
            alt={product.name}
            className='object-cover'
          />
        </div>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>{formatPrice(product.price)}</CardDescription>
        </CardHeader>
        <div className='absolute z-10 right-2 top-2'>
          <Button variant='icon' size='icon' onClick={onRemove}>
            <X />
          </Button>
        </div>
      </Card>
    </li>
  )
}
