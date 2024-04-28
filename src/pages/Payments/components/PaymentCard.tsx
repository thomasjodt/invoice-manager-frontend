import { Card, CardHeader } from '@nextui-org/react'

import type { FullPayment } from '@/types'
import { currencyFormat, dateFormat } from '@/utils'
import { ContextActions } from '@/components/ui'

interface Props {
  payment: FullPayment
  onEdit?: () => void
  onDelete?: () => void
  onViewDetails?: () => void
}

export const PaymentCard: React.FC<Props> = function ({ payment, onDelete, onEdit, onViewDetails }) {
  const { amount, id, invoice, paymentDate } = payment

  return (
    <Card key={id} shadow='sm' className='py-1'>
      <CardHeader className='grid grid-cols-[repeat(3,1fr)_50px] place-items-center text-neutral-700'>
        <div className='place-self-start pl-5'>
          <p className='font-semibold'>{invoice.vendor.name}</p>
          <p className='font-semibold text-primary text-xs'>
            {invoice.invoiceNumber}
          </p>
        </div>
        <p className='font-semibold'>{currencyFormat(amount)}</p>
        <p className='font-semibold'>{dateFormat(paymentDate)}</p>
        <ContextActions
          item='payment'
          onDelete={onDelete}
          onEdit={onEdit}
          onViewDetails={onViewDetails}
        />
      </CardHeader>
    </Card>
  )
}
