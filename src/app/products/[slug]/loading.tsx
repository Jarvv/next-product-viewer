import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProductPageLoading() {
  return (
    <div className='p-4 sm:p-6 lg:px-8 w-full'>
      <div className='grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:items-start lg:gap-x-8'>
        <div className='aspect-square relative h-full w-full rounded-lg overflow-hidden'>
          <Skeleton className='aspect-square w-full' />
        </div>
        <div>
          <Skeleton className='w-[200px] h-[32px]' />
          <div className='mt-3 flex items-end justify-between'>
            <Skeleton className='w-[200px] h-[32px]' />
          </div>
          <Separator className='my-4' />
          <div className='flex flex-col gap-y-6'>
            <Skeleton className='w-[200px] h-[32px]' />
            <Skeleton className='w-full h-[32px]' />
          </div>
          <div className='mt-10 flex items-center gap-x-3'>
            <Skeleton className='w-[150px] h-[40px] rounded-full' />
          </div>
        </div>
      </div>
    </div>
  )
}
