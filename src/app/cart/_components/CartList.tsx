'use client'

import useCart from '@/hooks/useCart'
import { CartCard } from '@/app/cart/_components/CartCard'

export const CartList = () => {
  const cart = useCart()

  return (
    <div className='lg:col-span-7'>
      {cart.items.length === 0 && <p className='text-muted'>No items added to cart</p>}
      <ul>
        {cart.items.map((item) => (
          <CartCard key={item.id} product={item} />
        ))}
      </ul>
    </div>
  )
}
