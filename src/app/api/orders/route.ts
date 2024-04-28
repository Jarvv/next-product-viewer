import prisma from '@/lib/prisma'
import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest) {
  try {
    const supabase = createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return new NextResponse('Unauthorised', { status: 401 })
    }

    const requestBody = await req.json()

    const order = await prisma.order.delete({
      where: { id: requestBody.id, product: { userId: user.id } },
    })

    if (order == null) {
      return new NextResponse('Product does not exist.', {
        status: 409,
      })
    }

    return Response.json(order)
  } catch (error) {
    return new NextResponse('Could not delete order, please try again later.', {
      status: 500,
    })
  }
}
