import { Button, Pagination, useDisclosure } from '@nextui-org/react'

import { PlusIcon } from '@/components/icons'
import { Header } from '@/components/ui'
import { InvoicesCard, NewInvoiceModal } from './components'
import { useInvoicesContext } from './context'
import { useEffect, useState } from 'react'

export const Invoices: React.FC = function () {
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const { invoices, getAll } = useInvoicesContext()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    const getAllInvoices = async (): Promise<void> => {
      const response = await getAll(page)
      const div = response.count / 5
      const extraPage = Number.isInteger(div) ? 0 : 1
      setPages(Math.floor(div) + extraPage)
    }

    getAllInvoices().catch(console.error)
  }, [page])

  return (
    <>
      <NewInvoiceModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />

      <Header title='Invoices'>
        <Button
          color='primary'
          onClick={onOpen}
          endContent={<PlusIcon />}
        >
          Create Invoice
        </Button>
      </Header>

      {
        (pages > 1 && page !== 0) && (
          <Pagination
            page={page}
            showControls
            total={pages}
            onChange={setPage}
            className='max-w-fit mx-auto mt-5'
          />
        )
      }

      <section className='mt-20 px-5 grid gap-3 lg:grid-cols-2 xl:grid-cols-3 pb-10'>
        {invoices.map((invoice) => (
          <InvoicesCard
            key={invoice.id}
            invoice={invoice}
          />
        ))}
      </section>
    </>
  )
}

export default Invoices
