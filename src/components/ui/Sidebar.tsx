import { Divider } from '@nextui-org/react'
import { NavLink } from 'react-router-dom'

import { SideButton } from './SideButton'
import { UserIcon, ReceiptIcon, SunLowIcon, CashIcon } from '@/components/icons'

export const Sidebar: React.FC = function () {
  return (
    <aside className='border-r p-4'>
      <section>
        <NavLink to='/' className='p-3 flex gap-4 items-center text-yellow-500'>
          <SunLowIcon size={32} />
          <h3 className='font-semibold text-neutral-800 text-2xl'>
            Intifarma
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
