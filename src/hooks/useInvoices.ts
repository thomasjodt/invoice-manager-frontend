import { InvoicesApi } from '@/api'
import type { ApiResponse, Invoice, createInvoice, InvoicesContextType } from '@/types'
import { useState } from 'react'

export const useInvoices = (): InvoicesContextType => {
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null)

  const resetEditingInvoice = (): void => {
    setCurrentInvoice(null)
  }

  const populateEditingInvoice = (invoice: Invoice): void => {
    setCurrentInvoice(invoice)
  }

  const createInvoice = async (invoice: createInvoice): Promise<Invoice> => {
    return await InvoicesApi.createInvoice(invoice)
  }

  const getAllInvoices = async (page?: number, offset?: number): Promise<ApiResponse<Invoice[]>> => {
    return await InvoicesApi.getInvoices(page, offset)
  }

  const getInvoice = async (invoiceId: number): Promise<Invoice> => {
    return await InvoicesApi.getInvoiceById(invoiceId)
  }

  const deleteInvoice = async (id: number): Promise<void> => {
    await InvoicesApi.deleteInvoice(id)
  }

  const updateInvoice = async (invoice: Invoice): Promise<Invoice> => {
    return await InvoicesApi.updateInvoice(invoice)
  }

  const getInvoiceByVendor = async (vendorId: number, page?: number, offset?: number): Promise<ApiResponse<Invoice[]>> => {
    return await InvoicesApi.getInvoicesByVendor(vendorId, page, offset)
  }

  return {
    createInvoice,
    getAllInvoices,
    getInvoice,
    deleteInvoice,
    updateInvoice,
    currentInvoice,
    getInvoiceByVendor,
    resetEditingInvoice,
    populateEditingInvoice
  }
}
