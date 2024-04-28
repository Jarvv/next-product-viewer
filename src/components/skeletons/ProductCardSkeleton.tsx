import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

export const ProductCardSkeleton = () => {
  return (
    <Card className='flex flex-col shadow-sm hover:shadow-lg duration-300 transition-all'>
      <div className='relative w-full h-auto aspect-video'>
        <Skeleton className='relative w-full h-auto aspect-video' />
      </div>
      <CardHeader className='space-y-2'>
        <Skeleton className='h-4 w-1/2' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
      </CardHeader>
      <CardContent className='px-4 space-y-3 pb-6'>
        <Skeleton />
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Skeleton className='h-8 w-1/4' />
      </CardFooter>
    </Card>
  )
}
