import { InvoicesApi } from '@/api'
import type { ApiResponse, Invoice, InvoiceDtoProps, InvoicesContextType } from '@/types'

export const useInvoices = (): InvoicesContextType => {
  const create = async (invoice: InvoiceDtoProps): Promise<Invoice> => {
    return await InvoicesApi.createInvoice(invoice)
  }

  const getAll = async (page?: number, offset?: number): Promise<ApiResponse<Invoice[]>> => {
    return await InvoicesApi.getInvoices(page, offset)
  }

  const getOne = async (invoiceId: number): Promise<Invoice> => {
    return await InvoicesApi.getInvoiceById(invoiceId)
  }

  const remove = async (id: number): Promise<void> => {
    await InvoicesApi.deleteInvoice(id)
  }

  const update = async (invoice: Invoice): Promise<Invoice> => {
    return await InvoicesApi.updateInvoice(invoice)
  }

  const getByVendor = async (vendorId: number): Promise<ApiResponse<Invoice[]>> => {
    return await InvoicesApi.getInvoiceByVendor(vendorId)
  }

  return {
    create,
    getAll,
    getOne,
    remove,
    update,
    getByVendor
  }
}
