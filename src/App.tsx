import { Invoices, Vendors } from '@/pages'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { Layout } from './layout/Layout'
import { NextUIProvider } from '@nextui-org/react'
import { Payments } from './pages/Payments'

export const App: React.FC = () => {
  const navigate = useNavigate()

  return (
    <NextUIProvider navigate={navigate}>
      <Layout>
        <Routes>
          <Route path='invoices' element={<Invoices />} />
          <Route path='vendors' element={<Vendors />} />
          <Route path='payments' element={<Payments />} />
          <Route path='*' element={<Navigate to='invoices' />} />
        </Routes>
      </Layout>
    </NextUIProvider>
  )
}
