import { Heading } from '@/components/Heading'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import prisma from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'
import { MoreVertical } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'

export default function OrdersPage() {
  return (
    <>
      <div className='flex justify-between items-center gap-4'>
        <Heading title='My Orders' />
      </div>
      <Separator className='my-4' />
      <OrdersTable />
    </>
  )
}

const OrdersTable = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const orders = await prisma.order.findMany({
    where: {
      userId: user?.id,
    },
    select: {
      id: true,
      pricePaid: true,
      product: { select: { name: true, modelUrl: true } },
    },
    orderBy: { created_at: 'desc' },
  })

  if (orders.length === 0)
    return (
      <div className='flex flex-col items-center'>
        <p>No orders found</p>
      </div>
    )

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Price Paid</TableHead>
          <TableHead className='w-0'>
            <span className='sr-only'>Actions</span>
          </TableHead>
        </TableRow>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.product.name}</TableCell>
            <TableCell>{formatPrice(order.pricePaid)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className='sr-only'>{order.id} Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <a download href={order.product.modelUrl}>
                      Download
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableHeader>
    </Table>
  )
}
