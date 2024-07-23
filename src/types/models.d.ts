export interface Vendor {
  id: number
  name: string
  fullName: string
  balance: number
  invoices: []
}

export interface Invoice {
  amount: number
  dueDate: string
  emissionDate: string
  id: number
  invoiceNumber: string
  vendor: Omit<Vendor, 'balance' | 'invoices'>
  payments: Payment[]
}

export interface Payment {
  amount: number
  id: number
  invoice: Invoice
  paymentDate: string
}
