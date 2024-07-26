import { useEffect, useState } from 'react'
import type { AppSettingsContextType } from '@/types'

export const useAppSettings = (): AppSettingsContextType => {
  const localExpanded = JSON.parse(localStorage.getItem('isExpanded') as string) as boolean | null
  const [isExpanded, setIsExpanded] = useState<boolean>(localExpanded ?? false)

  const localTheme = JSON.parse(localStorage.getItem('isDark') as string) as boolean | null
  const [isDark, setIsDark] = useState<boolean>(localTheme ?? false)

  const toggleSidebar = (): void => {
    setIsExpanded(!isExpanded)
  }

  const toggleTheme = (): void => {
    setIsDark(!isDark)
  }

  useEffect(() => {
    localStorage.setItem('isExpanded', JSON.stringify(isExpanded))
  }, [isExpanded])

  useEffect(() => {
    localStorage.setItem('isDark', JSON.stringify(isDark))

    if (isDark) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [isDark])

  return {
    isExpanded,
    isDark,
    toggleTheme,
    toggleSidebar
  }
}
