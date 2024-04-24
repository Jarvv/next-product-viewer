'use client'

import { LoginPayload, LoginSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { navigate } from '@/app/actions'
import { Separator } from '../ui/separator'

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [signUp, setSignUp] = useState<boolean>(false)

  const form = useForm<LoginPayload>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
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
    } finally {
      setIsLoading(false)
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

  return signUp ? (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSignup)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='py-4'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Email' type='email' disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='py-4'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder='••••••••' type='password' disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button isLoading={isLoading} className='my-8'>
          Sign Up
          <span className='sr-only'>Sig Up</span>
        </Button>
      </form>
      <Separator />
      <p>Already have an account?</p>
      <Button
        variant={'secondary'}
        isLoading={isLoading}
        className='my-2'
        onClick={() => setSignUp(false)}
      >
        Log in
        <span className='sr-only'>Log in</span>
      </Button>
    </Form>
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onLogin)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='py-4'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Email' type='email' disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='py-4'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder='••••••••' type='password' disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button isLoading={isLoading} className='my-8'>
          Login
          <span className='sr-only'>Login</span>
        </Button>
      </form>
      <Separator />
      <p>Dont have an account?</p>
      <Button
        variant={'secondary'}
        isLoading={isLoading}
        className='my-2'
        onClick={() => setSignUp(true)}
      >
        Sign Up
        <span className='sr-only'>Sign Up</span>
      </Button>
    </Form>
  )
}
