import { Chip } from '@nextui-org/react'

import { statuses } from '@/data'
import { ContextActions } from './ContextActions'
import type { Invoice, Status } from '@/types'

interface Props {
  status: Status
  invoice: Invoice
  onDelete: (invoiceId: number) => void
}

export const StatusChip: React.FC<Props> = function ({ status, invoice, onDelete }) {
  return (
    <div className='flex gap-1'>
      <Chip radius='sm' variant='flat' color={statuses[status]} className='min-w-[80px] text-center'>
        {status}
      </Chip>

      <ContextActions
        invoice={invoice}
        onDelete={onDelete}
      />
    </div>
  )
}
