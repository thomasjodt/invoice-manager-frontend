import { useMemo } from 'react'
import { Card, CardHeader, Checkbox } from '@nextui-org/react'

import { type Invoice } from '@/types'
import { currencyFormat, dateFormat } from '@/utils'
import { getDays, getStatus } from '../utils'
import { StatusChip } from './StatusChip'
import { VendorTag } from '@/components/ui'

interface Props {
  invoice: Invoice
}

export const InvoiceListItem: React.FC<Props> = function ({ invoice }) {
  const { vendor, invoiceNumber, emissionDate, dueDate, payments, amount } = invoice

  const paid = useMemo(() => payments.reduce(
    (paid, payment) => paid + payment.amount,
    0
  ), [payments])

  const days = getDays(emissionDate, dueDate)
  const balance = amount - paid
  const status = getStatus(new Date(dueDate + 'T00:00'), balance)

  return (
    <Card shadow='none' className='border'>
      <CardHeader className='grid grid-cols-[36px_repeat(9,_1fr)] place-items-center'>
        <Checkbox className='justify-self-start' />
        <VendorTag vendor={vendor} />

        <p className='font-semibold text-primary'>{invoiceNumber}</p>
        <p className='text-neutral-600'>{dateFormat(emissionDate)}</p>
        <p className='text-neutral-600'>{dateFormat(dueDate)}</p>
        <p>{days}</p>
        <StatusChip status={status} />
        <p>{currencyFormat(amount)}</p>
        <p>{currencyFormat(paid)}</p>
        <p>{currencyFormat(balance)}</p>
      </CardHeader>
    </Card>
  )
}
