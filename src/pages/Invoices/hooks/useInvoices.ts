import { useEffect, useState } from 'react'
import type { Invoice, InvoiceDtoProps, InvoicesContextType } from '@/types'
import { InvoicesApi } from '@/api'

export const useInvoices = (): InvoicesContextType => {
  const [invoices, setInvoices] = useState<Invoice[]>([])

  const create = async (invoice: InvoiceDtoProps): Promise<void> => {
    const newInvoice = await InvoicesApi.createInvoice(invoice)
    setInvoices([...invoices, newInvoice])
  }

  const getAll = async (): Promise<void> => {
    setInvoices(await InvoicesApi.getInvoices())
  }

  const getOne = async (invoiceId: number): Promise<Invoice> => {
    return await InvoicesApi.getInvoiceById(invoiceId)
  }

  const remove = async (id: number): Promise<void> => {
    await InvoicesApi.deleteInvoice(id)
    setInvoices(invoices.filter(i => i.id !== id))
  }

  const update = async (invoice: Invoice): Promise<void> => {
    const updated = await InvoicesApi.updateInvoice(invoice)
    setInvoices(invoices.map(i =>
      (i.id === invoice.id) ? { ...invoice, ...updated } : i
    ))
  }

  const getByVendor = async (vendorId: number): Promise<Invoice[]> => {
    return InvoicesApi.getInvoiceByVendor(vendorId)
  }

  useEffect(() => { getAll().catch(console.log) }, [])

  return {
    invoices,
    create,
    getAll,
    getOne,
    remove,
    update,
    getByVendor
  }
}
