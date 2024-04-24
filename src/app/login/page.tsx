import { LoginForm } from '@/components/forms/LoginForm'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function Login({
  searchParams,
}: {
  searchParams: { message: string; error: string }
}) {
  return (
    <div className='flex flex-col w-full items-center'>
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
