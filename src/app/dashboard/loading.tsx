import { DashboardCardSkeleton } from '@/components/skeletons/DashboardCardSkeleton'

export default function DashboardLoading() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {Array.from({ length: 2 }).map((_, i) => (
        <DashboardCardSkeleton key={i} />
      ))}
    </div>
  )
}
