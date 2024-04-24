import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductForm } from '@/app/dashboard/products/_components/ProductForm'
import prisma from '@/lib/prisma'

export default async function EditProductPage({ params: { slug } }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({ where: { slug } })

  return (
    <>
      <Card className='w'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Edit product</CardTitle>
          <CardDescription>Add a new product to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm product={product} />
        </CardContent>
      </Card>
    </>
  )
}
