import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export const DashboardCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className='h-4 w-1/2' />
        <Skeleton className='h-4 w-1/2' />
      </CardHeader>
      <CardContent>
        <Skeleton className='h-4 w-1/2' />
      </CardContent>
    </Card>
  )
}
