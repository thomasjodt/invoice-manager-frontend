import { useEffect, useState } from 'react'
import { Button, useDisclosure } from '@nextui-org/react'

import { VendorsApi } from '@/api'
import type { Vendor } from '@/types'
import { Header } from '@/components/ui'
import { PlusIcon } from '@/components/icons'
import { NewVendorModal, VendorCard } from './components'

export const Vendors: React.FC = function () {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const { isOpen, onOpenChange, onOpen } = useDisclosure()

  const updateVendors = (vendor: Vendor): void => {
    setVendors([...vendors, vendor])
  }

  const handleUpdate = (vendor: Vendor): void => {
    const updatedVendors = vendors.map(v => {
      return (v.id === vendor.id) ? { ...v, ...vendor } : v
    })
    setVendors(updatedVendors)
  }

  const handleRemove = (vendor: Vendor): void => {
    setVendors(vendors.filter(v => vendor.id !== v.id))
  }

  useEffect(() => {
    (async () => {
      setVendors(await VendorsApi.getVendors())
    })().catch(console.error)
  }, [])

  return (
    <>
      <NewVendorModal
        isOpen={isOpen}
        update={updateVendors}
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
                removeVendor={handleRemove}
                updateVendors={handleUpdate}
              />
            )
            : <p className='mt-32 font-semibold text-neutral-400'>No se encuentran Proveedores</p>
        }
      </section>
    </>
  )
}
