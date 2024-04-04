import axios from 'axios'

export { statuses } from './status'

export const http = axios.create({
  baseURL: 'http://localhost:8080/invoices/api'
})