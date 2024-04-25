import { useCallback, useEffect, useState } from 'react'
import { Button, Card, Pagination, useDisclosure } from '@nextui-org/react'

import { Header } from '@/components/ui'
import { useVendorContext } from '@/context'
import { PlusIcon } from '@/components/icons'
import { FilterBar } from './components/filter'
import type { Vendor } from '@/types'
import { NewVendorModal, VendorCard } from './components'

export const Vendors: React.FC = function () {
  const { getAll, getByName } = useVendorContext()
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const { isOpen, onOpenChange, onOpen } = useDisclosure()

  const [vendors, setVendors] = useState<Vendor[]>([])
  const [count, setCount] = useState(0)
  const [isFiltered, setIsFiltered] = useState(false)

  const getAllVendors = useCallback(async (): Promise<void> => {
    const { data, count } = await getAll(page, itemsPerPage)

    const div = count / itemsPerPage
    const extraPage = Number.isInteger(div) ? 0 : 1

    setPages(Math.floor(div) + extraPage)
    setVendors(data)
    setCount(count)
  }, [getAll, itemsPerPage, page])

  const handleSearch = useCallback((name: string): void => {
    if (name === '') {
      setIsFiltered(false)
      getAllVendors().catch(console.error)
      return
    }
    if (name.trim() === '') return

    getByName(name, page, itemsPerPage)
      .then((res) => {
        setIsFiltered(true)
        const div = res.count / itemsPerPage
        const extraPage = Number.isInteger(div) ? 0 : 1

        setVendors(res.data)
        setCount(res.count)
        setPages(Math.floor(div) + extraPage)
      })
      .catch(console.error)
  }, [page, itemsPerPage, getByName, getAllVendors])

  useEffect(() => {
    if (!isFiltered) {
      getAllVendors().catch(console.error)
    }
  }, [getAllVendors, isFiltered])

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

      <div>
        <FilterBar onSearch={handleSearch} />

        <div className='max-w-xl lg:max-w-4xl mx-auto'>
          {(count > 0) && (
            <div className='text-neutral-500 font-semibold text-sm mx-5 my-4 flex justify-between'>
              <p>Total {count} vendors</p>

              <div className='flex items-center gap-3'>
                <p>Vendors per page</p>
                <select onChange={(e) => { setItemsPerPage(Number(e.target.value)) }} className='border rounded-md p-1'>
                  <option value='5'>5</option>
                  <option value='10'>10</option>
                  <option value='15'>15</option>
                </select>
              </div>
            </div>
          )}
          <Card
            shadow='none' className={
              (vendors.length > 0)
                ? 'gap-3 p-5 lg:p-8 2xl:p-15 border min-h-[500px] justify-between mt-5'
                : ' flex justify-center items-center min-h-[500px] mt-5'
            }
          >
            <div className='flex flex-col gap-3'>
              {
                (vendors.length > 0)
                  ? vendors.map(vendor =>
                    <VendorCard
                      key={vendor.id}
                      vendor={vendor}
                    />
                  )
                  : <p className='font-semibold text-neutral-400'>No se encuentran Proveedores</p>
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
