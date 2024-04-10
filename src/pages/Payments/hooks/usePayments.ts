import { useEffect, useState } from 'react'

import { PaymentsApi } from '@/api'
import type { FullPayment, Payment, PaymentsContextType } from '@/types'

export const usePayments = (): PaymentsContextType => {
  const [payments, setPayments] = useState<FullPayment[]>([])

  const create = async (payment: Payment): Promise<void> => {
    const newPayment = await PaymentsApi.createPayment(payment)
    setPayments([...payments, newPayment])
  }

  const getAll = async (): Promise<void> => {
    setPayments(await PaymentsApi.getPayments())
  }

  const getOne = async (id: number): Promise<void> => {
    const payment = await PaymentsApi.getPaymentById(id)
    console.log(payment)
  }

  const remove = async (id: number): Promise<void> => {
    await PaymentsApi.deletePayment(id)
    setPayments(payments.filter(payment => payment.id !== id))
  }

  const update = async (id: number, payment: Payment): Promise<void> => {
    const updatedPayment = await PaymentsApi.updatePayment(id, payment)
    setPayments(payments.map(
      p => (p.id === id) ? { ...p, ...updatedPayment } : p
    ))
  }

  useEffect(() => { getAll().catch(console.log) }, [])

  return {
    payments,
    create,
    getAll,
    getOne,
    remove,
    update
  }
}
