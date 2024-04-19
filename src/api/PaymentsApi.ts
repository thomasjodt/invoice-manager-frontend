import { http } from '@/data'
import type { ApiResponse, FullPayment, Invoice, Payment } from '@/types'

export class PaymentsApi {
  static async getPayments(): Promise<ApiResponse<FullPayment[]>> {

    const { data } = await http.get<ApiResponse<Payment[]>>('/payments')
    const fullPayments: FullPayment[] = []

    for (const { amount, id, invoiceId, paymentDate } of data.data) {
      const { data: invoice } = await http.get<Invoice>(`/invoices/${invoiceId}`)
      const fullPayment: FullPayment = { id, amount, invoice, paymentDate }
      fullPayments.push(fullPayment)
    }

    return { count: data.count, data: fullPayments, next: '', previous: '' }
  }

  static async getPaymentById(paymentId: number): Promise<FullPayment> {
    const { data } = await http.get<Payment>(`/payments/${paymentId}`)
    const { id, amount, invoiceId, paymentDate } = data

    const { data: invoice } = await http.get<Invoice>(`/invoices/${invoiceId}`)
    return { id, amount, paymentDate, invoice }
  }

  static async createPayment(payment: Omit<Payment, 'id'>): Promise<FullPayment> {
    const { data } = await http.post<Payment>('/payments', payment)
    const { id, amount, invoiceId, paymentDate } = data

    const { data: invoice } = await http.get<Invoice>(`/invoices/${invoiceId}`)
    return { id, amount, paymentDate, invoice }
  }

  static async updatePayment(paymentId: number, payment: Payment): Promise<FullPayment> {
    const { data } = await http.put(`/payments/${paymentId}`, payment)

    const { id, amount, invoiceId, paymentDate } = data

    const { data: invoice } = await http.get<Invoice>(`/invoices/${invoiceId}`)
    return { id, amount, paymentDate, invoice }
  }

  static async deletePayment(id: number): Promise<void> {
    await http.delete(`/payments/${id}`)
  }
}