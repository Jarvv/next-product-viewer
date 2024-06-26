'use client'

import Link from 'next/link'
import { ComponentProps } from 'react'
import { AuthNav } from './AuthNav'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { User } from '@supabase/supabase-js'
import { CartNavButton } from '@/components/CartNavButton'

interface NavBarProps {
  user: User | null
}

export const NavBar = ({ user }: NavBarProps) => {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background  py-3'>
      <nav className='container flex items-center justify-between'>
        <div className='flex items-center gap-x-2'>
          <NavLink href={'/'}>Home</NavLink>
          <NavLink href={'/products'}>Products</NavLink>
        </div>
        <div className='flex items-center gap-x-4'>
          <CartNavButton />
          <AuthNav user={user} />
        </div>
      </nav>
    </header>
  )
}

export const NavLink = (props: Omit<ComponentProps<typeof Link>, 'className'>) => {
  const pathName = usePathname()

  return (
    <Link
      {...props}
      className={cn(
        'p-4 hover:bg-secondary hover:text-secondary-foregrand focus-visible:bg-secondary focus-visible:text-secondary-foreground',
        pathName === props.href && 'bg-background text-foreground',
      )}
    />
  )
}
