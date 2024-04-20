import {
  type ReactNode,
  createContext,
  useContext
} from 'react'

import { useVendors } from '../hooks'
import type { VendorContextType } from '@/types'

interface Props {
  children: ReactNode
}

const VendorContext = createContext((null as unknown) as VendorContextType)

export const VendorContextProvider: React.FC<Props> = function ({ children }) {
  const vendorsValue = useVendors()

  return (
    <VendorContext.Provider value={{ ...vendorsValue }}>
      {children}
    </VendorContext.Provider>
  )
}

export const useVendorContext = (): VendorContextType => useContext(VendorContext)
