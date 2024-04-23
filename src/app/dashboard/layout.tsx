import { Heading } from '@/components/Heading'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className='space-y-8 overflow-auto'>
      <div className='pt-6 md:pt-10 md:pl-10 w-full'>
        <div className='flex items-center justify-between'>
          <Heading title='Products' description='Manage your products' />
        </div>
        {children}
      </div>
    </section>
  )
}
