'use client'

import { Product } from '@prisma/client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'
import { MouseEventHandler } from 'react'
import useCart from '@/hooks/useCart'

export const ProductCard = ({ product }: { product: Product }) => {
  const cart = useCart()

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    cart.addItem(product)
  }

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className='flex flex-col shadow-sm hover:shadow-lg duration-300 transition-all'>
        <div className='relative w-full h-auto aspect-video'>
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
        <CardContent className='px-4 space-y-3 pb-6'>{product.description}</CardContent>
        <CardFooter className='flex justify-end'>
          <Button
            onClick={onAddToCart}
            className='bg-emerald-50 hover/icon:bg-emerald-500'
            variant={'icon'}
          >
            <ShoppingCart className='text-emerald-600 hover/icon:text-emerald-50' />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
