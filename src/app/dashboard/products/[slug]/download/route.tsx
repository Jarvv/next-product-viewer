import prisma from '@/lib/prisma'
import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_: NextRequest, { params: { slug } }: { params: { slug: string } }) {
  const supabase = createClient()

  console.log(slug)

  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    select: { modelUrl: true },
  })

  if (product == null) {
    return new NextResponse('Product not found.', {
      status: 404,
    })
  }

  const publicUrl = supabase.storage.from('models').getPublicUrl(product.modelUrl).data.publicUrl

  const location = `${publicUrl}`
  return NextResponse.redirect(location)
}
