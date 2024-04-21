'use client'

import { ProductPayload, ProductSchema } from '@/lib/schema'
import { useForm } from 'react-hook-form'
import { FormField, FileFormField } from '@/components/Form'
import { Button } from '@/components/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ProductPayload>({
    resolver: zodResolver(ProductSchema),
  })

  const onSubmit = async (payload: ProductPayload) => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      router.push(`/products/${data.slug}`)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className='grid w-full max-w-xl gap-5' onSubmit={handleSubmit(onSubmit)}>
      <FormField
        type='text'
        label='Name'
        placeholder='Product Name'
        name='name'
        register={register}
        error={errors.name}
        disabled={isLoading}
      />
      <FormField
        type='text'
        label='Description'
        placeholder='Product Description'
        name='description'
        register={register}
        error={errors.description}
        disabled={isLoading}
      />
      <FormField
        type='number'
        label='Price'
        placeholder='0'
        name='price'
        register={register}
        error={errors.price}
        disabled={isLoading}
      />
      <FileFormField
        name='image'
        label='Image'
        acceptedFileType='image/png'
        error={errors.image}
        disabled={isLoading}
        setValue={setValue}
        getValues={getValues}
      />
      <FileFormField
        name='model'
        label='Model'
        acceptedFileType='model/gltf-binary'
        error={errors.model}
        disabled={isLoading}
        setValue={setValue}
        getValues={getValues}
      />
      <Button disabled={isLoading}>Add Product</Button>
    </form>
  )
}
