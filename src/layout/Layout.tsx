import { Sidebar } from '@/components/ui/Sidebar'
import { useState } from 'react'

interface Props {
  children: React.ReactNode
}

export const Layout: React.FC<Props> = function ({ children }) {
  const [isOpen] = useState(true)

  const sidebarWidth = (isOpen) ? 'grid-cols-[300px_1fr]' : 'grid-cols-[100px_1fr]'

  return (
    <div className={`h-screen grid ${sidebarWidth} dark:bg-zinc-800`}>
      <Sidebar isOpen={isOpen} brand={import.meta.env.VITE_BRAND_NAME} />
      <main className='grid grid-rows-[100px_1fr] overflow-y-auto'>
        {children}
      </main>
    </div>
  )
}
