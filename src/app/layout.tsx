import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { createClient } from '@/utils/supabase/server'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js Product Model Viewer',
  description: 'A model viewer storefront.',
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <html lang='en' className={inter.variable}>
      <body className='bg-background text-primary'>
        <NavBar user={user} />
        <div className='flex min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <main className='flex pt-6 md:pl-10 w-full justify-center'>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
