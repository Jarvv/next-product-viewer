import { Heading } from '@/components/Heading'
import { CardSkeleton } from '@/components/skeletons/CardSkeleton'

export default function DashboardLoading() {
  return (
    <div className='flex-1 w-full flex flex-col gap-20 items-center'>
      <Heading title='Your Products' />
      <section className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 3 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </section>
    </div>
  )
}
