import { create } from 'zustand'

import { InvoicesApi } from '@/api'
import type { ApiResponse, Invoice, createInvoice } from '@/types'

export const useInvoices = create(() => ({
  createInvoice: async (invoice: createInvoice): Promise<Invoice> => {
    return await InvoicesApi.createInvoice(invoice)
  },

  getAllInvoices: async (page?: number, offset?: number): Promise<ApiResponse<Invoice[]>> => {
    return await InvoicesApi.getInvoices(page, offset)
  },

  getInvoice: async (invoiceId: number): Promise<Invoice> => {
    return await InvoicesApi.getInvoiceById(invoiceId)
  },

  deleteInvoice: async (id: number): Promise<void> => {
    await InvoicesApi.deleteInvoice(id)
  },

  updateInvoice: async (invoice: Invoice): Promise<Invoice> => {
    return await InvoicesApi.updateInvoice(invoice)
  },

  getInvoiceByVendor: async (vendorId: number, page?: number, offset?: number): Promise<ApiResponse<Invoice[]>> => {
    return await InvoicesApi.getInvoicesByVendor(vendorId, page, offset)
  }
}))
