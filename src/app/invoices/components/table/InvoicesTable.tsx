import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'

import type { Invoice } from '@/types'
import { columns } from './columns'
import { getDays, getStatus, currencyFormat, dateFormat, getBalance } from '@/utils'
import { VendorTag, TableActions } from '@/components/ui'
import { StatusChip } from '../StatusChip'
import { DeleteModal } from '../modals/DeleteModal'

interface Props {
  invoices?: Invoice[]
  onPay?: (invoice: Invoice) => void
  onView?: (invoice: Invoice) => void
  onDelete?: (invoice: Invoice) => void
  bottomContent?: React.ReactNode
}

export const InvoicesTable: React.FC<Props> = function ({ bottomContent, invoices = [], onDelete, onView, onPay }) {
  const [deletingInvoice, setDeletingInvoice] = useState<Invoice | null>(null)

  const handleDelete = (): void => {
    if (onDelete !== undefined && deletingInvoice !== null) {
      onDelete(deletingInvoice)
      setDeletingInvoice(null)
    }
  }

  const handleView = (invoice: Invoice) => {
    return () => {
      (onView !== undefined) && onView(invoice)
    }
  }

  const handlePay = (invoice: Invoice) => {
    return () => {
      if (onPay !== undefined) onPay(invoice)
    }
  }

  const handleCloseDeleteModal = (): void => {
    setDeletingInvoice(null)
  }

  return (
    <>
      <DeleteModal
        onDelete={handleDelete}
        isModalOpen={deletingInvoice !== null}
        onCloseModal={handleCloseDeleteModal}
      />
      <Table
        aria-label='Table to show the invoices'
        removeWrapper
        bottomContentPlacement='outside'
        className='border rounded-xl bg-white dark:bg-zinc-900 mx-auto overflow-hidden dark:border-neutral-700 dark:text-neutral-200 justify-between'
        classNames={{ th: 'bg-transparent border-b border-divider dark:text-white text-center first:text-start', tbody: 'border-b border-divider' }}
        bottomContent={
          (bottomContent !== undefined) && bottomContent
        }
      >
        <TableHeader columns={columns}>
          {({ key, label }) => (
            <TableColumn key={key} align={(key === 'vendor') ? 'start' : 'center'}>
              {label}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody items={invoices} emptyContent='There is no invoices to show.'>
          {(invoice) => {
            const { amount, dueDate, emissionDate, id, invoiceNumber, payments, vendor } = invoice
            const days = getDays(emissionDate, dueDate)
            const balance = getBalance(amount, payments)
            const status = getStatus(dueDate, balance)

            return (
              <TableRow key={id} className='border-b border-divider last:border-none'>
                <TableCell className='w-52 max-w-52 truncate'>
                  <VendorTag
                    vendor={vendor}
                    classNames={{ fullName: 'truncate', container: 'w-full' }}
                  />
                </TableCell>

                <TableCell className='text-primary-700 dark:text-primary-400 font-semibold'>
                  {invoiceNumber}
                </TableCell>

                <TableCell className='text-neutral-600 dark:text-neutral-400'>
                  {currencyFormat(amount)}
                </TableCell>

                <TableCell className='text-neutral-500 text-xs text-center'>
                  {dateFormat(emissionDate)}
                </TableCell>

                <TableCell className='text-neutral-500 text-xs text-center'>
                  {dateFormat(dueDate)}
                </TableCell>

                <TableCell>
                  {days}
                </TableCell>

                <TableCell>
                  <StatusChip status={status} />
                </TableCell>

                <TableCell className='font-semibold text-primary-700 dark:text-primary-400'>
                  {currencyFormat(balance)}
                </TableCell>

                <TableCell>
                  <TableActions
                    item='invoice'
                    invoice={invoice}
                    onDelete={() => { setDeletingInvoice(invoice) }}
                    onViewDetails={handleView(invoice)}
                    onPay={handlePay(invoice)}
                  />
                </TableCell>
              </TableRow>
            )
          }}
        </TableBody>
      </Table>
    </>
  )
}
