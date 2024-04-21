import { createClient } from '@/utils/supabase/client'
import { getRandomFileName } from '@/utils/utils'

interface UploadProps {
  file: File
  bucket: 'images' | 'models'
}

interface DeleteProps {
  fileName: string
  bucket: 'images' | 'models'
}

export const uploadToStorage = async ({ file, bucket }: UploadProps) => {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(getRandomFileName(file), file)

    if (error) throw new Error('Failed to upload')

    return { status: 'ok', data: data }
  } catch (error) {
    return { status: 'errpr', error: error }
  }
}

export const deleteFromStorage = async ({ fileName, bucket }: DeleteProps) => {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.storage.from(bucket).remove([fileName])

    if (error) throw new Error('Failed to upload')

    return { status: 'ok', data: data }
  } catch (error) {
    return { status: 'errpr', error: error }
  }
}
