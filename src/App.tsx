import { NextUIProvider } from '@nextui-org/react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import { Layout } from './layout/Layout'
import { Invoices, Vendors, Payments } from '@/pages'
import { VendorContextProvider } from './pages/Vendors/context/VendorContext'
import { PaymentsContextProvider } from './pages/Payments/context'

export const App: React.FC = () => {
  const navigate = useNavigate()

  return (
    <NextUIProvider navigate={navigate}>
      <Layout>
        <Routes>
          <Route path='invoices' element={<Invoices />} />
          <Route path='vendors' element={
            <VendorContextProvider>
              <Vendors />
            </VendorContextProvider>
          } />
          <Route path='payments' element={
            <PaymentsContextProvider>
              <Payments />
            </PaymentsContextProvider>
          } />
          <Route path='*' element={<Navigate to='invoices' />} />
        </Routes>
      </Layout>
    </NextUIProvider>
  )
}
