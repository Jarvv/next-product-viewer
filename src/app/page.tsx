import { ProductGrid } from '@/components/ProductGrid'
import { cache } from '@/lib/cache'
import prisma from '@/lib/prisma'

const getNewestProducts = cache(() => {
  return prisma.product.findMany({
    orderBy: {
      created_at: 'desc',
    },
    take: 6,
  })
}, ['/', 'getNewestProducts'])

const getMostPopularProducts = cache(
  () => {
    return prisma.product.findMany({
      orderBy: {
        orders: {
          _count: 'desc',
        },
      },
      take: 6,
    })
  },
  ['/', 'getMostPopularProducts'],
  { revalidate: 60 * 60 * 24 },
)

export default async function Index() {
  return (
    <div className='flex w-full flex-col gap-20'>
      <ProductGrid title='Most Popular' productFetcher={getMostPopularProducts} />
      <ProductGrid title='Newest' productFetcher={getNewestProducts} />
    </div>
  )
}
