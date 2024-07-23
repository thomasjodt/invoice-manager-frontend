import { Divider } from '@nextui-org/react'
import { NavLink } from 'react-router-dom'

import { SideButton } from './SideButton'
import { UserIcon, ReceiptIcon, SunLowIcon, CashIcon } from '@/components/icons'

interface Props {
  brand?: string
}

export const Sidebar: React.FC<Props> = function ({ brand }) {
  return (
    <aside className='border-r border-divider p-4'>
      <section>
        <NavLink to='/' className='p-3 flex gap-4 items-center text-yellow-500'>
          <SunLowIcon size={32} />
          <h3 className='font-semibold text-neutral-800 text-2xl dark:text-neutral-200'>
            {brand}
          </h3>
        </NavLink>
      </section>

      <Divider className='my-8' />

      <section className='flex flex-col gap-1'>
        <SideButton
          link='invoices'
          label='Invoices'
          icon={<ReceiptIcon size={24} />}
        />

        <SideButton
          link='vendors'
          label='Vendors'
          icon={<UserIcon size={24} />}
        />

        <SideButton
          link='payments'
          label='Payments'
          icon={<CashIcon size={24} />}
        />
      </section>
    </aside>
  )
}
