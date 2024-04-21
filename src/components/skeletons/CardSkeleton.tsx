import { Skeleton } from '@/components/skeletons/Skeleton'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/Card'

export const CardSkeleton = () => {
  return (
    <Card className='p-5 rounded-2xl sm:w-[360px] w-full'>
      <CardHeader className='relative w-full h-[230px]'>
        <Skeleton className='w-full h-full rounded-2xl' />
      </CardHeader>
      <CardContent>
        <Skeleton className='h-4 w-1/2' />
      </CardContent>
      <CardFooter>
        <Skeleton className='h-4 w-1/4' />
      </CardFooter>
    </Card>
  )
}
