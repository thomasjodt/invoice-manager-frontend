import { Sidebar } from '@/components/ui/Sidebar'
import { useAppContext } from '@/context'

interface Props {
  children: React.ReactNode
}

export const Layout: React.FC<Props> = function ({ children }) {
  const { isExpanded } = useAppContext()

  const sidebarWidth = (isExpanded) ? 'grid-cols-[300px_1fr]' : 'grid-cols-[80px_1fr]'

  return (
    <div className={`h-screen grid ${sidebarWidth} dark:bg-zinc-800`}>
      <Sidebar isOpen={isExpanded} brand={import.meta.env.VITE_BRAND_NAME} />
      <main className='grid grid-rows-[100px_1fr] overflow-y-auto'>
        {children}
      </main>
    </div>
  )
}
