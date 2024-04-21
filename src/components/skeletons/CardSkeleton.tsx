import { Skeleton } from '@/components/skeletons/Skeleton'

export const CardSkeleton = () => {
  return (
    <div className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'>
      <div className='relative w-full h-[230px]'>
        <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
          <div className='bg-white w-10 h-10 rounded-full flex justify-center items-center'>
            <Skeleton className='w-full h-full rounded-2xl' />
          </div>
        </div>
      </div>

      <div className='mt-5'>
        <Skeleton className='h-4 w-1/2' />
        <Skeleton className='h-4 w-1/4' />
      </div>
    </div>
  )
}
