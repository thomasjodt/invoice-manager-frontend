import { PaymentsApi } from '@/api'
import type { ApiResponse, CreatePayment, Payment, PaymentsContextType } from '@/types'

export const usePayments = (): PaymentsContextType => {
  const createPayment = async (payment: CreatePayment): Promise<Payment> => {
    return await PaymentsApi.createPayment(payment)
  }

  const getAllPayments = async (page?: number, offset?: number): Promise<ApiResponse<Payment[]>> => {
    return await PaymentsApi.getPayments(page, offset)
  }

  const getPayment = async (id: number): Promise<Payment> => {
    return await PaymentsApi.getPaymentById(id)
  }

  const deletePayment = async (id: number): Promise<void> => {
    await PaymentsApi.deletePayment(id)
  }

  const updatePayment = async (id: number, payment: Payment): Promise<Payment> => {
    return await PaymentsApi.updatePayment(id, payment)
  }

  return {
    createPayment,
    getAllPayments,
    getPayment,
    deletePayment,
    updatePayment
  }
}
