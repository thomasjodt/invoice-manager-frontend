import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@nextui-org/react'

import type { Vendor } from '@/types'
import { useVendors } from '@/hooks'
import { VendorTag } from '@/components/ui'

interface Props {
  isPopoverOpen: boolean
  togglePopover: (value: boolean) => void
  vendor: Vendor
}

export const DeletePopover: React.FC<Props> = function ({ isPopoverOpen, togglePopover, vendor }) {
  const { deleteVendor } = useVendors()

  const closePopover = (): void => {
    togglePopover(false)
  }

  const handleDelete = (vendorId: number) => {
    return () => {
      deleteVendor(vendorId)
        .then(closePopover)
        .catch(console.error)
    }
  }

  return (
    <Popover
      backdrop='blur'
      isOpen={isPopoverOpen}
      onOpenChange={() => { togglePopover(true) }}
    >
      <PopoverTrigger>
        <Button color='danger' variant='light'>Eliminar proveedor</Button>
      </PopoverTrigger>

      <PopoverContent>
        <Card shadow='none'>
          <CardHeader>
            <h3 className='font-bold text-default-900'>Estás seguro de eliminar este elemento?</h3>
          </CardHeader>

          <CardBody>
            <VendorTag vendor={vendor} />
          </CardBody>

          <CardFooter className='flex justify-between gap-5'>
            <Button
              variant='light'
              color='default'
              onClick={closePopover}
            >
              Cancelar
            </Button>
            <Button
              color='danger'
              variant='solid'
              onClick={handleDelete(vendor.id)}
            >
              Eliminar
            </Button>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
