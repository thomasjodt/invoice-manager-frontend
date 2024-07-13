import { config } from '.'
import type { ApiResponse, CreatePayment, Invoice, Payment } from '@/types'

export const PaymentsApi = {
  getPayments: async (page: number = 0, offset: number = 5): Promise<ApiResponse<Payment[]>> => {
    let res
    if (page > 0) {
      res = await config.get<ApiResponse<Payment[]>>(`/payments?page=${page}&offset=${offset}`)
    } else {
      res = await config.get<ApiResponse<Payment[]>>('/payments')
    }
    const payments: Payment[] = []

    for (const { amount, id, paymentDate, invoice: { id: invoiceId } } of res.data.data) {
      const { data: invoice } = await config.get<Invoice>(`/invoices/${invoiceId}`)
      const payment: Payment = { id, amount, invoice, paymentDate }
      payments.push(payment)
    }

    return { count: res.data.count, data: payments, next: '', previous: '' }
  },

  getPaymentById: async (paymentId: number): Promise<Payment> => {
    const { data } = await config.get<Payment>(`/payments/${paymentId}`)
    const { id, amount, paymentDate, invoice: { id: invoiceId } } = data

    const { data: invoice } = await config.get<Invoice>(`/invoices/${invoiceId}`)
    return { id, amount, paymentDate, invoice }
  },

  createPayment: async (payment: CreatePayment): Promise<Payment> => {
    const { data } = await config.post<Payment>('/payments', payment)
    const { id, amount, paymentDate, invoice: { id: invoiceId } } = data

    const { data: invoice } = await config.get<Invoice>(`/invoices/${invoiceId}`)
    return { id, amount, paymentDate, invoice }
  },

  updatePayment: async (paymentId: number, payment: Payment): Promise<Payment> => {
    const { data } = await config.put(`/payments/${paymentId}`, payment)

    const { id, amount, invoiceId, paymentDate } = data

    const { data: invoice } = await config.get<Invoice>(`/invoices/${invoiceId}`)
    return { id, amount, paymentDate, invoice }
  },

  deletePayment: async (id: number): Promise<void> => {
    await config.delete(`/payments/${id}`)
  }
}
