import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  isExpanded: boolean
  isDark: boolean
}

interface Actions {
  toggleSidebar: () => void
  toggleTheme: () => void
}

export const useAppSettings = create(persist<State & Actions>((set) => ({
  isExpanded: false,
  isDark: false,
  toggleSidebar: () => {
    set(({ isExpanded }) => ({ isExpanded: !isExpanded }))
  },
  toggleTheme: () => {
    set(({ isDark }) => ({ isDark: !isDark }))
  }
}), {
  name: 'app-settings'
}))
