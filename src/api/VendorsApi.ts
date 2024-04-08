import { http } from '@/data'
import type { Vendor } from '@/types'

export class VendorsApi {
  static http = http

  static async getVendors (): Promise<Vendor[]> {
    const { data } = await http.get<Vendor[]>('/vendors')
    return data
  }

  static async getVendorById (id: number): Promise<Vendor> {
    const { data } = await http.get<Vendor>(`/vendors/${id}`)
    return data
  }

  static async createVendor (vendor: Pick<Vendor, 'name' | 'fullName'>): Promise<Vendor> {
    const { data } = await http.post<Vendor>('/vendors', vendor)
    return data
  }

  static async updateVendor (id: number, vendor: Pick<Vendor, 'name' | 'fullName'>): Promise<Vendor> {
    const { data } = await http.put<Vendor>(`/vendors/${id}`, vendor)
    return data
  }

  static async deleteVendor (id: number): Promise<void> {
    await http.delete(`/vendors/${id}`)
  }
}