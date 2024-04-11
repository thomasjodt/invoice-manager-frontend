import { Button, useDisclosure } from '@nextui-org/react'

import { PlusIcon } from '@/components/icons'
import { Header } from '@/components/ui'
import { InvoicesCard, NewInvoiceModal } from './components'
import { useInvoicesContext } from './context'

export const Invoices: React.FC = function () {
  const { invoices } = useInvoicesContext()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

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
    </>
  )
}
