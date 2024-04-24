'use client'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { User } from '@supabase/supabase-js'

interface AuthButtonProps {
  user: User | null
}

export const AuthButton = ({ user }: AuthButtonProps) => {
  const signOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    return redirect('/login')
  }

  return user ? (
    <div className='flex items-center gap-4'>
      <form action={signOut}>
        <button className='py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover'>
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href='/login'
      className='py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover'
    >
      Login
    </Link>
  )
}
