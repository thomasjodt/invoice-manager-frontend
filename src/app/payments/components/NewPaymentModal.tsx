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
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'

import { useForm, useInvoices, useVendors } from '@/hooks'
import type { Vendor, Invoice } from '@/types'
import { currencyFormat } from '@/utils'
import { VendorTag } from '@/components/ui'

interface OnCreate { amount: string, invoiceId: string, paymentDate: string, vendor: string }
interface Props {
  isOpenModal?: boolean
  onCreate?: (form: OnCreate) => void
  onCloseModal?: () => void
}

export const NewPaymentModal: React.FC<Props> = function ({ isOpenModal = false, onCloseModal, onCreate }) {
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure()
  const { getInvoiceByVendor, getAllInvoices } = useInvoices()
  const { getAllVendors } = useVendors()

  const [vendors, setVendors] = useState<Vendor[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])

  const [vendorKey, setVendorKey] = useState<React.Key | null>(null)
  const [invoiceKey, setInvoiceKey] = useState<React.Key | null>(null)

  const invoiceBalance = (): string | undefined => {
    if (invoiceKey !== null) {
      const invoice = invoices.find(i => i.id === Number(invoiceKey.toString()))

      if (invoice !== undefined) {
        const paid = invoice.payments.reduce((paid, current) => paid + current.amount, 0)
        return `Balance: ${currencyFormat(invoice.amount - paid)}`
      }
    }
  }

  const { form, handleChange, reset } = useForm<OnCreate>({
    vendor: '',
    amount: '',
    invoiceId: '',
    paymentDate: new Date().toISOString().split('T')[0]
  })

  const onVendorChange = (key: React.Key): void => {
    form.vendor = key?.toString()
    setVendorKey(key)
  }

  const onInvoiceChange = (key: React.Key): void => {
    form.invoiceId = key?.toString()
    setInvoiceKey(key)
  }

  const handlePayment = (): void => {
    if (Object.values(form).includes('')) return

    if (onCreate !== undefined) onCreate(form)

    setVendorKey(null)
    setInvoiceKey(null)

    reset()
    getAllInvoices().catch(console.error)
  }

  const getBalance = (invoice: Invoice): number => {
    const paid = invoice.payments.reduce((paid, curr) => paid + curr.amount, 0)
    return invoice.amount - paid
  }

  useEffect(() => {
    (async () => {
      if (vendorKey !== null) {
        const response = await getInvoiceByVendor(Number(form.vendor))
        const invoices = response.data
        const filtered = invoices.filter(i => {
          const paid = i.payments.reduce((paid, current) => paid + current.amount, 0)
          const balance = i.amount - paid

          return balance !== 0
        })
        setInvoices(filtered)
      }
    })().catch(console.error)
  }, [form.vendor, getInvoiceByVendor, vendorKey])

  useEffect(() => {
    const getAllVendorsUseEffect = async (): Promise<void> => {
      const { data } = await getAllVendors(0)
      setVendors(data)
    }

    getAllVendorsUseEffect().catch(console.error)
  }, [getAllVendors])

  useEffect(() => {
    (isOpenModal) ? onOpen() : onClose()
  }, [isOpenModal, onOpen, onClose])

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='pb-3' onClose={onCloseModal}>
      <ModalContent>
        {(close) => (
          <>
            <ModalHeader>
              <h3 className='text-lg font-bold text-default-800'>Hacer un pago</h3>
            </ModalHeader>

            <ModalBody>
              <Autocomplete
                label='Proveedores'
                name='vendor'
                placeholder='Selecciona un proveedor'
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
                label='Facturas'
                name='invoiceId'
                placeholder={(vendorKey === null) || invoices.length === 0 ? 'No har facturas para mostrar' : 'Busca la factura que deseas pagar'}
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
                label='Monto'
                placeholder='Monto del pago'
                value={form.amount}
                onChange={handleChange}
                startContent='S/'
              />
            </ModalBody>

            <ModalFooter>
              <Button
                color='primary' onClick={() => {
                  handlePayment()
                  close()
                }}
              >Continuar con el pago
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
