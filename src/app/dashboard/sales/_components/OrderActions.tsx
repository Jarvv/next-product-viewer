'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

export const DeleteDropdownItem = ({ id }: { id: string }) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const deleteOrder = async (id: string) => {
    try {
      await fetch('/api/orders', {
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
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteOrder(id)
          router.refresh()
        })
      }}
    >
      Delete
    </DropdownMenuItem>
  )
}
