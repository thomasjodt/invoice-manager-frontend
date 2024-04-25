import { config } from '.'
import { InvoiceDto } from '@/models'
import type { ApiResponse, Invoice, InvoiceDtoProps } from '@/types'

export const InvoicesApi = {
  getInvoices: async (page: number = 0, offset: number = 5): Promise<ApiResponse<Invoice[]>> => {
    let res
    if (page > 0) {
      res = await config.get<ApiResponse<Invoice[]>>(`/invoices?page=${page}&offset=${offset}`)
    } else {
      res = await config.get<ApiResponse<Invoice[]>>('/invoices')
    }
    return res.data
  },
  getInvoicesByVendor: async (vendorId: number, page: number = 0, offset: number = 5): Promise<ApiResponse<Invoice[]>> => {
    const res = (page > 0)
      ? await config.get<ApiResponse<Invoice[]>>(`/invoices?vendorId=${vendorId}&page=${page}&offset=${offset}`)
      : await config.get<ApiResponse<Invoice[]>>(`/invoices?vendorId=${vendorId}`)

    return res.data
  },
  getInvoiceById: async (id: number): Promise<Invoice> => {
    const { data } = await config.get(`/invoices/${id}`)
    return data
  },
  createInvoice: async (invoiceData: InvoiceDtoProps): Promise<Invoice> => {
    const { data } = await config.post<Invoice>('/invoices', new InvoiceDto(invoiceData))
    return data
  },
  updateInvoice: async (invoice: Invoice): Promise<Invoice> => {
    const { data } = await config.put(`/invoices/${invoice.id}`, invoice)
    return data
  },
  deleteInvoice: async (id: number): Promise<void> => {
    await config.delete(`/invoices/${id}`)
  }
}
