import { Suspense, lazy } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import { Layout } from '@/layout'
import { InvoicesContextProvider, PaymentsContextProvider, VendorContextProvider } from '@/context'

const Invoices = lazy(async () => await import('@/pages/Invoices'))
const Vendors = lazy(async () => await import('@/pages/Vendors'))
const Payments = lazy(async () => await import('@/pages/Payments'))

export const App: React.FC = () => {
  const navigate = useNavigate()

  return (
    <NextUIProvider navigate={navigate} locale='es-ES'>
      <InvoicesContextProvider>
        <VendorContextProvider>
          <PaymentsContextProvider>
            <Layout>
              <Routes>
                <Route path='invoices' element={<Suspense><Invoices /></Suspense>} />
                <Route path='vendors' element={<Suspense><Vendors /></Suspense>} />
                <Route path='payments' element={<Suspense><Payments /></Suspense>} />
                <Route path='*' element={<Navigate to='invoices' />} />
              </Routes>
            </Layout>
          </PaymentsContextProvider>
        </VendorContextProvider>
      </InvoicesContextProvider>
    </NextUIProvider>
  )
}
