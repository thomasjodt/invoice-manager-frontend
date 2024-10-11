import { config } from '.'
import { InvoiceDto } from '@/models'
import type { ApiResponse, Invoice, createInvoice } from '@/types'

export const InvoicesApi = {
  getInvoices: async (page: number = 0, offset: number = 5): Promise<ApiResponse<Invoice[]>> => {
    if (page < 0) throw new Error('La página no puede ser menor a cero.')

    const { data } = (page === 0)
      ? await config.get<ApiResponse<Invoice[]>>('/invoices')
      : await config.get<ApiResponse<Invoice[]>>(`/invoices?page=${page}&offset=${offset}`)
    return data
  },

  getInvoicesByVendor: async (vendorId: number, page: number = 0, offset: number = 5): Promise<ApiResponse<Invoice[]>> => {
    if (page < 0) throw new Error('La página no puede ser menor a cero.')

    const { data } = (page === 0)
      ? await config.get<ApiResponse<Invoice[]>>(`/invoices?vendorId=${vendorId}`)
      : await config.get<ApiResponse<Invoice[]>>(`/invoices?vendorId=${vendorId}&page=${page}&offset=${offset}`)

    return data
  },

  getInvoiceById: async (id: number): Promise<Invoice> => {
    const { data } = await config.get(`/invoices/${id}`)
    return data
  },

  // TODO: Change implementation
  createInvoice: async (invoiceData: createInvoice): Promise<Invoice> => {
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
