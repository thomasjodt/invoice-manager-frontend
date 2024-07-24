import { NavLink } from 'react-router-dom'

import { SideButton } from './SideButton'
import { UserIcon, ReceiptIcon, SunLowIcon, CashIcon } from '@/components/icons'

interface Props {
  brand?: string
  isOpen?: boolean
}

export const Sidebar: React.FC<Props> = function ({ brand, isOpen }) {
  return (
    <aside className='border-r border-divider grid grid-rows-[100px_1fr]'>
      <section className='flex items-center justify-center border-b border-divider'>
        <NavLink to='/' className='p-3 flex gap-4 items-center text-yellow-500'>
          <SunLowIcon size={32} />
          <h3 className='font-semibold text-neutral-800 text-2xl dark:text-neutral-200'>
            {(isOpen === true) && brand}
          </h3>
        </NavLink>
      </section>

      <section className={`flex flex-col gap-1 pt-6 px-2 ${(isOpen === true) ? 'items-start' : 'items-center'}`}>
        <SideButton
          link='invoices'
          label='Invoices'
          isOpen={isOpen}
          icon={<ReceiptIcon size={24} />}
        />

        <SideButton
          link='vendors'
          label='Vendors'
          isOpen={isOpen}
          icon={<UserIcon size={24} />}
        />

        <SideButton
          link='payments'
          label='Payments'
          isOpen={isOpen}
          icon={<CashIcon size={24} />}
        />
      </section>
    </aside>
  )
}
