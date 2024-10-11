import { NavLink } from 'react-router-dom'

import { SideButton } from '.'
import { useAppSettings } from '@/hooks'
import { UserIcon, ReceiptIcon, SunLowIcon, CashIcon, MoonIcon } from '@/components/icons'

interface Props {
  brand?: string
  isOpen?: boolean
}

export const Sidebar: React.FC<Props> = function ({ brand, isOpen }) {
  const { isDark, toggleTheme } = useAppSettings()

  return (
    <aside className='border-r border-divider grid grid-rows-[100px_1fr]'>
      <section className='flex items-center justify-center border-b border-divider'>
        <NavLink to='/' className='p-3 flex gap-4 items-center text-yellow-500'>
          <SunLowIcon size={32} />
          {(isOpen === true) && (
            <h3 className='font-semibold text-neutral-800 text-2xl dark:text-neutral-200'>
              {brand}
            </h3>
          )}
        </NavLink>
      </section>

      <section className={`flex flex-col py-6 px-2 justify-between ${(isOpen === true) ? 'items-start' : 'items-center'}`}>
        <div className='flex flex-col gap-1 w-full items-center'>
          <SideButton
            link='invoices'
            label='Facturas'
            isOpen={isOpen}
            icon={<ReceiptIcon size={24} />}
          />

          <SideButton
            link='vendors'
            label='Proveedores'
            isOpen={isOpen}
            icon={<UserIcon size={24} />}
          />

          <SideButton
            link='payments'
            label='Pagos'
            isOpen={isOpen}
            icon={<CashIcon size={24} />}
          />
        </div>

        <div className='flex flex-col gap-1 w-full items-center'>
          <SideButton
            label={`Tema ${(isDark) ? 'Claro' : 'Oscuro'} `}
            isOpen={isOpen}
            icon={(isDark) ? <SunLowIcon /> : <MoonIcon />}
            onClick={toggleTheme}
          />
        </div>
      </section>
    </aside>
  )
}
