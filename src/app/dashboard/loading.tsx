import { CardSkeleton } from '@/components/skeletons/CardSkeleton'

export default function DashboardLoading() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {Array.from({ length: 3 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}
