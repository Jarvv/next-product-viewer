'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ProductPayload, ProductSchema } from '@/lib/schema'
import { formatPrice } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FileUpload } from './FileUpload'
import { useRouter } from 'next/navigation'
import { Product } from '@prisma/client'

export const ProductForm = ({ product }: { product?: Product | null }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const form = useForm<ProductPayload>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: product?.name,
      description: product?.description,
      price: product?.price,
      id: product?.id,
      image: product?.imageKey,
      model: product?.modelKey,
    },
  })

  const onSubmit = async (payload: ProductPayload) => {
    try {
      setIsLoading(true)

      await fetch('/api/products', {
        method: product ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      router.push(`/dashboard/products/`)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='py-4'>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Type product name here...' disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem className='py-4'>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Type product description here...'
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem className='py-4'>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <div className='relative'>
                  <p className='absolute text-sm right-16 w-8 inset-y-0 grid place-items-center'>
                    {formatPrice(field.value || 0)}
                  </p>
                  <Input
                    type='number'
                    className='pl-8'
                    placeholder='0'
                    disabled={isLoading}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='image'
          render={({ field }) => (
            <FormItem className='py-4'>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <FileUpload
                  defaultValue={product?.imageKey}
                  name='images'
                  value={field.value}
                  onChange={(file) => (field.value ? field.onChange(file) : field.onChange(file))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='model'
          render={({ field }) => (
            <FormItem className='py-4'>
              <FormLabel>Model</FormLabel>
              <FormControl>
                <FileUpload
                  defaultValue={product?.modelKey}
                  name='models'
                  value={field.value}
                  onChange={(file) => (field.value ? field.onChange(file) : field.onChange(file))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button isLoading={isLoading} className='my-8'>
          Save
          <span className='sr-only'>Save</span>
        </Button>
      </form>
    </Form>
  )
}
