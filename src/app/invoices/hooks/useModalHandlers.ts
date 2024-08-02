import { useState } from 'react'
import type { Invoice } from '@/types'

interface UseModalHandlers {
  newIsOpen: boolean
  selectedInvoice?: Invoice
  payingInvoice?: Invoice
  handleView: (invoice: Invoice) => void
  handleCreate: () => void
  handleCloseEdit: () => void
  handleOpenNewInvoiceModal: () => void
  handleCloseNew: () => void
  handleOpenPay: (invoice: Invoice) => void
  handleClosePay: () => void
  handlePay: () => void
}

export const useModalHandlers = (page: number, numberOfItems: number, getInvoices: (page: number, itemsPerPage: number) => Promise<void>): UseModalHandlers => {
  const [newIsOpen, setNewIsOpen] = useState<boolean>(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | undefined>()
  const [payingInvoice, setPayingInvoice] = useState<Invoice | undefined>()

  const handleView = (invoice: Invoice): void => {
    setSelectedInvoice(invoice)
  }

  const handleCreate = (): void => {
    getInvoices(page, numberOfItems).catch(console.error)
  }

  const handleCloseEdit = (): void => {
    setSelectedInvoice(undefined)
  }

  const handleOpenNewInvoiceModal = (): void => {
    setNewIsOpen(true)
  }

  const handleCloseNew = (): void => {
    setNewIsOpen(false)
  }

  const handleOpenPay = (invoice: Invoice): void => {
    setPayingInvoice(invoice)
  }

  const handleClosePay = (): void => {
    setPayingInvoice(undefined)
  }

  const handlePay = (): void => {
    getInvoices(page, numberOfItems).catch(console.log)
  }

  return {
    newIsOpen,
    selectedInvoice,
    payingInvoice,
    handleView,
    handleCreate,
    handleCloseEdit,
    handleOpenNewInvoiceModal,
    handleCloseNew,
    handleOpenPay,
    handleClosePay,
    handlePay
  }
}
