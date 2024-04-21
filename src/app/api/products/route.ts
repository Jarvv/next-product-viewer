import { z } from 'zod'
import slugify from 'slugify'

import { NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { ProductSchema } from '@/lib/schema'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: 'unauthorised' }, { status: 401 })
    }

    const requestBody = await req.json()

    const { name, description, price, image, model } = ProductSchema.parse(requestBody)

    const slug = slugify(name, {
      lower: true,
    })

    console.log(slug)

    const productExists = await prisma.product.findFirst({
      where: {
        slug,
      },
    })

    if (productExists) {
      return new Response('Product with the same name exists in this store.', {
        status: 409,
      })
    }

    const product = await prisma.product.create({
      data: {
        name: name,
        slug: slug,
        description: description,
        price: price,
        imageUrl: image.path,
        modelUrl: model.path,
        userId: user.id,
      },
    })

    return Response.json(product)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request data passed', { status: 422 })
    }

    console.log(error)

    return new Response('Could not create product, please try again later.', {
      status: 500,
    })
  }
}
