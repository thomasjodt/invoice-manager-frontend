import { Vendor } from '@/types'
import { currencyFormat } from '@/utils'
import { Card, CardHeader, Chip, User } from '@nextui-org/react'
import { Link } from 'react-router-dom'

interface Props {
  vendor: Vendor
}

export const VendorCard: React.FC<Props> = function ({ vendor }) {
  return (
    <Card
      isPressable
      shadow='none'
      className='border'
      as={Link}
      to={vendor.id.toString()}
    >
      <CardHeader className='flex justify-between items-center'>
        <User
          name={vendor.name}
          description={vendor.fullName}
          className='text-start'
        />

        <div className='flex items-center gap-2'>
          <Chip
          className='text-center'
          variant='flat'
          color={vendor.balance > 0 ? 'warning' : 'success'}
        >
          Saldo: {currencyFormat(vendor.balance)}
        </Chip>
        </div>
      </CardHeader>
    </Card>
  )
}
