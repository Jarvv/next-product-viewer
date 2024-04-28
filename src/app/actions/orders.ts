'use server'

import prisma from '@/lib/prisma'

export const userOrderExists = async (email: string, productId: string) => {
  return (
    (await prisma.order.findFirst({
      where: {
        profile: {
          user: { email },
        },
        productId,
      },
      select: { id: true },
    })) != null
  )
}
