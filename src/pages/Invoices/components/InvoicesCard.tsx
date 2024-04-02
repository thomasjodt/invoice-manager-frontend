import { Card, CardHeader, Chip, User } from '@nextui-org/react'

import { Invoice } from '@/types'
import { currencyFormat, dateFormat } from '@/utils'
import { getStatus } from '../utils/getStatus'
import { statuses } from '@/data'

interface Props {
  invoice: Invoice
}

export const InvoicesCard: React.FC<Props> = function ({ invoice }) {
  const paid = invoice.payments.reduce((amount, current) => amount + current.amount, 0)
  const balance = invoice.amount - paid
  const status = getStatus(new Date(invoice.dueDate + 'T00:00'), balance)

  return (
    <Card shadow='none' className='border' isPressable>
      <CardHeader>
        <div className='grid grid-cols-8 items-center font-semibold place-items-center w-full'>
          <User
            name={invoice.vendor.name}
            description={invoice.vendor.fullName}
            className='text-start place-self-start font-normal'
          />

          <p className='text-sm text-primary-500 font-bold'>{invoice.invoiceNumber}</p>
          <Chip
            color={statuses[status]}
            variant='flat'
            radius='sm'
            className={`min-w-[80px] text-center border border-${statuses[status]}-200`}
          >
            {status}
          </Chip>
          <p className='text-xs'>{dateFormat(invoice.emissionDate)}</p>
          <p className='text-xs'>{dateFormat(invoice.dueDate)}</p>
          <p className='text-xs'>{currencyFormat(invoice.amount)}</p>
          <p className='text-xs'>{currencyFormat(paid)}</p>
          <p className='text-xs'>{currencyFormat(balance)}</p>
        </div>
      </CardHeader>
    </Card>
  )
}
