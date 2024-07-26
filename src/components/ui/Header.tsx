import type { ReactNode } from 'react'
import { Button } from '@nextui-org/react'
import { BurgerIcon } from '../icons/BurgerIcon'
import { useAppContext } from '@/context'

interface Props {
  title: string
  children?: ReactNode
}

export const Header: React.FC<Props> = function ({ title, children }) {
  const { toggleSidebar } = useAppContext()

  return (
    <>
      <header className='flex justify-between items-center p-6 border-b border-divider'>
        <div className='flex gap-2'>
          <Button
            isIconOnly
            variant='light'
            startContent={<BurgerIcon size={32} />}
            onPress={toggleSidebar}
          />
          <h1 className='text-3xl text-neutral-700 dark:text-neutral-200 font-bold'>{title}</h1>
        </div>
        {children}
      </header>

    </>
  )
}
