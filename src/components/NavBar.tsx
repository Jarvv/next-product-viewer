'use client'
import Link from 'next/link'
import { useState } from 'react'
import { X, Menu } from 'lucide-react'
import { Button } from '@/components/Button'
import { AuthButton } from './AuthButton'

export const NavBar = ({ user }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background py-3'>
      <nav className='container px-2 sm:px-4 lg:px-6 flex items-center justify-between'>
        {/* Left */}
        <div className='hidden lg:flex gap-x-16 items-center'>
          <Link href='/' className='flex space-x-2'>
            <span className='hidden font-bold lg:inline-block'>Home</span>
          </Link>
          {user && (
            <Link href='/dashboard' className='flex space-x-2'>
              <span className='hidden lg:inline-block'>Dashboard</span>
            </Link>
          )}
        </div>
        <div className='flex lg:hidden'>
          <Button variant='ghost' size='icon' onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </Button>
          <div
            className={`${
              !isOpen ? 'hidden' : 'flex'
            } p-6 absolute top-10 left-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl bg-background shadow-lg border`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              <li className={`font-medium cursor-pointer text-[16px] }`}>
                <Link href='/' className='flex space-x-2'>
                  <span className='font-bold lg:inline-block'>Home</span>
                </Link>
                {user && (
                  <Link href='/dashboard' className='flex space-x-2'>
                    <span className='hidden lg:inline-block'>Dashboard</span>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
        {/* Right */}
        <div className='flex items-center gap-x-2'>
          {' '}
          <AuthButton user={user} />{' '}
        </div>
      </nav>
    </header>
  )
}
