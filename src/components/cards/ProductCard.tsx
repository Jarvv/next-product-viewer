import { Product } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/dashboard/products/${product.id}`}>
      <div className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'>
        <div className='relative w-full h-[230px]'>
          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <div className='bg-white w-10 h-10 rounded-full flex justify-center items-center'>
              <Image
                src={product.imageUrl}
                fill
                sizes='200'
                alt={product.name}
                className='aspect-square object-cover rounded-2xl'
              />
            </div>
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{product.name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{product.price}</p>
        </div>
      </div>
    </Link>
  )
}
