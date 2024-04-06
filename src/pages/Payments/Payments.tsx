import { useEffect, useState } from 'react'

import { http } from '@/data'
import { Header } from '@/components/ui'
import { PaymentCard } from './components/PaymentCard'
import type { FullPayment, Invoice, Payment } from '@/types'

export const Payments: React.FC = function () {
  const [payments, setPayments] = useState<FullPayment[]>([])

  useEffect(() => {
    (async () => {
      const { data } = await http.get<Payment[]>('/payments')
      const fullPayments: FullPayment[] = []

      for (const { amount, id, invoiceId, paymentDate} of data) {
        const { data: invoice } = await http.get<Invoice>(`/invoices/${invoiceId}`)
        const fullPayment: FullPayment = { id, amount, invoice, paymentDate }
        fullPayments.push(fullPayment)
      }

      setPayments(fullPayments)
    })()
  }, [])

  return (
    <>
      <Header title='Payments' />

      <section className='grid gap-3 p-5'>
        <div className='grid grid-cols-3 place-items-center bg-primary-100 rounded-md font-semibold p-1 text-neutral-600'>
          <p className='place-self-start pl-8'>Vendor</p>
          <p>Amount</p>
          <p>Payment Date</p>
        </div>

        {
          payments.map((payment) => (
            <PaymentCard key={payment.id} payment={payment} />
          ))
        }
      </section>
    </>
  )
}
