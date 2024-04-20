import { useEffect, useState } from 'react'
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react'

import { useForm } from '@/hooks'
import { VendorTag } from '@/components/ui'
import type { InvoiceDtoProps } from '@/types'
import { useInvoicesContext } from '../context'
import { useVendorContext } from '@/pages/Vendors/context'

interface Props {
  isOpen: boolean
  onOpenChange: () => void
}

export const NewInvoiceModal: React.FC<Props> = function ({ isOpen, onOpenChange }) {
  const { vendors, getAll } = useVendorContext()
  const { create } = useInvoicesContext()

  const [vendor, setVendor] = useState('')

  const onchange = (value: string): void => {
    const vendor = vendors.find(v => v.name === value)
    if (vendor !== undefined) form.vendor = vendor.id.toString()
    setVendor(value)
  }

  const { form, handleChange, reset } = useForm<InvoiceDtoProps>({
    vendor: '',
    invoiceNumber: '',
    amount: '',
    dueDate: '',
    emissionDate: ''
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, close: () => void): void => {
    event.preventDefault()

    if (Object.values(form).includes('')) return
    if (new Date(form.emissionDate) > new Date(form.dueDate)) {
      alert('La fecha de emisión no puede ser mayor a la de vencimiento ')
      return
    }

    create(form).catch(console.error)
    close()
  }

  useEffect(() => {
    if (!isOpen) {
      reset()
      setVendor('')
    }
  }, [isOpen])

  useEffect(() => {
    getAll(0).catch(console.error)
  }, [])

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(close) => (
          <>
            <ModalHeader>Create New Invoice</ModalHeader>

            <form onSubmit={(e) => { handleSubmit(e, close) }}>
              <ModalBody>
                <Autocomplete
                  name='vendor'
                  label='Vendor'
                  placeholder='Select a vendor'
                  defaultItems={vendors}
                  inputValue={vendor}
                  onInputChange={onchange}
                  allowsCustomValue
                >
                  {(vendor) => (
                    <AutocompleteItem key={vendor.id} textValue={vendor.name}>
                      <VendorTag vendor={vendor} />
                    </AutocompleteItem>
                  )}
                </Autocomplete>

                <Input
                  maxLength={13}
                  label='Invoice Number'
                  placeholder='FF01-12345678'
                  className='mb-3'
                  value={form.invoiceNumber}
                  onChange={handleChange}
                  name='invoiceNumber'
                />

                <Input
                  label='Amount'
                  placeholder=''
                  type='number'
                  className='mb-3'
                  name='amount'
                  value={form.amount}
                  onChange={handleChange}
                />

                <div className='flex gap-2'>
                  <Input
                    type='date'
                    label='Emission Date'
                    placeholder='2024-10-23'
                    className='mb-3'
                    onChange={handleChange}
                    name='emissionDate'
                    value={form.emissionDate}
                  />

                  <Input
                    type='date'
                    label='Due Date'
                    placeholder='2024-10-23'
                    className='mb-3'
                    onChange={handleChange}
                    name='dueDate'
                    value={form.dueDate}
                  />
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color="primary" type='submit'>
                  Create Invoice
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
