import { useEffect, useState } from 'react'

import type { Invoice } from '@/types'
import { Header } from '@/components/ui/Header'
import { InvoicesCard } from './components'
import { http } from '@/data'

export const Invoices: React.FC = function () {
  const [invoices, setInvoices] = useState<Invoice[]>([])

  useEffect(() => {
    const getInvoices = async (): Promise<void> => {
      const { data } = await http.get<Invoice[]>('/invoices')
      setInvoices(data)
    }

    getInvoices().catch(console.log)
  }, [])

  return (
    <>
      <Header title='Invoices' />

      <section className='mt-20 px-5 grid gap-3 lg:grid-cols-2 xl:grid-cols-3 pb-10'>
        {invoices.map(invoice => (
          <InvoicesCard
            key={invoice.id}
            invoice={invoice}
          />
        ))}
      </section>
    </>
  )
}
