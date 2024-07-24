import { useState, type ReactNode } from 'react'
import { Button, Tooltip } from '@nextui-org/react'
import { useLocation, useNavigate } from 'react-router-dom'

interface Props {
  label: string
  link: string
  icon?: ReactNode
  isOpen?: boolean
}

export const SideButton: React.FC<Props> = function ({ label, icon, link, isOpen = true }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isHovered, setIsHovered] = useState(false)

  const isActive = location.pathname.includes(link)

  if (icon !== undefined) {
    return (
      <Tooltip
        content={label}
        placement='right'
        className='py-3 px-5 font-semibold'
        color={isActive ? 'primary' : 'default'}
        isOpen={!isOpen && isHovered}
        onOpenChange={(state) => { setIsHovered(state) }}
        closeDelay={0}
        showArrow
      >
        <Button
          size='lg'
          fullWidth
          variant={(isActive) ? 'flat' : 'light'}
          color={isActive ? 'primary' : 'default'}
          startContent={icon}
          onClick={() => { navigate(link) }}
          className={(isOpen) ? 'flex justify-start font-medium text-lg' : ''}
          isIconOnly={!isOpen}
        >
          {(isOpen) && label}
        </Button>
      </Tooltip>
    )
  }
}
