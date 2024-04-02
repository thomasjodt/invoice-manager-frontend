import axios from 'axios'
import { useEffect, useState } from 'react'

import type { Invoice } from '@/types'
import { Header } from '@/components/ui/Header'
import { InvoicesCard } from './components'

export const Invoices: React.FC = function () {
  const [invoices, setInvoices] = useState<Invoice[]>([])

  useEffect(() => {
    const getInvoices = async (): Promise<void> => {
      const { data } = await axios.get<Invoice[]>('http://localhost:8080/invoices/api/invoices')
      setInvoices(data)
    }

    getInvoices().catch(console.log)
  }, [])

  return (
    <>
      <Header
        title='Invoices'
      />

      <section className='mt-20 px-5 grid gap-3'>
        {
          invoices.map(invoice => <InvoicesCard key={invoice.id} invoice={invoice} />)
        }
      </section>
    </>
  )
}
