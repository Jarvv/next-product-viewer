import { Product } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/Card'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/dashboard/products/${product.id}`}>
      <Card className='p-5 rounded-2xl sm:w-[360px] w-full'>
        <CardHeader className='relative w-full h-[230px]'>
          <Image
            src={product.imageUrl}
            fill
            sizes='200'
            alt={product.name}
            className='aspect-square object-cover rounded-2xl'
          />
        </CardHeader>
        <CardContent>
          <h3 className='text-white font-bold text-[24px]'>{product.name}</h3>
        </CardContent>
        <CardFooter>
          <p className='mt-2 text-secondary text-[14px]'>{product.price}</p>
        </CardFooter>
      </Card>
    </Link>
  )
}
