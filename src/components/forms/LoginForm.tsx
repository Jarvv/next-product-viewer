'use client'
import { LoginPayload, LoginSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { LoginFormField } from '@/components/Form'
import { SubmitButton } from '@/app/login/submit-button'
import { navigate } from '@/app/actions'
import { createClient } from '@/utils/supabase/client'

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: zodResolver(LoginSchema),
  })

  const onLogin = async (payload: LoginPayload) => {
    try {
      const supabase = createClient()

      const { error } = await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      })

      if (error) {
        return navigate('/login?error=Could not authenticate user')
      }

      return navigate('/dashboard')
    } catch (error) {
      return navigate('/login?error=Could not authenticate user')
    }
  }

  const onSignup = async (payload: LoginPayload) => {
    try {
      const supabase = createClient()

      const { error } = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
        options: {
          emailRedirectTo: `${origin}/auth/callback`,
        },
      })

      if (error) {
        return navigate('/login?error=Could not authenticate user')
      }

      return navigate('/login?message=Check email to continue sign in process')
    } catch (error) {
      if (error) {
        return navigate('/login?error=Could not authenticate user')
      }
    }
  }

  return (
    <form className='grid w-full max-w-xl gap-5'>
      <LoginFormField
        type='email'
        label='Email'
        placeholder='Email'
        name='email'
        register={register}
        error={errors.email}
      />
      <LoginFormField
        type='password'
        label='Password'
        placeholder='••••••••'
        name='password'
        register={register}
        error={errors.password}
      />
      <SubmitButton
        className='bg-highlight rounded-md px-4 py-2 text-background mb-2'
        pendingText='Signing In...'
        onClick={(e) => {
          e.preventDefault()
          handleSubmit(onLogin)()
        }}
      >
        Sign In
      </SubmitButton>
      <SubmitButton
        className='border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2'
        pendingText='Signing Up...'
        onClick={(e) => {
          e.preventDefault()
          handleSubmit(onSignup)()
        }}
      >
        Sign Up
      </SubmitButton>
    </form>
  )
}
