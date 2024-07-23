import React, { type ReactNode, createContext, useContext } from 'react'

import { useInvoices } from '@/hooks'
import { type InvoicesContextType } from '@/types'

const InvoicesContext = createContext((null as unknown) as InvoicesContextType)

interface Props {
  children: ReactNode
}
export const InvoicesContextProvider: React.FC<Props> = ({ children }) => {
  const value = useInvoices()

  return (
    <InvoicesContext.Provider value={value}>
      {children}
    </InvoicesContext.Provider>
  )
}

export const useInvoicesContext = (): InvoicesContextType => useContext(InvoicesContext)
