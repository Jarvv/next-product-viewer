import { ProductModelViewer } from '@/components/ProductModelViewer'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'
import { ShoppingCart } from 'lucide-react'

export default async function ProductPage({ params: { slug } }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
  })

  if (product == null)
    return (
      <div className='flex flex-col items-center'>
        <p>Product not found</p>
      </div>
    )

  return (
    <div className='p-4 sm:p-6 lg:px-8 w-full'>
      <div className='grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:items-start lg:gap-x-8'>
        <div className='aspect-square relative h-full w-full rounded-lg overflow-hidden'>
          <ProductModelViewer imageUrl={product.imageUrl} modelUrl={product.modelUrl} />
        </div>
        <div>
          <h1 className='text-3xl font-semibold text-gray-900'>{product.name}</h1>
          <div className='mt-3 flex items-end justify-between'>
            <h2 className='text-2xl font-medium text-gray-900'>{formatPrice(product.price)}</h2>
          </div>
          <Separator className='my-4' />
          <div className='flex flex-col gap-y-6'>
            <h3 className='font-medium'>Description :</h3>
            {product.description ? <p>{product.description}</p> : <p>No description</p>}
          </div>
          <div className='mt-10 flex items-center gap-x-3'>
            <Button className='flex items-center gap-x-2'>
              Add To Cart
              <ShoppingCart />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
