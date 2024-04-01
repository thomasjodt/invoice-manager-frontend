import { VerticalDotsIcon } from '@/components/icons'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'

export const ContextActions: React.FC = function () {
  return (
    <div className="relative flex justify-end items-center gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <VerticalDotsIcon className="text-default-300" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem>View</DropdownItem>
              <DropdownItem>Edit</DropdownItem>
              <DropdownItem color='danger'>Delete</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
  )
}
