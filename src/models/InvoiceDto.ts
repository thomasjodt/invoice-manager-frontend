import type { InvoiceDtoProps } from '@/types'

export class InvoiceDto {
  vendor: { id: string }
  invoiceNumber: string
  amount: string
  dueDate: string
  emissionDate: string

  constructor({ vendor, invoiceNumber, amount, dueDate, emissionDate}: InvoiceDtoProps) {
    this.amount = amount
    this.invoiceNumber = invoiceNumber
    this.dueDate = dueDate
    this.emissionDate = emissionDate
    this.vendor = { id: vendor }
  }
}
