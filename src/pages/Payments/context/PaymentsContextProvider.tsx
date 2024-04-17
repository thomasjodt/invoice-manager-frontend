import { ReactNode, createContext, useContext } from 'react'

import type { PaymentsContextType } from '@/types'
import { usePayments } from '../hooks'

const PaymentsContext = createContext((null as unknown )as PaymentsContextType)

interface Props {
  children: ReactNode
}

export const PaymentsContextProvider: React.FC<Props> = function ({ children }) {
  const { payments, create, getAll, getOne, update, remove } = usePayments()
  return (
    <PaymentsContext.Provider value={{ create, getAll, getOne, payments, remove, update }}>
      {children}
    </PaymentsContext.Provider>
  )
}

export const usePaymentsContext = (): PaymentsContextType => useContext(PaymentsContext)