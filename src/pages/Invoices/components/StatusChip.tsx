import { statuses } from '@/data'
import type { Status } from '@/types'
import { Chip } from '@nextui-org/react'

interface Props {
  status: Status
}

export const StatusChip: React.FC<Props> = function ({ status }) {
  const color = statuses[status]

  return (
    <Chip radius='sm' variant='flat' color={color} className={`border min-w-[80px] text-center`}>
      {status}
    </Chip>
  )
}
