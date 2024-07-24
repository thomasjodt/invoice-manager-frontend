import { useState } from 'react'
import {
  Button,
  DateInput,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Snippet,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'

import type { Invoice } from '@/types'
import { currencyFormat, dateFormat } from '@/utils'
import { parseDate } from '@internationalized/date'

interface Props {
  invoice?: Invoice
  onClose?: () => void
  onUpdate?: (invoice: Invoice) => void
}

export const EditInvoiceModal: React.FC<Props> = function ({ invoice, onClose }) {
  const [isShowing, setIsShowing] = useState<boolean>(false)

  const handleShowPayments = (): void => {
    setIsShowing(!isShowing)
  }

  const handleClose = (): void => {
    setIsShowing(false)
    if (onClose !== undefined) onClose()
  }

  return (
    <Modal isOpen={invoice !== undefined} onClose={handleClose} className='max-h-svh'>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className='dark:text-neutral-200'>Detailed information</ModalHeader>
            <ModalBody className='pb-10'>
              <div>
                <h3 className='font-bold dark:text-neutral-300'>Vendor</h3>
                <div className='rounded-xl p-3 bg-opacity-50 bg-default/40'>
                  <p className='font-semibold text-default-800'>{invoice?.vendor.name}</p>
                  <p className='text-default-600 text-sm'>{invoice?.vendor.fullName}</p>
                </div>
              </div>

              <div>
                <h3 className='font-bold dark:text-neutral-300'>Invoice number</h3>
                <Snippet symbol='' className='w-full'>
                  {invoice?.invoiceNumber}
                </Snippet>
              </div>

              <div>
                <h3 className='font-bold dark:text-neutral-300'>Amount</h3>
                <Snippet symbol='' hideCopyButton className='w-full' size='lg'>
                  {(invoice !== undefined) && currencyFormat(invoice.amount)}
                </Snippet>
              </div>

              <div className='flex justify-between gap-3'>
                <div className='flex-grow'>
                  <h3 className='font-bold dark:text-neutral-300'>Emission Date</h3>
                  {(invoice !== undefined) && (
                    <DateInput
                      size='lg'
                      aria-label='emission date'
                      isReadOnly
                      value={parseDate(invoice.emissionDate)}
                      description={dateFormat(invoice.emissionDate)}
                    />
                  )}
                </div>

                <div className='flex-grow'>
                  <h3 className='font-bold dark:text-neutral-300'>Due Date</h3>
                  {(invoice !== undefined) && (
                    <DateInput
                      size='lg'
                      aria-label='due date'
                      isReadOnly
                      value={parseDate(invoice.dueDate)}
                      description={dateFormat(invoice.dueDate)}
                    />
                  )}
                </div>
              </div>

              {(invoice !== undefined && invoice.payments.length > 0) && (
                <>
                  <div className='flex justify-between'>
                    <h3 className='font-bold dark:text-neutral-300'>Payments</h3>
                    <Button size='sm' onPress={handleShowPayments}>Show payments</Button>
                  </div>

                  {(isShowing) && (
                    <Table hideHeader isCompact removeWrapper>
                      <TableHeader>
                        <TableColumn>Invoice</TableColumn>
                        <TableColumn>Amount</TableColumn>
                        <TableColumn>Payment date</TableColumn>
                      </TableHeader>
                      <TableBody items={invoice.payments}>
                        {(payment) => (
                          <TableRow className='border border-divider bg-default/40'>
                            <TableCell>
                              <p className='font-semibold text-default-700'>{payment.invoice.vendor.name}</p>
                              <p className='font-semibold text-primary-500'>{payment.invoice.invoiceNumber}</p>
                            </TableCell>
                            <TableCell className='font-semibold text-default-800'>{currencyFormat(payment.amount)}</TableCell>
                            <TableCell className='text-default-600'>{dateFormat(payment.paymentDate)}</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  )}
                </>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
