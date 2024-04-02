import axios from 'axios'
import { Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'

import type { Vendor } from '@/types'
import { PlusIcon } from '@/components/icons'
import { Header } from '@/components/ui'
import { VendorCard } from './components'

const url = 'http://localhost:8080/invoices/api/vendors/balance'

export const Vendors: React.FC = function () {
  const [vendors, setVendors] = useState<Vendor[]>([])

  useEffect(() => {
    const getUsers = async (): Promise<void> => {
      const { data, status } = await axios.get<Vendor[]>(url)

      if (status !== 200) {
        throw new Error('Hubo un error al conseguir los proveedores.')
      }

      setVendors(data)
    }

    getUsers()
      .catch(console.error)
  }, [])

  return (
    <>
      <Header
        title='Vendors'
        actionButton={
          <Button color='primary' variant='solid'>
            Add Vendor
            <PlusIcon size={18} />
          </Button>
        }
      />
      <section className={
        (vendors.length > 0)
        ? 'grid gap-3 p-5 lg:p-8 2xl:p-15 lg:grid-cols-2 2xl:grid-cols-3'
        : ' flex justify-center items-center'
      }>
        {
          (vendors.length > 0)
            ? vendors.map(vendor => <VendorCard key={vendor.id} vendor={vendor} />)
            : <p className='mt-32 font-semibold text-neutral-400'>No se encuentran Proveedores</p>
        }
      </section>
    </>
  )
}
