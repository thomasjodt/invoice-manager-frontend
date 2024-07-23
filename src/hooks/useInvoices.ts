import { InvoicesApi } from '@/api'
import type { ApiResponse, Invoice, createInvoice, InvoicesContextType } from '@/types'
import { useState } from 'react'

export const useInvoices = (): InvoicesContextType => {
  const [current, setCurrent] = useState<Invoice | null>(null)

  const resetEditing = (): void => {
    setCurrent(null)
  }

  const populateEditing = (invoice: Invoice): void => {
    setCurrent(invoice)
  }

  const create = async (invoice: createInvoice): Promise<Invoice> => {
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

  const getByVendor = async (vendorId: number, page?: number, offset?: number): Promise<ApiResponse<Invoice[]>> => {
    return await InvoicesApi.getInvoicesByVendor(vendorId, page, offset)
  }

  return {
    create,
    getAll,
    getOne,
    remove,
    update,
    current,
    getByVendor,
    resetEditing,
    populateEditing
  }
}
