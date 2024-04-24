import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductForm } from '@/app/dashboard/products/_components/ProductForm'

export default function NewProductPage() {
  return (
    <>
      <Card className='w'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Add product</CardTitle>
          <CardDescription>Add a new product to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm />
        </CardContent>
      </Card>
    </>
  )
}
