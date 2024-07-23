import { Card, CardHeader } from '@nextui-org/react'

import type { Payment } from '@/types'
import { currencyFormat, dateFormat } from '@/utils'

interface Props {
  payment: Payment
  onEdit?: () => void
  onDelete?: () => void
  onViewDetails?: () => void
}

export const PaymentCard: React.FC<Props> = function ({ payment }) {
  const { amount, id, invoice, paymentDate } = payment

  return (
    <Card key={id} shadow='none' className='py-1 border border-divider dark:bg-zinc-800'>
      <CardHeader className='grid grid-cols-[repeat(3,1fr)_50px] place-items-center text-neutral-700 dark:text-neutral-300'>
        <div className='place-self-start pl-5'>
          <p className='font-semibold'>{invoice.vendor.name}</p>
          <p className='font-semibold text-primary text-xs'>
            {invoice.invoiceNumber}
          </p>
        </div>
        <p className='font-semibold'>{currencyFormat(amount)}</p>
        <p className='font-semibold'>{dateFormat(paymentDate)}</p>
      </CardHeader>
    </Card>
  )
}
