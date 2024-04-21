import { useEffect, useState } from 'react'
import { Button, Pagination, useDisclosure } from '@nextui-org/react'

import type { Invoice } from '@/types'
import { Header } from '@/components/ui'
import { PlusIcon } from '@/components/icons'
import { useInvoicesContext } from '@/context'
import { InvoicesCard, NewInvoiceModal } from './components'

export const Invoices: React.FC = function () {
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  // TODO: Implement a select to indicate the items to show per page
  const [itemsPerPage/* , setItemsPerPage */] = useState(5)
  const [invoices, setInvoices] = useState<Invoice[]>([])

  const { getAll } = useInvoicesContext()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    const getAllInvoices = async (): Promise<void> => {
      const { count, data } = await getAll(page, itemsPerPage)

      const div = count / itemsPerPage
      const extraPage = Number.isInteger(div) ? 0 : 1

      setInvoices(data)
      setPages(Math.floor(div) + extraPage)
    }

    getAllInvoices().catch(console.error)
  }, [page, getAll, itemsPerPage])

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

      <section className='mt-20 px-5 grid gap-3 lg:grid-cols-2 xl:grid-cols-3 pb-10'>
        {invoices.map((invoice) => (
          <InvoicesCard
            key={invoice.id}
            invoice={invoice}
          />
        ))}
      </section>

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
    </>
  )
}

export default Invoices
