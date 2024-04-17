import { http } from '@/data'
import type { Vendor } from '@/types'

export class VendorsApi {
  static async getVendors (page: number = 0, offset: number = 5): Promise<Vendor[]> {
    let res

    if (page > 0) {
      res = await http.get<Vendor[]>(`/vendors?page=${page}&offset=${offset}`)
    } else {
      res = await http.get<Vendor[]>('/vendors')
    }
    return res.data
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
