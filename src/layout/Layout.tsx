import { Sidebar } from '@/components/ui/Sidebar'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}
export const Layout: React.FC<Props> = function ({ children }) {
  return (
    <div className='min-h-screen grid grid-cols-[300px_1fr] gap-2'>
      <Sidebar />
      <main>
        {children}
      </main>
    </div>
  )
}
