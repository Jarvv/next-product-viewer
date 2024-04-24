'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

export const DeleteDropdownItem = ({ id, disabled }: { id: string; disabled: boolean }) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const deleteProduct = async (id: string) => {
    try {
      await fetch('/api/products', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DropdownMenuItem
      variant='destructive'
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id)
          router.refresh()
        })
      }}
    >
      Delete
    </DropdownMenuItem>
  )
}
