import { Heading } from '@/components/Heading'
import { Separator } from '@/components/ui/separator'

export const dynamic = 'force-dynamic'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='w-full'>
        <Heading title='Dashboard' description='Your Dashboard' />
        <Separator className='my-4' />
        {children}
      </div>
    </>
  )
}
