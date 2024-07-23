import axios from 'axios'

export const DOMAIN = import.meta.env.VITE_API_URL

export const config = axios.create({
  baseURL: `${DOMAIN}/invoices/api`
})
