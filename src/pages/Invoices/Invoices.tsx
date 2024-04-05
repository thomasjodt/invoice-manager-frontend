import { useEffect, useState } from 'react'

import type { Invoice } from '@/types'
import { Header } from '@/components/ui/Header'
import { InvoiceListItem, InvoicesCard } from './components'
import { http } from '@/data'

export const Invoices: React.FC = function () {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [asCard, setAsCard] = useState(false)

  const toggleCard = (): void => {
    setAsCard(!asCard)
  }

  useEffect(() => {
    const getInvoices = async (): Promise<void> => {
      const { data } = await http.get<Invoice[]>('/invoices')
      setInvoices(data)
    }

    getInvoices().catch(console.log)
  }, [])

  return (
    <>
      <Header title='Invoices'>
        <button onClick={toggleCard}>
          change
        </button>
      </Header>

      {
        (asCard)
          ? (
            <section className='mt-20 px-5 grid gap-3 lg:grid-cols-2 xl:grid-cols-3 pb-10'>
              {invoices.map(invoice => (
                <InvoicesCard
                  key={invoice.id}
                  invoice={invoice}
                />
              ))}
            </section>
          )
          : (
            <section className='grid gap-2 p-5'>
              <div className='grid grid-cols-[36px_repeat(9,_1fr)] p-2 bg-neutral-200 rounded-lg place-items-center font-semibold text-neutral-600 mb-3'>
                <p />
                <p>Vendor</p>
                <p>Invoice Number</p>
                <p>Emission Date</p>
                <p>Due Date</p>
                <p>Days</p>
                <p>Status</p>
                <p>Amount</p>
                <p>Paid</p>
                <p>Balance</p>
              </div>

              {invoices.map(invoice => (
                <InvoiceListItem
                  key={invoice.id}
                  invoice={invoice}
                />
              ))}
            </section>
          )
      }

    </>
  )
}
