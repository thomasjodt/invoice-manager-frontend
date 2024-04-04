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

export type Status = keyof typeof statuses
