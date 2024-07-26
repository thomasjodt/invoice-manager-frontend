import type { ReactNode } from 'react'
// import { Button } from '@nextui-org/react'
// import { BurgerIcon } from '../icons/BurgerIcon'

interface Props {
  title: string
  children?: ReactNode
}

export const Header: React.FC<Props> = function ({ title, children }) {
  return (
    <>
      <header className='flex justify-between items-center p-6 border-b border-divider'>
        <div className='flex gap-2'>
          {/* <Button
            isIconOnly
            variant='light'
            startContent={<BurgerIcon size={32} />}
          /> */}
          <h1 className='text-3xl text-neutral-700 dark:text-neutral-200 font-bold'>{title}</h1>
        </div>
        {children}
      </header>

    </>
  )
}
