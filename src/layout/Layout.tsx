import { Sidebar } from '@/components/ui/Sidebar'
import { useState } from 'react'

interface Props {
  children: React.ReactNode
}

export const Layout: React.FC<Props> = function ({ children }) {
  const [isOpen] = useState(true)

  return (
    <div className={`h-screen grid grid-cols-[${!isOpen ? 100 : 300}px_1fr] dark:bg-zinc-800`}>
      <Sidebar isOpen={isOpen} brand={import.meta.env.VITE_BRAND_NAME} />
      <main className='grid grid-rows-[100px_1fr] overflow-y-auto'>
        {children}
      </main>
    </div>
  )
}
