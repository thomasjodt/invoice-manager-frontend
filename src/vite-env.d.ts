// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_BRAND_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
