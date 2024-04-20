import { NextUIProvider } from '@nextui-org/react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import { Layout } from './layout/Layout'
import { VendorContextProvider } from './pages/Vendors/context/VendorContext'
import { PaymentsContextProvider } from './pages/Payments/context'
import { InvoicesContextProvider } from './pages/Invoices/context'
import { Suspense, lazy } from 'react'

const Invoices = lazy(async () => await import('@/pages/Invoices/Invoices'))
const Vendors = lazy(async () => await import('@/pages/Vendors/Vendors'))
const Payments = lazy(async () => await import('@/pages/Payments/Payments'))

export const App: React.FC = () => {
  const navigate = useNavigate()

  return (
    <NextUIProvider navigate={navigate}>
      <InvoicesContextProvider>
        <VendorContextProvider>
          <Layout>
            <Routes>
              <Route path='invoices' element={<Suspense><Invoices /></Suspense>} />
              <Route path='vendors' element={<Suspense><Vendors /></Suspense>} />
              <Route
                path='payments'
                element={
                  <PaymentsContextProvider>
                    <Suspense>
                      <Payments />
                    </Suspense>
                  </PaymentsContextProvider>
                }
              />
              <Route path='*' element={<Navigate to='invoices' />} />
            </Routes>
          </Layout>
        </VendorContextProvider>
      </InvoicesContextProvider>
    </NextUIProvider>
  )
}
