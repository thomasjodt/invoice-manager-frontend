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
import type { Invoice, Vendor } from '@/types'
import { VendorTag } from '@/components/ui'
import { useInvoicesContext } from '@/context'
import { useEffect } from 'react'

interface Props {
  handleUpdate: (updated: Invoice) => void
}

export const EditInvoiceModal: React.FC<Props> = function ({ handleUpdate }) {
  const { update, current, resetEditing, isOpen, onOpenChange } = useInvoicesContext()

  const { form, handleChange } = useForm<Invoice>({
    id: 0,
    amount: 0,
    dueDate: '',
    emissionDate: '',
    invoiceNumber: '',
    payments: [],
    vendor: {
      id: 0,
      name: '',
      fullName: ''
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const updated = await update(form)
    handleUpdate(updated)
    resetEditing()
  }

  useEffect(() => {
    if (current !== null) {
      form.id = current.id
      form.amount = current.amount
      form.vendor = current.vendor
      form.dueDate = current.dueDate
      form.emissionDate = current.emissionDate
      form.invoiceNumber = current.invoiceNumber
      form.payments = current.payments
    }
  }, [current])

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={resetEditing}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader>Edit Invoice</ModalHeader>

            <form onSubmit={(e) => { handleSubmit(e).catch(console.error) }}>
              <ModalBody>
                <div className='mb-3'>
                  <p className='text-sm pl-2 mb-1 font-semibold'>Vendor</p>
                  <VendorTag
                    vendor={current?.vendor as Vendor}
                    classNames={{
                      container: 'p-3 border w-full rounded-xl',
                      name: 'font-semibold text-primary-600 text-[1em]'
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
