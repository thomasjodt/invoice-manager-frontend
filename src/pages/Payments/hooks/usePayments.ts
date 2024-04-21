import { PaymentsApi } from '@/api'
import type { ApiResponse, FullPayment, Payment, PaymentsContextType } from '@/types'

export const usePayments = (): PaymentsContextType => {
  const create = async (payment: Omit<Payment, 'id'>): Promise<FullPayment> => {
    return await PaymentsApi.createPayment(payment)
  }

  const getAll = async (page?: number, offset?: number): Promise<ApiResponse<FullPayment[]>> => {
    return await PaymentsApi.getPayments(page, offset)
  }

  const getOne = async (id: number): Promise<FullPayment> => {
    return await PaymentsApi.getPaymentById(id)
  }

  const remove = async (id: number): Promise<void> => {
    await PaymentsApi.deletePayment(id)
  }

  const update = async (id: number, payment: Payment): Promise<FullPayment> => {
    return await PaymentsApi.updatePayment(id, payment)
  }

  return {
    create,
    getAll,
    getOne,
    remove,
    update
  }
}
