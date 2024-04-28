import { ProductSuspense } from '@/components/ProductGrid'
import { ProductCardSkeleton } from '@/components/skeletons/ProductCardSkeleton'
import { cache } from '@/lib/cache'
import prisma from '@/lib/prisma'
import { Suspense } from 'react'

const getProducts = cache(() => {
  return prisma.product.findMany({
    orderBy: {
      name: 'asc',
    },
  })
}, ['/products', 'getProducts'])

export default function ProductsPage() {
  return (
    <div className='flex w-full flex-col gap-20'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense productFetcher={getProducts} />
        </Suspense>
      </div>
    </div>
  )
}
