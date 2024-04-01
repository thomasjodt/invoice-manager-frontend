import { Chip, User } from '@nextui-org/react'
import { ContextActions } from '../components/ContextActions'
import { CheckIcon } from '@/components/icons/CheckIcon'
import { Vendor } from '@/types'

interface Props {
  vendor: Vendor
  columnKey: React.Key
}

export const RenderCell: React.FC<Props> = ({ vendor, columnKey }) => {
  const currencyFormat = (amount: number) => {
    const formatter = new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    })
    return formatter.format(amount)
  }

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