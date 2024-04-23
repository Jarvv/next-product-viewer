import { Inter as FontSans } from 'next/font/google'
import '@/styles/globals.css'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { createClient } from '@/utils/supabase/server'
import { cn } from '@/lib/utils'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js Product Model Viewer',
  description: 'A model viewer storefront.',
}

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <html lang='en'>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <NavBar user={user} />
        <div className='flex min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <main className='flex pt-6 md:pl-10 w-full'>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
