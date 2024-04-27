import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { DeleteIcon, EditIcon, VerticalDotsIcon, FileIcon } from '@/components/icons'

interface Props {
  item?: string
  onDelete?: () => void
  onEdit?: () => void
  onViewDetails?: () => void
}

export const ContextActions: React.FC<Props> = function ({ onDelete, onEdit, onViewDetails, item }) {
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
            <DropdownItem
              onPress={onViewDetails}
              startContent={<FileIcon size={18} />}
            >
              View details
            </DropdownItem>
            <DropdownItem
              onPress={onEdit}
              startContent={<EditIcon size={18} />}
            >
              Edit {item}
            </DropdownItem>

            <DropdownItem
              color='danger'
              onPress={onDelete}
              startContent={<DeleteIcon size={18} />}
            >
              Delete {item}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  )
}
