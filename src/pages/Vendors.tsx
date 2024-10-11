import { useCallback, useEffect, useState } from 'react'
import { Button, Card, Pagination, useDisclosure } from '@nextui-org/react'

import type { Vendor } from '@/types'
import { useVendors } from '@/hooks'
import { PlusIcon } from '@/components/icons'
import { Header, ShowItems } from '@/components/ui'
import { FilterBar } from '../app/vendors/components/filter'
import { NewVendorModal, VendorCard } from '../app/vendors/components'

export const Vendors: React.FC = function () {
  const { getAllVendors, getVendorByName } = useVendors()
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const { isOpen, onOpenChange, onOpen } = useDisclosure()

  const [vendors, setVendors] = useState<Vendor[]>([])
  const [count, setCount] = useState(0)
  const [isFiltered, setIsFiltered] = useState(false)

  const getVendors = useCallback(async (): Promise<void> => {
    const { data, count } = await getAllVendors(page, itemsPerPage)

    const div = count / itemsPerPage
    const extraPage = Number.isInteger(div) ? 0 : 1

    setPages(Math.floor(div) + extraPage)

    if (pages < page) setPage(pages)
    setVendors(data)
    setCount(count)
  }, [getAllVendors, itemsPerPage, page, pages])

  const handleSearch = useCallback((name: string): void => {
    if (name === '') {
      setIsFiltered(false)
      getVendors().catch(console.error)
      return
    }
    if (name.trim() === '') return

    getVendorByName(name, page, itemsPerPage)
      .then((res) => {
        setIsFiltered(true)
        const div = res.count / itemsPerPage
        const extraPage = Number.isInteger(div) ? 0 : 1

        setVendors(res.data)
        setCount(res.count)
        setPages(Math.floor(div) + extraPage)
      })
      .catch(console.error)
  }, [page, itemsPerPage, getVendorByName, getVendors])

  useEffect(() => {
    if (!isFiltered) {
      getVendors().catch(console.error)
    }
  }, [getVendors, isFiltered])

  return (
    <>
      <NewVendorModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />

      <Header title='Proveedores'>
        <Button color='primary' variant='solid' onClick={onOpen}>
          Agregar proveedor
          <PlusIcon size={18} />
        </Button>
      </Header>

      <div>
        <FilterBar onSearch={handleSearch} />

        <div className='max-w-xl lg:max-w-4xl mx-auto'>
          {(count > 0) && (
            <div className='text-neutral-500 dark:text-white font-semibold text-sm mx-5 my-4 flex justify-between'>
              <p>Total: {count} proveedores</p>

              <div className='flex items-center gap-3'>
                <p>Proveedores por página</p>
                <ShowItems onChange={setItemsPerPage} />
              </div>
            </div>
          )}
          <Card
            shadow='none'
            className={
              (vendors.length > 0)
                ? 'gap-3 p-5 lg:p-8 2xl:p-15 min-h-[500px] justify-between mt-5 border-divider border'
                : ' flex justify-center items-center min-h-[500px] mt-5 border-divider border'
            }
          >
            <div className='flex flex-col gap-1'>
              {
                (vendors.length > 0)
                  ? vendors.map(vendor =>
                    <VendorCard
                      key={vendor.id}
                      vendor={vendor}
                    />
                  )
                  : <p className='font-semibold text-default-400'>No se encuentran Proveedores</p>
              }
            </div>

            {
              (pages > 1 && page !== 0 && count > itemsPerPage) && (
                <Pagination
                  page={page}
                  showControls
                  total={pages}
                  onChange={setPage}
                  className='max-w-fit mx-auto'
                />
              )
            }
          </Card>
        </div>

      </div>
    </>
  )
}

export default Vendors
