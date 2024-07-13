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
import { VendorTag } from '@/components/ui'
import { useVendorContext } from '@/context'

interface Props {
  isPopoverOpen: boolean
  togglePopover: (value: boolean) => void
  vendor: Vendor
}

export const DeletePopover: React.FC<Props> = function ({ isPopoverOpen, togglePopover, vendor }) {
  const { remove } = useVendorContext()

  return (
    <Popover
      backdrop='blur'
      isOpen={isPopoverOpen}
      onOpenChange={() => { togglePopover(true) }}
    >
      <PopoverTrigger>
        <Button color='danger' variant='light'>Delete vendor</Button>
      </PopoverTrigger>

      <PopoverContent>
        <Card shadow='none'>
          <CardHeader>
            <h3 className='font-bold'>Are you sure to delete this item?</h3>
          </CardHeader>

          <CardBody>
            <VendorTag vendor={vendor} />
          </CardBody>

          <CardFooter className='flex justify-between gap-5'>
            <Button
              variant='light'
              color='default'
              onClick={() => { togglePopover(false) }}
            >
              Cancel
            </Button>
            <Button
              color='danger'
              variant='solid'
              onClick={() => { remove(vendor.id).catch(console.error) }}
            >
              Delete vendor
            </Button>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
