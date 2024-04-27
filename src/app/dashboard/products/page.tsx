import { Heading } from '@/components/Heading'
import { buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import prisma from '@/lib/prisma'
import { formatNumber, formatPrice } from '@/lib/utils'
import { MoreVertical } from 'lucide-react'
import Link from 'next/link'
import { DeleteDropdownItem } from './_components/ProductActions'

export default function ProductsPage() {
  return (
    <>
      <div className='flex justify-between items-center gap-4'>
        <Heading title='Products' />
        <Link className={buttonVariants()} href='/dashboard/products/new'>
          Add Product
        </Link>
      </div>
      <Separator className='my-4' />
      <ProductsTable />
    </>
  )
}

const ProductsTable = async () => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      slug: true,
      _count: { select: { orders: true } },
    },
    orderBy: { created_at: 'desc' },
  })

  if (products.length === 0)
    return (
      <div className='flex flex-col items-center'>
        <p>No products found</p>
      </div>
    )

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead className='w-0'>
            <span className='sr-only'>Actions</span>
          </TableHead>
        </TableRow>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{formatPrice(product.price)}</TableCell>
            <TableCell>{formatNumber(product._count.orders)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className='sr-only'>{product.name} Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <a download href={`/dashboard/products/${product.slug}/download`}>
                      Download
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/products/${product.slug}/edit`}>Edit</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DeleteDropdownItem id={product.id} disabled={product._count.orders > 0} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableHeader>
    </Table>
  )
}
