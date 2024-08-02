import { useState } from 'react'
import {
  Button,
  DateInput,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Snippet
} from '@nextui-org/react'

import type { Invoice, Payment } from '@/types'
import { currencyFormat, dateFormat } from '@/utils'
import { parseDate } from '@internationalized/date'
import { DeleteIcon } from '@/components/icons'
import { usePayments } from '@/hooks'

interface Props {
  invoice?: Invoice
  onClose?: () => void
  onUpdate?: (invoice: Invoice) => void
  onDeletePayment?: () => void
}

export const EditInvoiceModal: React.FC<Props> = function ({ invoice, onClose, onDeletePayment }) {
  const { deletePayment } = usePayments()
  const [isShowing, setIsShowing] = useState<boolean>(false)

  const handleShowPayments = (): void => {
    setIsShowing(!isShowing)
  }

  const handleClose = (): void => {
    setIsShowing(false)
    if (onClose !== undefined) onClose()
  }

  const handleDeletePayment = (payment: Payment) => {
    return () => {
      const isConfirmed = confirm('Are you sure to delete this payment?')

      if (isConfirmed) {
        deletePayment(payment.id)
          .then(() => {
            if (onClose !== undefined) onClose()
            if (onDeletePayment !== undefined) onDeletePayment()
          })
          .catch(console.error)
      }
    }
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
                    invoice.payments.map((payment) => (
                      <div key={payment.id} className='flex items-center justify-between rounded-xl p-3 bg-opacity-50 bg-default/40 w-full px-5'>
                        <p className='text-default-600 font-semibold'>{payment.invoice.vendor.name}</p>
                        <p className='font-semibold text-default-800'>{currencyFormat(payment.amount)}</p>
                        <p className='text-default-600 text-sm'>{dateFormat(payment.paymentDate)}</p>
                        <Button
                          size='sm'
                          color='danger'
                          variant='light'
                          title='Delete payment'
                          isIconOnly
                          startContent={<DeleteIcon size={20} />}
                          onPress={handleDeletePayment(payment)}
                        />
                      </div>
                    ))
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
