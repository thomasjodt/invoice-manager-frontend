import { useEffect, useState } from 'react'
import { Button, Pagination, useDisclosure } from '@nextui-org/react'

import type { Vendor } from '@/types'
import { Header } from '@/components/ui'
import { PlusIcon } from '@/components/icons'
import { FilterBar } from './components/filter'
import { NewVendorModal, VendorCard } from './components'
import { useVendorContext } from './context/VendorContext'

export const Vendors: React.FC = function () {
  const { getAll } = useVendorContext()
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [itemsPerPage/* , setItemsPerPage */] = useState(5)
  const [vendors, setVendors] = useState<Vendor[]>([])
  const { isOpen, onOpenChange, onOpen } = useDisclosure()

  useEffect(() => {
    const getAllVendors = async (): Promise<void> => {
      const { data, count } = await getAll(page, itemsPerPage)

      const div = count / itemsPerPage
      const extraPage = Number.isInteger(div) ? 0 : 1

      setVendors(data)
      setPages(Math.floor(div) + extraPage)
    }

    getAllVendors().catch(console.error)
  }, [page, getAll, itemsPerPage])

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

      <div className='grid h-fit'>
        <FilterBar />
        <section className={
          (vendors.length > 0)
            ? 'grid gap-3 p-5 lg:p-8 2xl:p-15 lg:grid-cols-2 2xl:grid-cols-3'
            : ' flex justify-center items-center'
        }
        >
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
        {
          (pages > 1 && page !== 0) && (
            <Pagination
              page={page}
              showControls
              total={pages}
              onChange={setPage}
              className='max-w-fit mx-auto'
            />
          )
        }
      </div>
    </>
  )
}

export default Vendors
