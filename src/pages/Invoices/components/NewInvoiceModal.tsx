import React, { useEffect, useState } from 'react'
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  DatePicker
} from '@nextui-org/react'
import { type CalendarDate, parseDate } from '@internationalized/date'

import { useForm } from '@/hooks'
import { VendorTag } from '@/components/ui'
import type { Invoice, InvoiceDtoProps, Vendor } from '@/types'
import { useInvoicesContext } from '../context'
import { useVendorContext } from '@/pages/Vendors/context'

interface Props {
  isOpen: boolean
  onOpenChange: () => void
  onClose: () => void
  onCreate: (invoice: Invoice) => void
}

export const NewInvoiceModal: React.FC<Props> = function ({ isOpen, onOpenChange, onCreate, onClose }) {
  const { getAll } = useVendorContext()
  const { create } = useInvoicesContext()

  const [vendor, setVendor] = useState('')
  const [vendors, setVendors] = useState<Vendor[]>([])

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

  const [emissionDate, setEmissionDate] = useState<CalendarDate>()
  const [dueDate, setDueDate] = useState<CalendarDate>()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.target.value = e.target.value.toUpperCase()
    handleChange(e)
  }

  const handleClose = (): void => {
    setVendor('')
    reset()
    onClose()
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    if (Object.values(form).includes('')) return
    if (new Date(form.emissionDate) > new Date(form.dueDate)) {
      alert('La fecha de emisión no puede ser mayor a la de vencimiento ')
      return
    }

    const newInvoice = await create(form)
    onCreate(newInvoice)
    handleClose()
  }

  useEffect(() => {
    const getAllVendors = async (): Promise<void> => {
      const { data } = await getAll(0)
      setVendors(data)
    }

    getAllVendors().catch(console.error)
  }, [getAll])

  useEffect(() => {
    if (emissionDate !== undefined && emissionDate !== null) {
      form.emissionDate = emissionDate.toString()
    } else {
      setEmissionDate(parseDate(new Date().toISOString().split('T')[0]))
    }

    if (dueDate !== undefined && dueDate !== null) {
      form.dueDate = dueDate.toString()
    } else {
      setDueDate(parseDate(new Date().toISOString().split('T')[0]))
    }
  }, [emissionDate, dueDate, form])

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={handleClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader>Create New Invoice</ModalHeader>

            <form onSubmit={(e) => { handleSubmit(e).catch(console.error) }}>
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
                  {(vendor: Vendor) => (
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
                  onChange={handleInputChange}
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
                  <DatePicker
                    name='emissionDate'
                    label='Emission Date'
                    className='mb-3'
                    value={emissionDate}
                    onChange={setEmissionDate}
                  />

                  <DatePicker
                    name='dueDate'
                    label='Due Date'
                    className='mb-3'
                    value={dueDate}
                    onChange={setDueDate}
                  />
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color='primary' type='submit'>
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
