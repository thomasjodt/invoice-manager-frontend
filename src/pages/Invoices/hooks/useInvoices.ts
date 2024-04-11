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

  const getOne = async (invoiceId: number): Promise<void> => {
    const invoice = await InvoicesApi.getInvoiceById(invoiceId)
    console.log(invoice)
  }

  const remove = async (id: number): Promise<void> => {
    await InvoicesApi.deleteInvoice(id)
  }

  const update = async (invoiceId: number, invoice: Invoice): Promise<void> => {
    const updated = await InvoicesApi.updateInvoice(invoiceId, invoice)
    invoices.map(i => (i.id === invoiceId) ? { ...updated } : i)
  }

  useEffect(() => { getAll().catch(console.log) }, [])

  return {
    invoices,
    create,
    getAll,
    getOne,
    remove,
    update
  }
}