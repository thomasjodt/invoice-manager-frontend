import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, Pagination, useDisclosure } from '@nextui-org/react'

import type { Invoice } from '@/types'
import { Header } from '@/components/ui'
import { PlusIcon } from '@/components/icons'
import { useInvoicesContext } from '@/context'
import { EditInvoiceModal, FilterBar, InvoicesCard, NewInvoiceModal } from './components'
import { InvoicesApi } from '@/api'

export const Invoices: React.FC = function () {
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [count, setCount] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [invoices, setInvoices] = useState<Invoice[]>([])

  const { getAll } = useInvoicesContext()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const handleCreate = (invoice: Invoice): void => {
    const updatedInvoices = [invoice, ...invoices].filter((_, index) => index < itemsPerPage)
    setInvoices(updatedInvoices)
    setCount(count + 1)
  }

  const handleUpdate = (updated: Invoice): void => {
    const updatedInvoices = invoices.map((invoice) => (invoice.id === updated.id) ? updated : invoice)
    setInvoices(updatedInvoices)
  }

  const handleItems = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setItemsPerPage(Number(e.target.value))
  }

  const handleDelete = (): void => {
    setCount(count - 1)
  }

  const handleSearch = useCallback((vendorId: number) => {
    InvoicesApi.getInvoicesByVendor(vendorId)
      .then(({ data, count }) => {
        setCount(count)
        setInvoices(data)
        setPages(1)
      })
      .catch(console.error)
  }, [])

  const getAllInvoices = useCallback(async (): Promise<void> => {
    const { count: newCount, data } = await getAll(page, itemsPerPage)

    const div = newCount / itemsPerPage
    const extraPage = Number.isInteger(div) ? 0 : 1

    setCount(newCount)
    setInvoices(data)
    setPages(Math.floor(div) + extraPage)
  }, [getAll, itemsPerPage, page])

  useEffect(() => {
    getAllInvoices().catch(console.error)
  }, [page, getAll, itemsPerPage, getAllInvoices])

  return (
    <>
      <NewInvoiceModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        onCreate={handleCreate}
      />

      <EditInvoiceModal handleUpdate={handleUpdate} />

      <Header title='Invoices'>
        <Button
          color='primary'
          onClick={onOpen}
          endContent={<PlusIcon />}
        >
          Create Invoice
        </Button>
      </Header>

      <FilterBar onSearch={handleSearch} />

      <section className='text-neutral-500 text-sm font-semibold flex justify-between mt-3 mx-5'>
        <p>Total {count} invoices</p>
        <div className='flex gap-3 items-center'>
          <p>Invoices per page:</p>
          <select className='border rounded-md p-1' onChange={handleItems}>
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='15'>15</option>
          </select>
        </div>
      </section>

      <Card shadow='none' className='m-5 p-8 gap-3 max-w-xl lg:max-w-4xl mx-auto min-h-[800px] border'>
        {invoices.map((invoice) => (
          <InvoicesCard
            key={invoice.id}
            invoice={invoice}
            onDelete={handleDelete}
          />
        ))}

        {
        (pages > itemsPerPage && page !== 0) && (
          <Pagination
            page={page}
            showControls
            total={pages}
            onChange={setPage}
            className='max-w-fit mx-auto mt-5'
          />
        )
      }
      </Card>
    </>
  )
}

export default Invoices
