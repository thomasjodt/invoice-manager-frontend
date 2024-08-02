import { create } from 'zustand'

import { PaymentsApi } from '@/api'
import type { ApiResponse, CreatePayment, Payment } from '@/types'

export const usePayments = create(() => ({
  createPayment: async (payment: CreatePayment): Promise<Payment> => {
    return await PaymentsApi.createPayment(payment)
  },

  getAllPayments: async (page?: number, offset?: number): Promise<ApiResponse<Payment[]>> => {
    return await PaymentsApi.getPayments(page, offset)
  },

  getPayment: async (id: number): Promise<Payment> => {
    return await PaymentsApi.getPaymentById(id)
  },

  deletePayment: async (id: number): Promise<void> => {
    await PaymentsApi.deletePayment(id)
  },

  updatePayment: async (id: number, payment: Payment): Promise<Payment> => {
    return await PaymentsApi.updatePayment(id, payment)
  }
}))
