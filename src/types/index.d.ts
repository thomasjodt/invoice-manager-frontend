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
  deleteVendor: (id: number) => Promise<void>
  getVendor: (id: number) => Promise<Vendor>
  createVendor: (vendor: Pick<Vendor, 'name' | 'fullName'>) => Promise<Vendor>
  getAllVendors: (page?: number, offset?: number) => Promise<ApiResponse<Vendor[]>>
  updateVendor: (id: number, vendor: Pick<Vendor, 'name' | 'fullName'>) => Promise<Vendor>
  getVendorByName: (name: string, page?: number, offset?: number) => Promise<ApiResponse<Vendor[]>>
}

export interface PaymentsContextType {
  deletePayment: (id: number) => Promise<void>
  getPayment: (id: number) => Promise<FullPayment>
  createPayment: (payment: CreatePayment) => Promise<FullPayment>
  getAllPayments: (page?: number, offset?: number) => Promise<ApiResponse<FullPayment[]>>
  updatePayment: (id: number, payment: Payment) => Promise<FullPayment>
}

export interface InvoicesContextType {
  currentInvoice: Invoice | null
  resetEditingInvoice: () => void
  populateEditingInvoice: (invoice: Invoice) => void
  deleteInvoice: (id: number) => Promise<void>
  getInvoice: (id: number) => Promise<Invoice>
  createInvoice: (invoice: createInvoice) => Promise<Invoice>
  getAllInvoices: (page?: number, offset?: number) => Promise<ApiResponse<Invoice[]>>
  updateInvoice: (invoice: Invoice) => Promise<Invoice>
  getInvoiceByVendor: (vendorId: number, page?: number, offset?: number) => Promise<ApiResponse<Invoice[]>>
}

export interface GlobalContextType extends InvoicesContextType, PaymentsContextType, VendorContextType {}
