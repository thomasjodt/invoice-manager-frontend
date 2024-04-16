import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from '@nextui-org/react'

import type { Invoice } from '@/types'
import { DeleteIcon, EditIcon, VerticalDotsIcon, FileIcon } from '@/components/icons'
import { useInvoicesContext } from '../context'
import { EditInvoiceModal } from './EditInvoiceModal'

interface Props {
  invoice: Invoice
}

export const ContextActions: React.FC<Props> = function ({ invoice }) {
  const { remove } = useInvoicesContext()

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleDelete = (): void => {
    const confirmed = confirm('¿Estás seguro de eliminar esta factura?')

    if (confirmed) remove(invoice.id)
  }
  return (
    <>
      <EditInvoiceModal isOpen={isOpen} onOpenChange={onOpenChange} invoice={invoice} />
      <div className='relative flex justify-end items-center gap-2'>
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size='sm' variant='light'>
              <VerticalDotsIcon className='text-default-400' />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label='Invoice actions'>
            <DropdownItem startContent={<FileIcon size={18} />}>View details</DropdownItem>
            <DropdownItem
              onPress={onOpen}
              startContent={<EditIcon size={18} />}
            >
                Edit invoice
              </DropdownItem>

            <DropdownItem
              color='danger'
              onPress={handleDelete}
              startContent={<DeleteIcon size={18} />}
            >
              Delete invoice
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  )
}
