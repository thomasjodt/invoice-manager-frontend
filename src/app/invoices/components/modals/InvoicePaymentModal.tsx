import { type CalendarDate, parseDate } from '@internationalized/date'
import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader
} from '@nextui-org/react'

import type { Invoice } from '@/types'
import { StatusChip } from '../StatusChip'
import { useForm, usePayments } from '@/hooks'
import { currencyFormat, dateFormat, getBalance, getStatus } from '@/utils'

interface Props {
  invoice?: Invoice
  onClose?: () => void
  onPay?: () => void
}

interface Form {
  amount: number | string
  date: CalendarDate | null
  isCustomDate: boolean
  errorMessage: string | null
}

const errorMessages = {
  greater: 'The amount to be paid cannot be greater than the invoice balance.',
  negative: 'The amount to be paid must be greater than zero.'
}

export const InvoicePaymentModal: React.FC<Props> = function ({ invoice, onClose, onPay }) {
  const balance = (invoice !== undefined) ? getBalance(invoice.amount, invoice.payments) : 0

  const { createPayment } = usePayments()

  const { form, fillForm, handleChange, reset } = useForm<Form>({
    date: null,
    amount: '',
    isCustomDate: false,
    errorMessage: null
  })

  const handleDateChange = (value: CalendarDate): void => {
    fillForm({ ...form, date: value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (invoice === undefined) return

    if ((Number(form.amount) > balance)) {
      fillForm({ ...form, errorMessage: errorMessages.greater })
      return
    }

    if (Number(form.amount) <= 0) {
      fillForm({ ...form, errorMessage: errorMessages.negative })
      return
    }

    createPayment({
      invoice,
      amount: Number(form.amount),
      paymentDate: (form.date !== null) ? form.date.toString() : new Date().toISOString().split('T')[0]
    })
      .then(() => {
        if (onPay !== undefined) onPay()
      })
      .catch(console.error)

    handleClose()
  }

  const handleClose = (): void => {
    reset()
    if (onClose !== undefined) onClose()
  }

  console.log(balance)

  return (
    <Modal isOpen={invoice !== undefined} onClose={handleClose} className='max-h-svh'>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className='text-default-900 border-b border-divider mb-5'>Make a payment</ModalHeader>
            <ModalBody>
              <Card shadow='none' className='border border-divider rounded-md p-3'>
                <div className='flex gap-3 items-center'>
                  <p className='font-semibold text-lg'>{invoice?.vendor.name}:</p>
                  <p className='text-default-700 font-bold'>{invoice?.invoiceNumber}</p>
                  <span className='scale-85'>
                    {(invoice !== undefined) && (
                      <StatusChip status={getStatus(invoice.dueDate, balance)} />
                    )}
                  </span>
                </div>
                <section className='grid grid-cols-[100px_1fr]'>
                  <span className='text-default-400'>Balance:</span>
                  <div>
                    <span className='font-semibold text-medium'>{currencyFormat(balance)}</span>
                    {' / '}
                    <span className='text-default-600 text-tiny'>{(invoice !== undefined) && currencyFormat(invoice.amount)}</span>
                  </div>

                  <span className='text-default-400'>Due date:</span>
                  <p className='text-default-600'>{(invoice !== undefined) && dateFormat(invoice.dueDate)}</p>
                </section>
              </Card>

              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <Input
                    label='Amount to pay'
                    type='number'
                    isInvalid={form.errorMessage !== null}
                    onChange={handleChange}
                    name='amount'
                    value={form.amount.toString()}
                    errorMessage={form.errorMessage}
                    min={0}
                    max={balance}
                    step={0.01}
                    onValueChange={() => { fillForm({ ...form, errorMessage: null }) }}
                    classNames={{ inputWrapper: 'border border-divider rounded-xl' }}
                  />
                </div>

                <Checkbox
                  name='isCustomDate'
                  checked={form.isCustomDate}
                  onChange={handleChange}
                >
                  Custom date
                </Checkbox>

                <DatePicker
                  label='Payment date'
                  isDisabled={!form.isCustomDate}
                  name='date'
                  value={(form.isCustomDate)
                    ? form.date
                    : parseDate(new Date().toISOString().split('T')[0])}
                  className='my-3'
                  onChange={handleDateChange}
                />
                <div className='flex justify-end my-3'>
                  <Button type='submit' color='primary'>Pay the invoice</Button>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
