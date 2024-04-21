import { type ReactNode, createContext, useContext } from 'react'

import { usePayments } from '../hooks'
import type { PaymentsContextType } from '@/types'

const PaymentsContext = createContext((null as unknown) as PaymentsContextType)

interface Props {
  children: ReactNode
}

export const PaymentsContextProvider: React.FC<Props> = function ({ children }) {
  const value = usePayments()
  return (
    <PaymentsContext.Provider value={value}>
      {children}
    </PaymentsContext.Provider>
  )
}

export const usePaymentsContext = (): PaymentsContextType => useContext(PaymentsContext)
