import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, Pagination, useDisclosure } from '@nextui-org/react'

import type { Invoice } from '@/types'
import { Header, ShowItems } from '@/components/ui'
import { PlusIcon } from '@/components/icons'
import { useInvoicesContext, usePaymentsContext } from '@/context'
import { EditInvoiceModal, FilterBar, InvoicesCard, NewInvoiceModal } from './components'

export const Invoices: React.FC = function () {
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [count, setCount] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isFiltered, setIsFiltered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { current, getAll, getByVendor, remove, update, populateEditing, getOne } = useInvoicesContext()
  const { remove: removePayments } = usePaymentsContext()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const handleCreate = (invoice: Invoice): void => {
    const updatedInvoices = [invoice, ...invoices].filter((_, index) => index < itemsPerPage)
    setInvoices(updatedInvoices)
    setCount(count + 1)
  }

  const handleEdit = (invoice: Invoice): void => {
    if (current === null) return

    update(invoice)
      .then(() => {
        closeModal()
        setInvoices(invoices.map(
          (i) => (i.id === invoice.id) ? invoice : i)
        )
      }).catch(console.error)
  }

  const handleDelete = (invoiceId: number) => {
    return () => {
      getOne(invoiceId)
        .then(i => {
          i.payments.forEach(payment => {
            removePayments(payment.id).catch(console.error)
          })
        })
        .then(() => {
          remove(invoiceId)
            .then(() => {
              handleSearch()
            }).catch(console.error)
        })
        .catch(console.error)
    }
  }

  const handleEditModal = (invoice: Invoice): void => {
    populateEditing(invoice)
    setIsModalOpen(true)
  }

  const closeModal = (): void => {
    setIsModalOpen(false)
  }

  const getAllInvoices = useCallback(async (): Promise<void> => {
    const { count: newCount, data } = await getAll(page, itemsPerPage)

    const div = newCount / itemsPerPage
    const extraPage = Number.isInteger(div) ? 0 : 1

    setCount(newCount)
    setInvoices(data)
    setPages(Math.floor(div) + extraPage)
  }, [getAll, itemsPerPage, page])

  const handleSearch = useCallback((vendorId?: number) => {
    if (vendorId === undefined || vendorId <= 0) {
      setIsFiltered(false)
      getAllInvoices().catch(console.error)
      return
    }

    getByVendor(vendorId, page, itemsPerPage)
      .then((res) => {
        setIsFiltered(true)
        const div = res.count / itemsPerPage
        const extraPage = Number.isInteger(div) ? 0 : 1

        setInvoices(res.data)
        setCount(res.count)
        setPages(Math.floor(div) + extraPage)
      })
      .catch(console.error)
  }, [getByVendor, page, itemsPerPage, getAllInvoices])

  useEffect(() => {
    if (!isFiltered) {
      getAllInvoices().catch(console.error)
    }
  }, [getAllInvoices, isFiltered])

  return (
    <>
      <NewInvoiceModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        onCreate={handleCreate}
      />

      {(isModalOpen) && <EditInvoiceModal onUpdate={handleEdit} isModalOpen={isModalOpen} onCloseModal={closeModal} />}

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

      <div className='max-w-xl lg:max-w-4xl mx-auto'>
        <section className='text-neutral-500 text-sm font-semibold flex justify-between mt-3 mx-5'>
          <p>Total {count} invoices</p>
          <div className='flex gap-3 items-center'>
            <p>Invoices per page:</p>
            <ShowItems onChange={setItemsPerPage} />
          </div>
        </section>

        <Card shadow='none' className='m-5 p-8 gap-3 max-w-xl lg:max-w-4xl mx-auto min-h-[800px] border'>
          {invoices.map((invoice) => (
            <InvoicesCard
              item='invoice'
              key={invoice.id}
              invoice={invoice}
              onEdit={() => { handleEditModal(invoice) }}
              onDelete={handleDelete(invoice.id)}
            />
          ))}

          {
            (pages > 1 && page !== 0 && count > itemsPerPage) && (
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
      </div>
    </>
  )
}

export default Invoices
