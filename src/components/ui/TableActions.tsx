import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { DeleteIcon, VerticalDotsIcon, FileIcon, CashIcon } from '@/components/icons'

interface Props {
  item?: string
  onDelete?: () => void
  onViewDetails?: () => void
}

export const TableActions: React.FC<Props> = function ({ onDelete, onViewDetails, item }) {
  return (
    <Dropdown classNames={{ content: 'rounded-md' }}>
      <DropdownTrigger>
        <Button isIconOnly size='sm' variant='light'>
          <VerticalDotsIcon className='text-default-400 dark:text-neutral-400' />
        </Button>
      </DropdownTrigger>

      <DropdownMenu aria-label='Invoice actions' className='dark:text-neutral-200' disabledKeys={['pay']}>
        <DropdownItem
          key='pay'
          textValue='View details'
          onPress={onViewDetails}
          startContent={<CashIcon size={18} />}
          className='rounded-md'
        >
          Make a payment
        </DropdownItem>

        <DropdownItem
          key='view'
          textValue='View details'
          onPress={onViewDetails}
          startContent={<FileIcon size={18} />}
          className='rounded-md'
        >
          View details
        </DropdownItem>

        <DropdownItem
          key='delete'
          color='danger'
          textValue='Delete'
          onPress={onDelete}
          startContent={<DeleteIcon size={18} />}
          className='rounded-md'
        >
          Delete {item}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
