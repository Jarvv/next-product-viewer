import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={inter.variable}>
      <body className='bg-background text-primary'>
        <NavBar />
        <main className='min-h-screen flex flex-col items-center'>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
