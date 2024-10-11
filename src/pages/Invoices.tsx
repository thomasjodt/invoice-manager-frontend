import { Button, Pagination } from '@nextui-org/react'

import { PlusIcon } from '@/components/icons'
import { Header, ShowItems } from '@/components/ui'
import { useInvoicesActions, useModalHandlers } from '@/app/invoices'
import { EditInvoiceModal, FilterBar, NewInvoiceModal, InvoicePaymentModal, InvoicesTable } from '@/app/invoices/components'

export const Invoices: React.FC = function () {
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

  const {
    newIsOpen,
    payingInvoice,
    selectedInvoice,
    handlePay,
    handleView,
    handleCreate,
    handleOpenPay,
    handleCloseNew,
    handleClosePay,
    handleCloseEdit,
    handleOpenNewInvoiceModal
  } = useModalHandlers(page, numberOfItems, getInvoices)

  return (
    <>
      <EditInvoiceModal invoice={selectedInvoice} onClose={handleCloseEdit} onDeletePayment={handlePay} />
      <NewInvoiceModal isOpen={newIsOpen} onClose={handleCloseNew} onCreate={handleCreate} />
      <InvoicePaymentModal invoice={payingInvoice} onClose={handleClosePay} onPay={handlePay} />

      <Header title='Facturas'>
        <Button
          color='primary'
          endContent={<PlusIcon />}
          onPress={handleOpenNewInvoiceModal}
        >
          Crear factura
        </Button>
      </Header>

      <div className='flex flex-col'>
        <FilterBar />
        <section className='text-neutral-500 text-sm font-semibold flex justify-between mt-3 mx-5 dark:text-neutral-200'>
          <p>Total: {count} facturas</p>

        </section>

        <div className='m-5 p-8 gap-3 mx-auto flex flex-grow'>
          <InvoicesTable
            invoices={invoices}
            onDelete={removeInvoice}
            onView={handleView}
            onPay={handleOpenPay}
            bottomContent={
              <div className='flex items-end justify-between p-3 bg-neutral-100 rounded-b-xl border-t border-divider dark:bg-neutral-900'>
                <div className='flex gap-3 items-center'>
                  <p>Facturas por página:</p>
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
