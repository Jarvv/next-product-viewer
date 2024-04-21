import { AuthButton } from '@/components/AuthButton'

export const NavBar = () => {
  return (
    <nav className='w-full flex justify-center border-b border-b-secondary/10 h-16'>
      <div className='w-full max-w-4xl flex justify-between items-center p-3 text-sm'>
        <AuthButton />
      </div>
    </nav>
  )
}