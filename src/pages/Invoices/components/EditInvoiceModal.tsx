import { useEffect } from 'react'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Snippet
} from '@nextui-org/react'

import { useForm } from '@/hooks'
import type { Invoice } from '@/types'
import { VendorTag } from '@/components/ui'
import { useInvoicesContext } from '../context'

interface Props {
  isOpen: boolean
  invoice: Invoice
  onOpenChange: () => void
}

export const EditInvoiceModal: React.FC<Props> = function ({ isOpen, onOpenChange, invoice }) {
  const { update } = useInvoicesContext()

  const { form, handleChange, reset } = useForm<Invoice>({
    id: invoice.id,
    vendor: {
      id: invoice.vendor.id,
      name: invoice.vendor.name,
      fullName: invoice.vendor.fullName
    },
    invoiceNumber: invoice.invoiceNumber,
    amount: invoice.amount,
    emissionDate: invoice.emissionDate,
    dueDate: invoice.dueDate,
    payments: invoice.payments
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    update(form)
  }

  useEffect(() => { if (!isOpen) reset() }, [isOpen])

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(close) => (
          <>
            <ModalHeader>Edit Invoice</ModalHeader>

            <form onSubmit={(e) => {
                handleSubmit(e)
                close()
              }}
            >
              <ModalBody>
                <div className='mb-3'>
                  <p className='text-sm pl-2 mb-1 font-semibold'>Vendor</p>
                  <VendorTag
                    vendor={invoice.vendor}
                    classNames={{
                      container: 'p-3 border w-full rounded-xl',
                      name: 'font-semibold text-primary-600 text-[1em]',
                      fullName: ''
                    }}
                  />
                </div>

                <div className='w-full mb-2'>
                  <p className='text-sm pl-2 mb-1 font-semibold'>Invoice Number</p>
                  <Snippet
                    symbol
                    classNames={{ base: 'w-full' }}
                  >
                    {form.invoiceNumber}
                  </Snippet>
                </div>

                <div className='mb-2'>
                  <p className='text-sm pl-2 mb-1 font-semibold'>Amount</p>
                  <Input
                    type='number'
                    name='amount'
                    className='mb-3'
                    value={form.amount.toString()}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <p className='text-sm pl-2 mb-1 font-semibold'>Dates</p>
                  <div className='flex gap-2'>
                    <Input
                      type='date'
                      name='emissionDate'
                      label='Emission Date'
                      placeholder='2024-10-23'
                      className='mb-3'
                      value={form.emissionDate}
                      onChange={handleChange}
                    />

                    <Input
                      type='date'
                      name='dueDate'
                      label='Due Date'
                      placeholder='2024-10-23'
                      className='mb-3'
                      value={form.dueDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color='primary' type='submit'>
                  Confirm changes
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
