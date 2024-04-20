import { Button, Pagination, useDisclosure } from '@nextui-org/react'

import { Header } from '@/components/ui'
import { PlusIcon } from '@/components/icons'
import { NewVendorModal, VendorCard } from './components'
import { useVendorContext } from './context/VendorContext'
import { FilterBar } from './components/filter'
import { useEffect, useState } from 'react'

export const Vendors: React.FC = function () {
  const { vendors, getAll } = useVendorContext()
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const { isOpen, onOpenChange, onOpen } = useDisclosure()

  useEffect(() => {
    const getAllVendors = async (): Promise<void> => {
      const response = await getAll(page)
      const div = response.count / 5
      const extraPage = Number.isInteger(div) ? 0 : 1
      setPages(Math.floor(div) + extraPage)
    }

    getAllVendors().catch(console.error)
  }, [page])

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
