import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { type Invoice } from '@/types'
import { useAppContext } from '@/context'

interface UseInvoicesActions {
  invoices: Invoice[]
  page: number
  pages: number
  numberOfItems: number
  count: number
  changePage: (newPage: number) => void
  changeNumberOfItems: (items: number) => void
  getInvoices: (page: number, itemsPerPage: number) => Promise<void>
  removeInvoice: (invoice: Invoice) => void
}

export const useInvoicesActions = (): UseInvoicesActions => {
  const { deleteInvoice, getAllInvoices, getInvoiceByVendor } = useAppContext()
  const { deletePayment } = useAppContext()
  const [searchParams] = useSearchParams()

  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [state, setState] = useState({
    count: 0,
    page: 1,
    pages: 0,
    numberOfItems: 5
  })

  const changePage = (newPage: number): void => {
    setState(s => ({ ...s, page: newPage }))
  }

  const changeNumberOfItems = (items: number): void => {
    setState(s => ({ ...s, numberOfItems: items }))
  }

  const removeInvoice = (invoice: Invoice): void => {
    (async () => {
      for await (const payment of invoice.payments) {
        await deletePayment(payment.id)
      }
      await deleteInvoice(invoice.id)
      await getInvoices()
    })().catch(console.log)
  }

  const getInvoices = useCallback(async () => {
    const queriedId = searchParams.get('vendorId')

    const response = (queriedId === null)
      ? await getAllInvoices(state.page, state.numberOfItems)
      : await getInvoiceByVendor(Number(queriedId), state.page, state.numberOfItems)

    const newPage = (response.count % state.numberOfItems === 0) ? 0 : 1
    const pages = Math.floor(response.count / state.numberOfItems) + newPage

    if (state.page > pages) {
      setState(s => ({ ...s, page: pages }))
    }

    setInvoices(response.data)
    setState(s => ({ ...s, count: response.count, pages }))
  }, [getAllInvoices, getInvoiceByVendor, searchParams, state.numberOfItems, state.page])

  useEffect(() => {
    getInvoices().catch(console.error)
  }, [getInvoices])

  return {
    invoices,
    ...state,
    changePage,
    getInvoices,
    removeInvoice,
    changeNumberOfItems
  }
}
