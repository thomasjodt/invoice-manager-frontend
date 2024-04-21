import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'

import type { Invoice } from '@/types'
import { DeleteIcon, EditIcon, VerticalDotsIcon, FileIcon } from '@/components/icons'
import { useInvoicesContext } from '@/context'

interface Props {
  invoice: Invoice
  onDelete: (invoiceId: number) => void
}

export const ContextActions: React.FC<Props> = function ({ invoice, onDelete }) {
  const { remove, populateEditing } = useInvoicesContext()

  const handleDelete = (): void => {
    if (invoice === undefined) return
    const confirmed = confirm('¿Estás seguro de eliminar esta factura?')
    if (confirmed) {
      remove(invoice.id).catch(console.error)
      onDelete(invoice.id)
    }
  }

  const handleEdit = (): void => {
    populateEditing(invoice)
  }

  return (
    <>
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
              onPress={handleEdit}
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
