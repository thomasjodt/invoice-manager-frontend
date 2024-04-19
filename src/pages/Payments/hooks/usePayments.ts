import { useState } from 'react'

import { PaymentsApi } from '@/api'
import type { ApiResponse, FullPayment, Payment, PaymentsContextType } from '@/types'

export const usePayments = (): PaymentsContextType => {
  const [payments, setPayments] = useState<FullPayment[]>([])

  const create = async (payment: Omit<Payment, 'id'>): Promise<void> => {
    const newPayment = await PaymentsApi.createPayment(payment)
    setPayments([...payments, newPayment])
  }

  const getAll = async (page?: number, offset?: number): Promise<ApiResponse<FullPayment[]>> => {
    const response = await PaymentsApi.getPayments(page, offset)
    setPayments(response.data)
    return response
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

  return {
    payments,
    create,
    getAll,
    getOne,
    remove,
    update
  }
}
