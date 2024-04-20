import { http } from '@/data'
import type { ApiResponse, Vendor } from '@/types'

export const VendorsApi = {
  getVendors: async (page: number = 0, offset: number = 5): Promise<ApiResponse<Vendor[]>> => {
    let res

    if (page > 0) {
      res = await http.get<ApiResponse<Vendor[]>>(`/vendors?page=${page}&offset=${offset}`)
    } else {
      res = await http.get<ApiResponse<Vendor[]>>('/vendors')
    }
    return res.data
  },
  getVendorById: async (id: number): Promise<Vendor> => {
    const { data } = await http.get<Vendor>(`/vendors/${id}`)
    return data
  },
  createVendor: async (vendor: Pick<Vendor, 'name' | 'fullName'>): Promise<Vendor> => {
    const { data } = await http.post<Vendor>('/vendors', vendor)
    return data
  },
  updateVendor: async (id: number, vendor: Pick<Vendor, 'name' | 'fullName'>): Promise<Vendor> => {
    const { data } = await http.put<Vendor>(`/vendors/${id}`, vendor)
    return data
  },
  deleteVendor: async (id: number): Promise<void> => {
    await http.delete(`/vendors/${id}`)
  }
}
