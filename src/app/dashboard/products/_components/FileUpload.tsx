'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import { deleteFromStorage, uploadToStorage } from '@/lib/storage'
import { Button } from '@/components/ui/button'

interface FileUploadProps {
  onChange: (value: string) => void
  onRemove: () => void
  value?: string
  name: 'images' | 'models'
}

export const FileUpload = ({ onChange, onRemove, value, name }: FileUploadProps) => {
  return (
    <>
      {/* {value ? (
        <div className='pb-5 flex flex-wrap gap-4'>
          {value && (
            <div key={value} className='relative w-[200px] h-[200px]'>
              <Button
                type='button'
                className='z-10 absolute -top-3 -right-3 hover:bg-destructive'
                onClick={async () => {
                  onRemove()
                  await deleteFromStorage({ fileName: value, bucket: name })
                }}
                variant='destructive'
                size='icon'
              >
                <X className='h-6 w-6' />
              </Button>
            </div>
          )}
        </div>
      ) : null} */}
      <input
        className='block w-full text-sm text-primary
         file:mr-4 file:py-2 file:px-4 file:rounded-md
         file:border-0 file:text-sm file:font-semibold
         file:bg-primary file:text-white
         hover:file:bg-primary/90'
        type='file'
        onChange={async (e) => {
          const url = await uploadToStorage({ file: e.target!.files![0], bucket: name })
          if (value) await deleteFromStorage({ fileName: value, bucket: name })
          onChange(url.data!.path)
        }}
      />
    </>
  )
}
