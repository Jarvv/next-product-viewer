'use client'

import { deleteFromStorage, uploadToStorage } from '@/lib/storage'

interface FileUploadProps {
  onChange: (value: string) => void
  value?: string
  name: 'images' | 'models'
  defaultValue: string | undefined
}

export const FileUpload = ({ onChange, value, name, defaultValue }: FileUploadProps) => {
  return (
    <>
      <input
        required={defaultValue == undefined}
        className='block w-full text-sm text-primary
         file:mr-4 file:py-2 file:px-4 file:rounded-md
         file:border-0 file:text-sm file:font-semibold
         file:bg-primary file:text-white
         hover:file:bg-primary/90'
        type='file'
        onChange={async (e) => {
          if (value) await deleteFromStorage({ fileName: value, bucket: name })
          else if (defaultValue != undefined)
            await deleteFromStorage({ fileName: defaultValue, bucket: name })

          const url = await uploadToStorage({ file: e.target!.files![0], bucket: name })
          onChange(url.data!.path)
          defaultValue = undefined
        }}
      />
      {defaultValue != null && <div className='text-muted-foreground'>{defaultValue}</div>}
    </>
  )
}
