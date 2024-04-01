import { Invoice } from '@/types'
import { ContextActions } from '@/pages/Vendors/components/ContextActions'
import { Chip, User } from '@nextui-org/react'
import { currencyFormat } from '@/utils'
import { getDays } from '.'
import { dateFormat } from '@/utils/dateFormat'
import { getStatus } from './getStatus'

interface Props {
  invoice: Invoice
  columnKey: React.Key
}

export const statuses = {
  pending: 'warning',
  paid: 'success',
  overdue: 'danger'
} as const

export type Status = keyof typeof statuses

export const RenderCell: React.FC<Props> = ({ invoice, columnKey }) => {
  const onAccount = invoice.payments.reduce((total, current) => total + current.amount, 0)

  const balance = invoice.amount - onAccount
  const status: Status = getStatus(new Date(invoice.dueDate + 'T00:00'), balance)
  const days = getDays(invoice.emissionDate, invoice.dueDate)
  const color = statuses[status]

  if (columnKey === 'vendor') {
    return (
      <User
        name={invoice.vendor.name}
        description={invoice.vendor.fullName}
      />
    )
  }

  if (columnKey === 'invoice_number') {
    return <p className='text-primary-500 font-bold'>{invoice.invoiceNumber}</p>
  }

  if (columnKey === 'emission_date') {
    return <p className='font-medium'>{dateFormat(new Date(invoice.emissionDate + 'T00:00'))}</p>
  }

  if (columnKey === 'due_date') {
    return <p className='font-medium'>{dateFormat(new Date(invoice.dueDate + 'T00:00'))}</p>
  }

  if (columnKey === 'days') {
    return <p className='font-medium text-center'>{days}</p>
  }

  if (columnKey === 'status') {
    return (
      <Chip radius='sm' variant='flat' color={color} className={`border border-${color}-200`}>
        {status}
      </Chip>
    )
  }

  if (columnKey === 'amount') {
    return <p className='font-medium'>{currencyFormat(invoice.amount)}</p>
  }

  if (columnKey === 'on_account') {
    return <p className='font-medium'>{currencyFormat(onAccount)}</p>
  }

  if (columnKey === 'balance') {
    return (
      <Chip variant='flat' color={balance > 10000 ? 'danger' : 'default'}>
        {currencyFormat(balance)}
      </Chip>
    )
  }

  if (columnKey === 'actions') {
    return <ContextActions />
  }
}