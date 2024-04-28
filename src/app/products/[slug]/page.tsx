import prisma from '@/lib/prisma'
import { ProductInfo } from '@/app/products/_components/ProductInfo'

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

  return <ProductInfo product={product} />
}
