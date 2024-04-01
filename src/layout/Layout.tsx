import { Sidebar } from '@/components/ui/Sidebar'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}
export const Layout: React.FC<Props> = function ({ children }) {
  return (
    <div className='min-h-screen grid grid-cols-[300px_1fr]'>
      <Sidebar />
      <main>
        {children}
      </main>
    </div>
  )
}
