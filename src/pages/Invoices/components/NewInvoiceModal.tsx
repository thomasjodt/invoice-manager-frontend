import { useEffect, useState } from 'react'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem
} from '@nextui-org/react'

import { VendorTag } from '@/components/ui'
import { http } from '@/data'
import { useForm } from '@/hooks'
import { InvoiceDto } from '@/models'
import type { Invoice, InvoiceDtoProps, Vendor } from '@/types'

interface Props {
  isOpen: boolean
  onOpenChange: () => void
  update: (invoice: Invoice) => void
}

export const NewInvoiceModal: React.FC<Props> = function ({ isOpen, onOpenChange, update }) {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [isVendorsOpen, setIsVendorsOpen] = useState(false)
  const { form, handleChange, reset } = useForm<InvoiceDtoProps>({ vendor: '', invoiceNumber: '', amount: '', dueDate: '', emissionDate: '' })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, close: () => void): Promise<void> => {
    event.preventDefault()
    if (Object.values(form).includes('')) return

    const { data } = await http.post<Invoice>('/invoices', new InvoiceDto(form))
    update(data)
    close()
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    if (event.target.value.length === 0) return
    handleChange((event as unknown) as React.ChangeEvent<HTMLInputElement>)
  }

  useEffect(() => {
    (async (): Promise<void> => {
      const { data } = await http.get<Vendor[]>('/vendors')
      setVendors(data)
    })().catch(console.error)
  }, [])

  useEffect(() => {
    if (!isOpen) reset()
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(close) => (
          <>
            <ModalHeader>Create New Invoice</ModalHeader>

            <form onSubmit={(e) => { handleSubmit(e, close) }}>
              <ModalBody>
                <Select
                  name='vendor'
                  label='Vendor'
                  className='mb-3'
                  placeholder='Select a vendor'
                  items={vendors}
                  isOpen={isVendorsOpen}
                  selectedKeys={form.vendor}
                  onOpenChange={() => { setIsVendorsOpen(!isVendorsOpen) }}
                  onChange={handleSelectChange}
                >
                  {
                    (vendor) => (
                      <SelectItem
                        key={vendor.id}
                        value={vendor.id}
                        textValue={vendor.name}
                        onPress={() => { setIsVendorsOpen(false) }}
                      >
                        <VendorTag vendor={vendor} />
                      </SelectItem>
                    )
                  }
                </Select>

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