import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Pagination } from '@nextui-org/react'

import { PlusIcon } from '@/components/icons'
import { Header, ShowItems } from '@/components/ui'
import { InvoicesTable } from '../app/invoices/components/table/InvoicesTable'
import { EditInvoiceModal, FilterBar, NewInvoiceModal } from '../app/invoices/components'
import { useInvoicesActions } from '@/app/invoices/hooks/useInvoicesActions'
import { type Invoice } from '@/types'

export const Invoices: React.FC = function () {
  const [searchParams] = useSearchParams()
  const [isVisible, setIsVisible] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | undefined>()

  const {
    page,
    count,
    pages,
    invoices,
    numberOfItems,
    changePage,
    getInvoices,
    removeInvoice,
    changeNumberOfItems
  } = useInvoicesActions()

  const handleView = (invoice: Invoice): void => {
    setSelectedInvoice(invoice)
  }

  const handleCreate = (): void => {
    getInvoices(page, numberOfItems).catch(console.error)
  }

  const handleClose = (): void => {
    setSelectedInvoice(undefined)
  }

  const handleOpenNewInvoiceModal = (): void => {
    setIsVisible(true)
  }

  const handleCloseNewInvoiceModal = (): void => {
    setIsVisible(false)
  }

  useEffect(() => {
    const vendorId = searchParams.get('vendorId')
    if (vendorId === null) {
      getInvoices(page, numberOfItems).catch(console.error)
    }
  }, [getInvoices, page, numberOfItems, searchParams])

  return (
    <>
      <EditInvoiceModal invoice={selectedInvoice} onClose={handleClose} />
      <NewInvoiceModal isOpen={isVisible} onClose={handleCloseNewInvoiceModal} onCreate={handleCreate} />
      <Header title='Invoices'>
        <Button
          color='primary'
          endContent={<PlusIcon />}
          onPress={handleOpenNewInvoiceModal}
        >
          Create Invoice
        </Button>
      </Header>
      <FilterBar />

      <div className='mx-auto'>
        <section className='text-neutral-500 text-sm font-semibold flex justify-between mt-3 mx-5 dark:text-neutral-200'>
          <p>Total {count} invoices</p>

        </section>

        <div className='m-5 p-8 gap-3 mx-auto'>
          <InvoicesTable
            invoices={invoices}
            onDelete={removeInvoice}
            onView={handleView}
            bottomContent={
              <div className='flex items-end justify-between p-3 bg-neutral-100 rounded-b-xl border-t border-divider dark:bg-neutral-900'>
                <div className='flex gap-3 items-center'>
                  <p>Invoices per page:</p>
                  <ShowItems onChange={changeNumberOfItems} />
                </div>

                {(invoices.length > 0 && pages > 1) && (
                  <Pagination
                    showShadow
                    showControls
                    page={page}
                    total={pages}
                    initialPage={1}
                    onChange={changePage}
                    className=''
                    classNames={{ item: 'bg-white dark:bg-zinc-800' }}
                  />
                )}
              </div>
            }
          />
        </div>
      </div>
    </>
  )
}

export default Invoices
