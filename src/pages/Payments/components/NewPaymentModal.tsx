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
  ModalHeader
} from '@nextui-org/react'

import { useForm } from '@/hooks'
import { Invoice } from '@/types'
import { currencyFormat } from '@/utils'
import { VendorTag } from '@/components/ui'
import { useVendorContext } from '@/pages/Vendors/context'
import { useInvoicesContext } from '@/pages/Invoices/context'
import { usePaymentsContext } from '../context'

interface Props {
  isOpen: boolean
  onOpenChange: () => void
}

export const NewPaymentModal: React.FC<Props> = function ({ isOpen, onOpenChange }) {
  const { vendors } = useVendorContext()
  const { getByVendor, getAll } = useInvoicesContext()
  const { create } = usePaymentsContext()

  const [invoices, setInvoices] = useState<Invoice[]>([])

  const [vendorKey, setVendorKey] = useState<React.Key | null>(null)
  const [invoiceKey, setInvoiceKey] = useState<React.Key | null>(null)

  const invoiceBalance = (): string | undefined => {
    if (invoiceKey !== null) {
      const invoice = invoices.find(i => i.id === Number(invoiceKey.toString()))

      if (invoice !== undefined) {
        const paid = invoice.payments.reduce((paid, current) => paid  + current.amount, 0)
        return `Balance: ${currencyFormat(invoice.amount - paid)}`
      }
    }
  }

  const { form, handleChange, reset } = useForm({
    vendor: '',
    amount: '',
    invoiceId: '',
    paymentDate: new Date().toISOString().split('T')[0]
  })

  const onVendorChange = (key: React.Key) => {
    form.vendor = key?.toString()
    setVendorKey(key)
  }

  const onInvoiceChange = (key: React.Key) => {
    form.invoiceId = key?.toString()
    setInvoiceKey(key)
  }

  const handlePayment =  (): void => {
    if (Object.values(form).includes('')) return

    create({
      amount: Number(form.amount),
      invoiceId: Number(form.invoiceId),
      paymentDate: form.paymentDate
    })

    setVendorKey(null)
    setInvoiceKey(null)

    reset()
    getAll()
  }

  const getBalance = (invoice: Invoice): number => {
    const paid = invoice.payments.reduce((paid, curr) => paid + curr.amount, 0)
    return invoice.amount - paid
  }

  useEffect(() => {
    (async () => {
      if (vendorKey !== null) {
        const invoices = await getByVendor(Number(form.vendor))
        const filtered = invoices.filter(i => {
          const paid = i.payments.reduce((paid, current) => paid  + current.amount, 0)
          const balance = i.amount - paid

          return balance !== 0
        })
        setInvoices(filtered)
      }
    })()
  }, [form.vendor])

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='pb-3'>
      <ModalContent>
        {(close) => (
          <>
            <ModalHeader>
              <h3 className='text-lg font-bold'>Make a Payment</h3>
            </ModalHeader>

            <ModalBody>
              <Autocomplete
                label='Vendors'
                name='vendor'
                placeholder='Select a vendor'
                defaultItems={vendors}
                onSelectionChange={onVendorChange}
                allowsCustomValue
              >
                {(vendor) => (
                  <AutocompleteItem key={vendor.id} textValue={vendor.name}>
                    <VendorTag vendor={vendor} />
                  </AutocompleteItem>
                )}
              </Autocomplete>

              <Autocomplete
                label='Invoices'
                name='invoiceId'
                placeholder={(vendorKey === null) || invoices.length === 0 ? 'There is no invoice to pay' : 'Search the invoice you want to pay'}
                defaultItems={invoices}
                onSelectionChange={onInvoiceChange}
                isDisabled={(vendorKey === null) || invoices.length === 0}
                description={invoiceBalance()}
                allowsCustomValue
              >
                {(invoice) => (
                  <AutocompleteItem key={invoice.id} textValue={invoice.invoiceNumber}>
                    <div>
                      <p className='font-semibold text-primary text-xs'>
                        {invoice.invoiceNumber}
                      </p>
                      <small className='text-xs font-medium text-foreground-500'>
                        {currencyFormat(getBalance(invoice))}
                      </small>
                    </div>
                  </AutocompleteItem>
                )}
              </Autocomplete>

              <Input
                type='number'
                name='amount'
                label='Amount'
                placeholder='Amount of the payment'
                value={form.amount}
                onChange={handleChange}
                startContent={'S/'}
              />
            </ModalBody>

            <ModalFooter>
              <Button color='primary' onClick={() => {
                handlePayment()
                close()
              }}>Make the payment</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
