import { Button, TableCell, TableRow } from '@nextui-org/react'

import { VendorTag } from '@/components/ui'
import { VerticalDotsIcon } from '@/components/icons'
import type { Invoice } from '@/types'
import { getDays, getStatus } from '@/utils'

interface Props {
  invoice: Invoice
}

export const InvoiceRow: React.FC<Props> = function ({ invoice }) {
  const balance = 1
  const days = getDays(invoice.emissionDate, invoice.dueDate)
  const status = getStatus(new Date(invoice.dueDate + 'T00:00'), balance)

  return (
    <TableRow key={invoice.id}>
      <TableCell>
        <VendorTag vendor={invoice.vendor} />
      </TableCell>
      <TableCell>{invoice.invoiceNumber}</TableCell>
      <TableCell>{invoice.amount}</TableCell>
      <TableCell>{invoice.emissionDate}</TableCell>
      <TableCell>{invoice.dueDate}</TableCell>
      <TableCell>{days}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>{balance}</TableCell>
      <TableCell>
        <Button isIconOnly variant='light'>
          <VerticalDotsIcon />
        </Button>
      </TableCell>
    </TableRow>
  )
}
