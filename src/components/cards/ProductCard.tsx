import { Product } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/Card'
import { formatPrice } from '@/utils/utils'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/dashboard/products/${product.slug}`}>
      <Card className='group/card p-5 rounded-2xl w-[360px] shadow-lg border hover:shadow-2xl duration-300 transition-all'>
        <CardHeader className='aspect-square m-3 rounded-2xl bg-gray-100 relative'>
          <Image
            src={product.imageUrl}
            fill
            sizes='200'
            alt={product.name}
            className='aspect-square object-cover rounded-2xl'
          />
        </CardHeader>
        <CardContent className='px-4 space-y-3 pb-6'>
          <p className='font-semibold group-hover/card:text-highlight text-lg truncate'>
            {product.name}
          </p>
          <div className='font-semibold text-highlight'>
            {formatPrice(parseFloat(product.price.toString()))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
