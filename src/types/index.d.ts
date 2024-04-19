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

export interface ApiResponse<T> {
  count: number
  data: T
  next: string
  previous: string
}

export interface VendorContextType {
  vendors: Vendor[]
  remove: (id: number) => Promise<void>
  getOne: (id: number) => Promise<Vendor>
  create: (vendor: Omit<Vendor, 'id' | 'balance'>) => Promise<void>
  getAll: (page?: number, offset?: number) => Promise<ApiResponse<Vendor[]>>
  update: (id: number, vendor: Omit<Vendor, 'id' | 'balance'>) => Promise<void>
}

export interface PaymentsContextType {
  payments: FullPayment[]
  remove: (id: number) => Promise<void>
  getOne: (id: number) => Promise<void>
  create: (payment: Omit<Payment, 'id'>) => Promise<void>
  getAll: (page?: number, offset?: number) => Promise<ApiResponse<FullPayment[]>>
  update: (id: number, payment: Payment) => Promise<void>
}

export interface InvoicesContextType {
  invoices: Invoice[]
  remove: (id: number) => Promise<void>
  getOne: (id: number) => Promise<Invoice>
  create: (invoice: InvoiceDtoProps) => Promise<void>
  getAll: (page?: number, offset?: number) => Promise<ApiResponse<Invoice[]>>
  update: (invoice: Invoice) => Promise<void>
  getByVendor: (vendorId: number) => Promise<ApiResponse<Invoice[]>>
}
