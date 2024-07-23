import type { statuses } from '@/data'
import type { Invoice, Payment, Vendor } from './models'
export type { Invoice, Payment, Vendor } from './models'

export type Status = keyof typeof statuses
export interface UseForm<T> {
  form: T
  reset: () => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  fillForm: (form: T) => void
}

// TODO: Change interface
export interface createInvoice {
  vendor: string
  invoiceNumber: string
  amount: string
  dueDate: string
  emissionDate: string
}

export interface ApiResponse<T> {
  count: number
  data: T
  next: string
  previous: string
}

export interface CreatePayment extends Omit<Payment, 'id'> {
  invoice: Pick<Invoice, 'id'>
}

export interface VendorContextType {
  remove: (id: number) => Promise<void>
  getOne: (id: number) => Promise<Vendor>
  create: (vendor: Pick<Vendor, 'name' | 'fullName'>) => Promise<Vendor>
  getAll: (page?: number, offset?: number) => Promise<ApiResponse<Vendor[]>>
  update: (id: number, vendor: Pick<Vendor, 'name' | 'fullName'>) => Promise<Vendor>
  getByName: (name: string, page?: number, offset?: number) => Promise<ApiResponse<Vendor[]>>
}

export interface PaymentsContextType {
  remove: (id: number) => Promise<void>
  getOne: (id: number) => Promise<FullPayment>
  create: (payment: CreatePayment) => Promise<FullPayment>
  getAll: (page?: number, offset?: number) => Promise<ApiResponse<FullPayment[]>>
  update: (id: number, payment: Payment) => Promise<FullPayment>
}

export interface InvoicesContextType {
  current: Invoice | null
  resetEditing: () => void
  populateEditing: (invoice: Invoice) => void
  remove: (id: number) => Promise<void>
  getOne: (id: number) => Promise<Invoice>
  create: (invoice: createInvoice) => Promise<Invoice>
  getAll: (page?: number, offset?: number) => Promise<ApiResponse<Invoice[]>>
  update: (invoice: Invoice) => Promise<Invoice>
  getByVendor: (vendorId: number, page?: number, offset?: number) => Promise<ApiResponse<Invoice[]>>
}
