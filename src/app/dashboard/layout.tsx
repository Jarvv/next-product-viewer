import { Heading } from '@/components/Heading'
import { Separator } from '@/components/ui/separator'

export const dynamic = 'force-dynamic'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='pt-6 md:pt-10 w-full'>
        <div className='flex items-center justify-between'>
          <Heading title='Dashboard' description='Your Dashboard' />
        </div>
        <Separator className='my-4' />
        {children}
      </div>
    </>
  )
}
