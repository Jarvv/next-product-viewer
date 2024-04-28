import { Heading } from '@/components/Heading'
import { Separator } from '@/components/ui/separator'
import { Checkout } from '@/app/cart/_components/Checkout'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function CartPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return redirect('/login')

  return (
    <div className='w-full'>
      <Heading title='Shopping Cart' description='Your Cart' />
      <Separator className='my-4' />
      <Checkout />
    </div>
  )
}
