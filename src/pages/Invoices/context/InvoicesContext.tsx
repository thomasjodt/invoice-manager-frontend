import { InvoicesContextType } from '@/types'
import React, { ReactNode, createContext, useContext } from 'react'
import { useInvoices } from '../hooks'

export const InvoicesContext = createContext((null as unknown) as InvoicesContextType)

interface Props {
  children: ReactNode
}
export const InvoicesContextProvider: React.FC<Props> = ({ children }) => {
  const { invoices, create, getAll, getOne, remove, update, getByVendor } = useInvoices()

  return (
    <InvoicesContext.Provider value={{ invoices, create, getAll, getOne, remove, update, getByVendor }}>
      {children}
    </InvoicesContext.Provider>
  )
}

export const useInvoicesContext = (): InvoicesContextType => useContext(InvoicesContext)