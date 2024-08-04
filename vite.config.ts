import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import viteTsConfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsConfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'vitest.setup.ts'
  }
})
