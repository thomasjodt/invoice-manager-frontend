import { Button, Pagination, useDisclosure } from '@nextui-org/react'

import { PlusIcon } from '@/components/icons'
import { Header } from '@/components/ui'
import { InvoicesCard, NewInvoiceModal } from './components'
import { useInvoicesContext } from './context'
import { useEffect, useState } from 'react'

export const Invoices: React.FC = function () {
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(5)
  const { invoices, getAll } = useInvoicesContext()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()


  useEffect(() => {
    const getAllInvoices = async () => {
      const response = await getAll(page)
      setPages(Math.floor(response.count / 5) + 1)
    }

    getAllInvoices()
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
        (pages > 1) && (
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
