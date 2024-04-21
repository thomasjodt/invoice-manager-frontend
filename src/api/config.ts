import axios from 'axios'

export const DOMAIN = 'http://localhost:8080'

export const config = axios.create({
  baseURL: DOMAIN + '/invoices/api'
})
