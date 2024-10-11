import { Chip } from '@nextui-org/react'

import { statuses } from '@/data'
import type { Status } from '@/types'

interface Props {
  status: Status
}

export const StatusChip: React.FC<Props> = function ({ status }) {
  const border: Record<Status, string> = {
    paid: 'border-success-200',
    overdue: 'border-danger-200',
    pending: 'border-warning-200'
  }

  const translatedStatuses: Record<Status, string> = {
    overdue: 'Vencido',
    paid: 'Pagado',
    pending: 'Pendiente'
  }

  return (
    <Chip radius='sm' variant='flat' color={statuses[status]} className={`min-w-[80px] text-center border ${border[status]}`}>
      {translatedStatuses[status]}
    </Chip>
  )
}
