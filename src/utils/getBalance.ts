import { type Payment } from '@/types'

export const getBalance = (amount: number, payments: number | Payment[]): number => {
  if (typeof payments === 'number') return amount - payments

  const paid = payments.reduce((a, b) => a + b.amount, 0)
  return amount - paid
}
