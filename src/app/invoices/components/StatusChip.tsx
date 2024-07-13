import { Chip } from '@nextui-org/react'

import { statuses } from '@/data'
import type { Status } from '@/types'

interface Props {
  status: Status
}

export const StatusChip: React.FC<Props> = function ({ status }) {
  return (
    <Chip radius='sm' variant='flat' color={statuses[status]} className='min-w-[80px] text-center'>
      {status}
    </Chip>
  )
}
