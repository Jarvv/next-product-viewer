import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { Heading } from '@/components/Heading'
import { AddProductForm } from '@/components/forms/AddProductForm'

export default function NewProductPage() {
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading title='New Product' description='Add a new product to your account' />
      </div>
      <Card>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Add product</CardTitle>
          <CardDescription>Add a new product to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <AddProductForm />
        </CardContent>
      </Card>
    </>
  )
}
