import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { AddProductForm } from '@/components/forms/AddProductForm'

export default function NewProductPage() {
  return (
    <>
      <Card className='w'>
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
