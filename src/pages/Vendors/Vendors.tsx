import { Button, useDisclosure } from '@nextui-org/react'

import { Header } from '@/components/ui'
import { PlusIcon } from '@/components/icons'
import { NewVendorModal, VendorCard } from './components'
import { useVendorContext } from './context/VendorContext'

export const Vendors: React.FC = function () {
  const { vendors } = useVendorContext()
  const { isOpen, onOpenChange, onOpen } = useDisclosure()

  return (
    <>
      <NewVendorModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />

      <Header title='Vendors'>
        <Button color='primary' variant='solid' onClick={onOpen}>
          Add Vendor
          <PlusIcon size={18} />
        </Button>
      </Header>

      <section className={
        (vendors.length > 0)
          ? 'grid gap-3 p-5 lg:p-8 2xl:p-15 lg:grid-cols-2 2xl:grid-cols-3'
          : ' flex justify-center items-center'
      }>
        {
          (vendors.length > 0)
            ? vendors.map(vendor =>
              <VendorCard
                key={vendor.id}
                vendor={vendor}
              />
            )
            : <p className='mt-32 font-semibold text-neutral-400'>No se encuentran Proveedores</p>
        }
      </section>
    </>
  )
}
