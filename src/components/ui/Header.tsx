import { Divider } from '@nextui-org/react'
import { ReactNode } from 'react'

interface Props {
  title: string
  actionButton?: ReactNode
}

export const Header: React.FC<Props> = function ({ title, actionButton }) {
  return (
    <>
      <header className='flex justify-between items-center p-6'>
        <h1 className='text-3xl text-neutral-700 font-bold'>{title}</h1>
        {actionButton}
      </header>

      <Divider />
    </>
  )
}
