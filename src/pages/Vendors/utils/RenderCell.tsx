import { Chip, User } from '@nextui-org/react'
import { ContextActions } from '../components/ContextActions'
import { CheckIcon } from '@/components/icons/CheckIcon'
import type { Vendor } from '@/types'
import { currencyFormat } from '@/utils'

interface Props {
  vendor: Vendor
  columnKey: React.Key
}

export const RenderCell: React.FC<Props> = ({ vendor, columnKey }) => {
  if (columnKey === 'actions') {
    return <ContextActions />
  }

  if (columnKey === 'vendor') {
    return (
      <User
        name={vendor.name}
        description={vendor.fullName}
      />
    )
  }

  if (columnKey === 'balance') {
    return (
      <Chip
        variant='flat'
        className='min-w-[100px] text-center text-xs'
        startContent={<CheckIcon size={20} />}
        color={vendor.balance > 0 ? 'warning' : 'success'}
      >
        {currencyFormat(vendor.balance)}
      </Chip>
    )
  }
}
