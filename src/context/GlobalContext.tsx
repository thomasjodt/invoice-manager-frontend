import { createContext, useContext } from 'react'
import { useInvoices, usePayments, useVendors } from '@/hooks'
import { type GlobalContextType } from '@/types'

const GlobalContext = createContext(({} as unknown) as GlobalContextType)

interface Props {
  children: React.ReactNode
}

export const Provider: React.FC<Props> = function ({ children }) {
  const invoices = useInvoices()
  const vendors = useVendors()
  const payments = usePayments()

  return (
    <GlobalContext.Provider value={{ ...invoices, ...vendors, ...payments }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useAppContext = (): GlobalContextType => useContext(GlobalContext)
