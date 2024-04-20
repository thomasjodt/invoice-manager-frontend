import { http } from '@/data'
import type { ApiResponse, FullPayment, Invoice, Payment } from '@/types'

export const PaymentsApi = {
  getPayments: async (page: number = 0, offset: number = 5): Promise<ApiResponse<FullPayment[]>> => {
    let res
    if (page > 0) {
      res = await http.get<ApiResponse<Payment[]>>(`/payments?page=${page}&offset=${offset}`)
    } else {
      res = await http.get<ApiResponse<Payment[]>>('/payments')
    }
    const fullPayments: FullPayment[] = []

    for (const { amount, id, invoiceId, paymentDate } of res.data.data) {
      const { data: invoice } = await http.get<Invoice>(`/invoices/${invoiceId}`)
      const fullPayment: FullPayment = { id, amount, invoice, paymentDate }
      fullPayments.push(fullPayment)
    }

    return { count: res.data.count, data: fullPayments, next: '', previous: '' }
  },

  getPaymentById: async (paymentId: number): Promise<FullPayment> => {
    const { data } = await http.get<Payment>(`/payments/${paymentId}`)
    const { id, amount, invoiceId, paymentDate } = data

    const { data: invoice } = await http.get<Invoice>(`/invoices/${invoiceId}`)
    return { id, amount, paymentDate, invoice }
  },

  createPayment: async (payment: Omit<Payment, 'id'>): Promise<FullPayment> => {
    const { data } = await http.post<Payment>('/payments', payment)
    const { id, amount, invoiceId, paymentDate } = data

    const { data: invoice } = await http.get<Invoice>(`/invoices/${invoiceId}`)
    return { id, amount, paymentDate, invoice }
  },

  updatePayment: async (paymentId: number, payment: Payment): Promise<FullPayment> => {
    const { data } = await http.put(`/payments/${paymentId}`, payment)

    const { id, amount, invoiceId, paymentDate } = data

    const { data: invoice } = await http.get<Invoice>(`/invoices/${invoiceId}`)
    return { id, amount, paymentDate, invoice }
  },

  deletePayment: async (id: number): Promise<void> => {
    await http.delete(`/payments/${id}`)
  }
}
