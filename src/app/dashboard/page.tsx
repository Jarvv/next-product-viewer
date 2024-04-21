import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { buttonStyles } from '@/components/Button'
import { ProductCard } from '@/components/cards/ProductCard'
import Link from 'next/link'
import { Heading } from '@/components/Heading'

export default async function Dashboard() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const products = await prisma.product.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  return (
    <div className='flex-1 w-full flex flex-col gap-20 items-center'>
      <Heading title='Your Products' />
      {products.length > 0 ? (
        <section className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      ) : (
        <section className='flex h-[50vh] text-center gap-4 flex-col items-center justify-center'>
          <h2 className='font-semibold text-2xl'>You dont have any products</h2>
          <Link className={buttonStyles()} href='/dashboard/products/new'>
            Create a new product
          </Link>
        </section>
      )}
    </div>
  )
}
