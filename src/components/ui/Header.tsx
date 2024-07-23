import { Divider } from '@nextui-org/react'
import type { ReactNode } from 'react'

interface Props {
  title: string
  children?: ReactNode
}

export const Header: React.FC<Props> = function ({ title, children }) {
  return (
    <>
      <header className='flex justify-between items-center p-6'>
        <h1 className='text-3xl text-neutral-700 dark:text-neutral-200 font-bold'>{title}</h1>
        {children}
      </header>

      <Divider />
    </>
  )
}
