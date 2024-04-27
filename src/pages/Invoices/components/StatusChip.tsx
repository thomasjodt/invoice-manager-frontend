import { Chip } from '@nextui-org/react'

import { statuses } from '@/data'
import { ContextActions } from '@/components/ui'
import type { Invoice, Status } from '@/types'

interface Props {
  status: Status
  invoice: Invoice
  onDelete?: () => void
  onEdit?: () => void
  onViewDetails?: () => void
  item?: string
}

export const StatusChip: React.FC<Props> = function ({ status, onDelete, onViewDetails, onEdit, item }) {
  return (
    <div className='flex gap-1'>
      <Chip radius='sm' variant='flat' color={statuses[status]} className='min-w-[80px] text-center'>
        {status}
      </Chip>

      <ContextActions
        item={item}
        onEdit={onEdit}
        onViewDetails={onViewDetails}
        onDelete={onDelete}
      />
    </div>
  )
}
