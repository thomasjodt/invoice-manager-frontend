import { useEffect, useState } from 'react'
import { Button, useDisclosure } from '@nextui-org/react'

import { InvoicesApi } from '@/api'
import type { Invoice } from '@/types'
import { PlusIcon } from '@/components/icons'
import { Header } from '@/components/ui'
import { InvoicesCard, NewInvoiceModal } from './components'

export const Invoices: React.FC = function () {
  const [invoices, setInvoices] = useState<Invoice[]>([])

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const updateInvoices = (invoice: Invoice): void => {
    setInvoices([...invoices, invoice])
  }

  useEffect(() => {
    (async () => {
      setInvoices(await InvoicesApi.getInvoices())
    })().catch(console.log)
  }, [])

  return (
    <>
    <NewInvoiceModal
      isOpen={isOpen}
      update={updateInvoices}
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
