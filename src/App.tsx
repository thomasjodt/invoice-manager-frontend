import { NextUIProvider } from '@nextui-org/react'

import { Layout } from './layout/Layout'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { Invoices, Vendors, VendorForm, NewVendor, Payments } from '@/pages'

export const App: React.FC = () => {
  const navigate = useNavigate()

  return (
    <NextUIProvider navigate={navigate}>
      <Layout>
        <Routes>
          <Route path='invoices' element={<Invoices />} />
          <Route path='vendors'>
            <Route index element={<Vendors />}/>
            <Route path='new' element={<NewVendor />} />
            <Route path=':id' element={<VendorForm />} />
            <Route path='0' element={<Navigate to='/vendors/new' />} />
          </Route>
          <Route path='payments' element={<Payments />} />
          <Route path='*' element={<Navigate to='invoices' />} />
        </Routes>
      </Layout>
    </NextUIProvider>
  )
}
