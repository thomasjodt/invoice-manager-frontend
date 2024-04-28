import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Snippet,
  useDisclosure
} from '@nextui-org/react'

import { useForm } from '@/hooks'
import type { Invoice, InvoiceDtoProps } from '@/types'
import { useEffect } from 'react'
import { useInvoicesContext } from '../context'
import { VendorTag } from '@/components/ui'

interface Props {
  onUpdate?: (invoice: Invoice) => void
  isModalOpen?: boolean
  onCloseModal?: () => void
}

export const EditInvoiceModal: React.FC<Props> = function ({ isModalOpen = false, onCloseModal, onUpdate }) {
  const { populateEditing, resetEditing, ...props } = useInvoicesContext()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const current = props.current

  const { form, handleChange, populate } = useForm<InvoiceDtoProps>({
    amount: '',
    dueDate: '',
    emissionDate: '',
    invoiceNumber: '',
    vendor: ''
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (current === null) return

    const formToUpdate: Invoice = {
      ...current,
      amount: Number(form.amount),
      dueDate: form.dueDate,
      emissionDate: form.emissionDate
    }

    if (onUpdate !== undefined) onUpdate(formToUpdate)
    resetEditing()
    onClose()
  }

  useEffect(() => {
    (isModalOpen) ? onOpen() : onClose()
  }, [isModalOpen, onOpen, onClose])

  useEffect(() => {
    if (current !== null) {
      populate({
        amount: current.amount.toString(),
        dueDate: current.dueDate,
        emissionDate: current.emissionDate,
        invoiceNumber: current.invoiceNumber,
        vendor: current.vendor.id.toString()
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseModal}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>Edit Invoice</ModalHeader>

            <form onSubmit={(e) => { handleSubmit(e).catch(console.error) }}>
              <ModalBody>
                <div className='mb-3'>
                  <p className='text-sm pl-2 mb-1 font-semibold'>Vendor</p>
                  {
                    (current !== null) && (
                      <VendorTag
                        vendor={current.vendor}
                        classNames={{
                          container: 'p-3 border w-full rounded-xl',
                          name: 'font-semibold text-primary-600 text-[1em]'
                        }}
                      />
                    )
                  }
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
                    autoFocus
                    value={form.amount}
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
