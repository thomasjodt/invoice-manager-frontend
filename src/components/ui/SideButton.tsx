import type { ReactNode } from 'react'
import { Button } from '@nextui-org/react'
import { useLocation, useNavigate } from 'react-router-dom'

interface Props {
  label: string
  link: string
  icon?: ReactNode
}

export const SideButton: React.FC<Props> = function ({ label, icon, link }) {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = location.pathname.includes(link)

  if (icon !== undefined) {
    return (
      <Button
        size='lg'
        fullWidth
        variant={(isActive) ? 'flat' : 'light'}
        color={isActive ? 'primary' : 'default'}
        startContent={icon}
        onClick={() => { navigate(link) }}
        className='flex justify-start font-medium text-lg'
      >
        {label}
      </Button>
    )
  }
}
