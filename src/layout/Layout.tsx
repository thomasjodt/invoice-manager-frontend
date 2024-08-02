import { Sidebar } from '@/components/ui/Sidebar'
import { useAppSettings } from '@/hooks'
import { useEffect } from 'react'

interface Props {
  children: React.ReactNode
}

export const Layout: React.FC<Props> = function ({ children }) {
  const { isExpanded, isDark } = useAppSettings()

  const sidebarWidth = (isExpanded) ? 'grid-cols-[300px_1fr]' : 'grid-cols-[80px_1fr]'

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark')
      document.body.classList.remove('light')
    } else {
      document.body.classList.add('light')
      document.body.classList.remove('dark')
    }
  }, [isDark])

  return (
    <div className={`h-screen grid ${sidebarWidth} dark:bg-zinc-80 transition-all duration-500`}>
      <Sidebar isOpen={isExpanded} brand={import.meta.env.VITE_BRAND_NAME} />
      <main className='grid grid-rows-[100px_1fr] overflow-y-auto'>
        {children}
      </main>
    </div>
  )
}
