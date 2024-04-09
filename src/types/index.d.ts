import type { statuses } from '@/data'

export interface Vendor {
  id: number
  name: string
  fullName: string
  balance: number
}

export interface Payment {
  amount: number
  id: number
  invoiceId: number
  paymentDate: string
}

export interface FullPayment extends Omit<Payment, 'invoiceId'> {
  invoice: Invoice
}

export interface Invoice {
  amount: number
  dueDate: string
  emissionDate: string
  id: number
  invoiceNumber: string
  vendor: Omit<Vendor, 'balance'>
  payments: Payment[]
}

export interface UseForm<T> {
  form: T
  reset: () => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface InvoiceDtoProps {
  vendor: string
  invoiceNumber: string
  amount: string
  dueDate: string
  emissionDate: string
}

export type Status = keyof typeof statuses

export interface VendorContextType {
  currentVendor: Vendor | null
  vendors: Vendor[]
  remove: (id: number) => Promise<void>
  getOne: (id: number) => Promise<void>
  create: (vendor: Omit<Vendor, 'id' | 'balance'>) => Promise<void>
  getAll: (vendor: Vendor) => Promise<void>
  update: (id: number, vendor: Omit<Vendor, 'id' | 'balance'>) => Promise<void>
}
