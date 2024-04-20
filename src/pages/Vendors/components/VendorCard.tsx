import { VendorTag } from '@/components/ui'
import type { Vendor } from '@/types'
import { currencyFormat } from '@/utils'
import { Card, CardHeader, Chip, useDisclosure } from '@nextui-org/react'
import { EditVendorModal } from './EditVendorModal'

interface Props {
  vendor: Vendor
}

export const VendorCard: React.FC<Props> = function ({ vendor }) {
  const { onOpen, isOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <EditVendorModal
        vendor={vendor}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />

      <Card
      isPressable
      shadow='none'
      className='border'
      onPress={onOpen}
    >
      <CardHeader className='flex justify-between items-center'>
        <VendorTag vendor={vendor} />

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
    </>
  )
}
