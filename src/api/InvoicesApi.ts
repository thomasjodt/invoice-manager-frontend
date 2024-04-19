import { http } from '@/data'
import { InvoiceDto } from '@/models'
import  type { ApiResponse, Invoice, InvoiceDtoProps } from '@/types'

export class InvoicesApi {
  static async getInvoices (page: number = 0, offset: number = 5): Promise<ApiResponse<Invoice[]>> {
    let res
    if (page > 0) {
      res = await http.get<ApiResponse<Invoice[]>>(`/invoices?page=${page}&offset=${offset}`)
    } else {
      res = await http.get<ApiResponse<Invoice[]>>('/invoices')
    }
    return res.data
  }

  static async getInvoiceByVendor (vendorId: number): Promise<ApiResponse<Invoice[]>> {
    const { data } = await http.get<ApiResponse<Invoice[]>>(`/invoices/vendor/${vendorId}`)
    return data
  }

  static async getInvoiceById (id: number): Promise<Invoice> {
    const { data } = await http.get(`/invoices/${id}`)
    return data
  }

  static async createInvoice (invoiceData: InvoiceDtoProps): Promise<Invoice> {
    const { data } = await http.post<Invoice>('/invoices', new InvoiceDto(invoiceData))
    return data
  }

  static async updateInvoice (invoice: Invoice): Promise<Invoice> {
    const { data } = await http.put(`/invoices/${invoice.id}`, invoice)
    return data
  }

  static async deleteInvoice (id: number): Promise<void> {
    await http.delete(`/invoices/${id}`)
  }
}
