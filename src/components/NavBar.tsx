'use client'

import Link from 'next/link'
import { ComponentProps } from 'react'
import { AuthButton } from './AuthButton'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export const NavBar = ({ user }) => {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background'>
      <nav className='container  flex items-center '>
        <NavLink href={'/'}>Home</NavLink>
        {user && (
          <>
            <NavLink href={'/dashboard'}>Dashboard</NavLink>
            <NavLink href={'/dashboard/products'}>Products</NavLink>
          </>
        )}
        <AuthButton user={user} />{' '}
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
