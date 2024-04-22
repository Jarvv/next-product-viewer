'use client'

import { LoginPayload, ProductPayload } from '@/lib/schema'
import { FieldError, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { useState } from 'react'
import Image from 'next/image'
import { deleteFromStorage, uploadToStorage } from '@/lib/storage'

interface ProductFormFieldProps extends InputProps {
  name: keyof ProductPayload
  register: UseFormRegister<ProductPayload>
  error: FieldError | undefined
}

interface LoginFormFieldProps extends InputProps {
  name: keyof LoginPayload
  register: UseFormRegister<LoginPayload>
  error: FieldError | undefined
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string
  label: string
  placeholder: string
}

interface FileFormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: keyof ProductPayload
  label: string
  error: FieldError | undefined
  acceptedFileType: 'image/png' | 'model/gltf-binary'
  setValue: UseFormSetValue<ProductPayload>
  getValues: UseFormGetValues<ProductPayload>
}

export const ProductFormField = ({
  type,
  label,
  placeholder,
  name,
  register,
  error,
  disabled,
  ...props
}: ProductFormFieldProps) => {
  return (
    <>
      <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        {...props}
        disabled={disabled}
      />
      {error && <span className='text-sm font-medium text-destructive'>{error.message}</span>}
    </>
  )
}

export const LoginFormField = ({
  type,
  label,
  placeholder,
  name,
  register,
  error,
  disabled,
  ...props
}: LoginFormFieldProps) => {
  return (
    <>
      <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        {...props}
        disabled={disabled}
      />
      {error && <span className='text-sm font-medium text-destructive'>{error.message}</span>}
    </>
  )
}

export const FileFormField = ({
  label,
  error,
  name,
  acceptedFileType,
  setValue,
  getValues,
  disabled,
  ...props
}: FileFormFieldProps) => {
  const [preview, setPreview] = useState<string>()

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files ? e.target.files[0] : null

    if (name === 'image' && getValues('image') !== null)
      deleteFromStorage({ fileName: getValues('image'), bucket: 'images' })
    if (name === 'model' && getValues('model') !== null)
      deleteFromStorage({ fileName: getValues('model'), bucket: 'models' })

    if (file) {
      if (acceptedFileType === 'image/png') {
        setPreview(URL.createObjectURL(file))

        const response = await uploadToStorage({ file, bucket: 'images' })

        if (response.status === 'ok') {
          setValue('image', response.data!.path, {
            shouldValidate: true,
          })
        }
      } else {
        const response = await uploadToStorage({ file, bucket: 'models' })

        if (response.status === 'ok') {
          setValue('model', response.data!.path, {
            shouldValidate: true,
          })
        }
      }
    }
  }

  return (
    <>
      <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
        {label}
      </label>
      <input
        name={name}
        type='file'
        accept={acceptedFileType}
        onChange={handleChange}
        className='block w-full text-sm text-muted-foreground
          file:mr-4 file:py-2 file:px-4 file:rounded-md
          file:border-0 file:text-sm file:font-semibold
          file:bg-highlight file:text-white
          hover:file:bg-highlight-100'
        {...props}
        disabled={disabled}
      />
      {preview !== undefined && (
        <div
          className='inline-flex border border-gray-200 rounded-sm mb-2 mr-2 w-[200px] h-[200px] p-1 box-border'
          key={preview}
        >
          <Image
            alt='Image upload'
            src={preview}
            width={200}
            height={200}
            className='block w-auto h-full'
            onLoad={() => {
              URL.revokeObjectURL(preview)
            }}
          />
        </div>
      )}
      {error && <span className='text-sm font-medium text-destructive'>{error.message}</span>}
    </>
  )
}
