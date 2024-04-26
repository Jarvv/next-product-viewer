import { Heading } from '@/components/Heading'
import { ProductCard } from '@/components/cards/ProductCard'
import { ProductCardSkeleton } from '@/components/skeletons/ProductCardSkeleton'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import { Product } from '@prisma/client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

const getNewestProducts = () => {
  return prisma.product.findMany({
    orderBy: {
      created_at: 'desc',
    },
    take: 6,
  })
}

const getMostPopularProducts = () => {
  return prisma.product.findMany({
    orderBy: {
      orders: {
        _count: 'desc',
      },
    },
    take: 6,
  })
}

interface ProductGridSchema {
  title: string
  productFetcher: () => Promise<Product[]>
}

export default async function Index() {
  return (
    <div className='flex w-full flex-col gap-20'>
      <ProductGrid title='Most Popular' productFetcher={getMostPopularProducts} />
      <ProductGrid title='Newest' productFetcher={getNewestProducts} />
    </div>
  )
}

const ProductGrid = ({ title, productFetcher }: ProductGridSchema) => {
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

const ProductSuspense = async ({
  productFetcher,
}: {
  productFetcher: () => Promise<Product[]>
}) => {
  const products = await productFetcher()

  return products.map((product) => {
    return <ProductCard key={product.id} product={product} />
  })
}
