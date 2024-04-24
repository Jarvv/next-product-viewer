import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import prisma from '@/lib/prisma'
import { formatNumber, formatPrice } from '@/lib/utils'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

interface DashboardCardProps {
  title: string
  subtitle: string
  body: string
}

const getOrderData = async (userId: string) => {
  const orderData = await prisma.order.aggregate({
    where: {
      userId: userId,
    },
    _sum: { pricePaid: true },
    _count: true,
  })

  return {
    amount: (orderData._sum.pricePaid || 0) / 100,
    sales: orderData._count,
  }
}

const getProductData = async (userId: string) => {
  const productData = await prisma.product.count({
    where: {
      userId: userId,
    },
  })

  return productData.toString()
}

export default async function DashboardPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return redirect('/login')

  const orderData = await getOrderData(user.id)

  const productData = await getProductData(user.id)

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <DashboardCard title='Products' subtitle='Your products' body={productData} />
      <DashboardCard
        title='Orders'
        subtitle={`${formatPrice(orderData.sales)} Orders`}
        body={formatNumber(orderData.amount)}
      />
    </div>
  )
}

const DashboardCard = ({ title, subtitle, body }: DashboardCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  )
}
