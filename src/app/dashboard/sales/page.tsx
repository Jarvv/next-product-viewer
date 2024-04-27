import { Heading } from '@/components/Heading'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import prisma from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'
import { MoreVertical } from 'lucide-react'
import { DeleteDropdownItem } from '@/app/dashboard/sales/_components/OrderActions'
import { createClient } from '@/utils/supabase/server'

export default function SalesPage() {
  return (
    <>
      <div className='flex justify-between items-center gap-4'>
        <Heading title='Sales' />
      </div>
      <Separator className='my-4' />
      <SalesTable />
    </>
  )
}

const SalesTable = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const orders = await prisma.order.findMany({
    where: {
      product: { userId: user!.id },
    },
    select: {
      id: true,
      pricePaid: true,
      product: { select: { name: true } },
      profile: { select: { user: { select: { email: true } } } },
    },
    orderBy: { created_at: 'desc' },
  })

  if (orders.length === 0)
    return (
      <div className='flex flex-col items-center'>
        <p>No sales found</p>
      </div>
    )

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Price Paid</TableHead>
          <TableHead className='w-0'>
            <span className='sr-only'>Actions</span>
          </TableHead>
        </TableRow>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.product.name}</TableCell>
            <TableCell>{order.profile.user.email}</TableCell>
            <TableCell>{formatPrice(order.pricePaid)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className='sr-only'>{order.id} Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuSeparator />
                  <DeleteDropdownItem id={order.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableHeader>
    </Table>
  )
}
