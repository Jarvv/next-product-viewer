import { Product } from '@prisma/client'
import { ProductCardSkeleton } from '@/components/skeletons/ProductCardSkeleton'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/cards/ProductCard'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Heading } from '@/components/Heading'
import { Suspense } from 'react'

interface ProductGridSchema {
  title: string
  productFetcher: () => Promise<Product[]>
}

export const ProductGrid = ({ title, productFetcher }: ProductGridSchema) => {
  return (
    <div className='space-y-4'>
      <div className='flex gap-4'>
        <Heading title={title} />
        <Button asChild variant={'outline'}>
          <Link href={'/products'} className='space-x-2'>
            <span>View All</span>
            <ArrowRight className='size-4' />
          </Link>
        </Button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense productFetcher={productFetcher} />
        </Suspense>
      </div>
    </div>
  )
}

export const ProductSuspense = async ({
  productFetcher,
}: {
  productFetcher: () => Promise<Product[]>
}) => {
  const products = await productFetcher()

  return products.map((product) => {
    return <ProductCard key={product.id} product={product} />
  })
}
