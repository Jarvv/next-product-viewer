'use client'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { User } from '@supabase/supabase-js'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  ShoppingBag,
  Barcode,
  PoundSterling,
} from 'lucide-react'
import { navigate } from '@/app/actions'

interface AuthNavProps {
  user: User | null
}

export const AuthNav = ({ user }: AuthNavProps) => {
  const signOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    return navigate('/login')
  }

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>
            <UserIcon />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-white' align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-1 leading-none'>
            {user.email && (
              <p className='w-[200px] truncate text-xs text-muted-foreground'>{user.email}</p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>Admin</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href='/dashboard'>
              <LayoutDashboard className='mr-2 h-4 w-4' aria-hidden='true' />
              My Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href='/dashboard/products'>
              <Barcode className='mr-2 h-4 w-4' aria-hidden='true' />
              My Products
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href='/dashboard/sales'>
              <PoundSterling className='mr-2 h-4 w-4' aria-hidden='true' />
              My Sales
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Personal</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href='/dashboard/orders'>
              <ShoppingBag className='mr-2 h-4 w-4' aria-hidden='true' />
              My Orders
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()} asChild>
          <div>
            <LogOut className='mr-2 h-4 w-4' aria-hidden='true' />
            Sign out
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Link
      href='/login'
      className='py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover'
    >
      Login
    </Link>
  )
}
