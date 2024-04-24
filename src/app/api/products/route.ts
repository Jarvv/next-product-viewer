import { z } from 'zod'
import slugify from 'slugify'

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { ProductSchema } from '@/lib/schema'
import prisma from '@/lib/prisma'
import { deleteFromStorage } from '@/lib/storage'

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return new NextResponse('Unauthorised', { status: 401 })
    }

    const requestBody = await req.json()

    const { name, description, price, image, model } = ProductSchema.parse(requestBody)

    const slug = slugify(name, {
      lower: true,
    })

    const productExists = await prisma.product.findFirst({
      where: {
        slug,
      },
    })

    if (productExists) {
      return new NextResponse('Product with the same name exists in this store.', {
        status: 409,
      })
    }

    const product = await prisma.product.create({
      data: {
        name: name,
        slug: slug,
        description: description,
        price: price,
        imageUrl: image,
        modelUrl: model,
        userId: user.id,
      },
    })

    return Response.json(product)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse('Invalid request data passed', { status: 422 })
    }

    return new NextResponse('Could not create product, please try again later.', {
      status: 500,
    })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const supabase = createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return new NextResponse('Unauthorised', { status: 401 })
    }

    const requestBody = await req.json()

    const { id, name, description, price, image, model } = ProductSchema.parse(requestBody)

    console.log(id)

    const slug = slugify(name, {
      lower: true,
    })

    const isProductExist = await prisma.product.findFirst({
      where: {
        id: id,
      },
    })

    if (!isProductExist) {
      return new NextResponse('Product not found.', {
        status: 404,
      })
    }

    await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        name,
        description,
        slug,
        price,
        imageUrl: image,
        modelUrl: model,
      },
    })

    return new NextResponse('OK')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse('Invalid request data passed', { status: 422 })
    }

    console.log(error)

    return new NextResponse('Could not update product, please try again later.', {
      status: 500,
    })
  }
}

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

    const product = await prisma.product.delete({ where: { id: requestBody.id } })

    if (product == null) {
      return new NextResponse('Product does not exist.', {
        status: 409,
      })
    }

    await deleteFromStorage({ fileName: product.imageUrl, bucket: 'images' })

    await deleteFromStorage({ fileName: product.modelUrl, bucket: 'models' })

    return Response.json(product)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse('Invalid request data passed', { status: 422 })
    }
    return new NextResponse('Could not create product, please try again later.', {
      status: 500,
    })
  }
}
