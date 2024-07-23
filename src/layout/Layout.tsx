import { Sidebar } from '@/components/ui/Sidebar'

interface Props {
  children: React.ReactNode
}

export const Layout: React.FC<Props> = function ({ children }) {
  return (
    <div className='min-h-screen grid grid-cols-[300px_1fr] dark:bg-zinc-800'>
      <Sidebar brand={import.meta.env.VITE_BRAND_NAME} />
      <main>
        {children}
      </main>
    </div>
  )
}
