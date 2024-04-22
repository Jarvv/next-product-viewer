import Link from 'next/link'
import { LoginForm } from '@/components/forms/LoginForm'
import { Card, CardContent, CardHeader } from '@/components/Card'

export default function Login({
  searchParams,
}: {
  searchParams: { message: string; error: string }
}) {
  return (
    <div className='flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2'>
      <Link
        href='/'
        className='absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1'
        >
          <polyline points='15 18 9 12 15 6' />
        </svg>{' '}
        Back
      </Link>
      <Card>
        <CardHeader>Login</CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      {searchParams?.error && (
        <p className='mt-4 p-4 bg-destructive text-background text-center'>{searchParams.error}</p>
      )}
      {searchParams?.message && (
        <p className='mt-4 p-4 bg-emerald-400 text-background text-center'>
          {searchParams.message}
        </p>
      )}
    </div>
  )
}
