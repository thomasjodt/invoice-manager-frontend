import { config } from '.'
import type { ApiResponse, CreatePayment, Payment } from '@/types'

export const PaymentsApi = {
  getPayments: async (page: number = 0, offset: number = 5): Promise<ApiResponse<Payment[]>> => {
    if (page < 0) throw new Error('La página no puede ser menor a cero.')

    const { data } = (page === 0)
      ? await config.get<ApiResponse<Payment[]>>('/payments')
      : await config.get<ApiResponse<Payment[]>>(`/payments?page=${page}&offset=${offset}`)

    return data
  },

  getPaymentById: async (paymentId: number): Promise<Payment> => {
    const { data } = await config.get<Payment>(`/payments/${paymentId}`)
    return data
  },

  createPayment: async (payment: CreatePayment): Promise<Payment> => {
    const { data } = await config.post<Payment>('/payments', payment)
    return data
  },

  updatePayment: async (paymentId: number, payment: Payment): Promise<Payment> => {
    const { data } = await config.put(`/payments/${paymentId}`, payment)
    return data
  },

  deletePayment: async (id: number): Promise<void> => {
    await config.delete(`/payments/${id}`)
  }
}
