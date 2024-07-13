import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'

import type { Invoice } from '@/types'
import { columns } from './columns'
import { getDays, getStatus, currencyFormat, dateFormat } from '@/utils'
import { VendorTag } from '@/components/ui'
import { VerticalDotsIcon } from '@/components/icons'
import { StatusChip } from '../StatusChip'

interface Props {
  invoices: Invoice[]
}

export const InvoicesTable: React.FC<Props> = function ({ invoices }) {
  return (
    <Table aria-label='Table to show the invoices' isCompact removeWrapper className='border rounded-xl bg-white' classNames={{ th: 'bg-transparent border-b border-divider' }}>
      <TableHeader columns={columns}>
        {({ key, label }) => (
          <TableColumn key={key} align='center'>
            {label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody items={invoices}>
        {({ amount, dueDate, emissionDate, id, invoiceNumber, payments, vendor }) => {
          const balance = amount - payments.reduce((a, b) => a + b.amount, 0)
          const days = getDays(emissionDate, dueDate)
          const status = getStatus(new Date(dueDate + 'T00:00'), balance)

          return (
            <TableRow key={id} className='border-b border-divider last:border-none'>
              <TableCell>
                <VendorTag vendor={vendor} />
              </TableCell>

              <TableCell>
                <p className='text-primary font-semibold'>{invoiceNumber}</p>
              </TableCell>

              <TableCell>
                <p className='text-neutral-600'>{currencyFormat(amount)}</p>
              </TableCell>

              <TableCell>
                <p className='text-neutral-500 text-xs text-center'>{dateFormat(emissionDate)}</p>
              </TableCell>

              <TableCell>
                <p className='text-neutral-500 text-xs text-center'>{dateFormat(dueDate)}</p>
              </TableCell>

              <TableCell>
                {days}
              </TableCell>

              <TableCell>
                <StatusChip status={status} />
              </TableCell>

              <TableCell>
                <p className='font-semibold text-neutral-600'>{currencyFormat(balance)}</p>
              </TableCell>

              <TableCell>
                <Button isIconOnly variant='light' className='text-neutral-400 '>
                  <VerticalDotsIcon />
                </Button>
              </TableCell>
            </TableRow>
          )
        }}
      </TableBody>
    </Table>
  )
}
