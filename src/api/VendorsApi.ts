import { config } from '.'
import type { ApiResponse, Vendor } from '@/types'

export const VendorsApi = {
  getVendors: async (page: number = 0, offset: number = 5): Promise<ApiResponse<Vendor[]>> => {
    let res

    if (page > 0) {
      res = await config.get<ApiResponse<Vendor[]>>(`/vendors?page=${page}&offset=${offset}`)
    } else {
      res = await config.get<ApiResponse<Vendor[]>>('/vendors')
    }
    return res.data
  },
  getVendorById: async (id: number): Promise<Vendor> => {
    const { data } = await config.get<Vendor>(`/vendors/${id}`)
    return data
  },
  createVendor: async (vendor: Pick<Vendor, 'name' | 'fullName'>): Promise<Vendor> => {
    const { data } = await config.post<Vendor>('/vendors', vendor)
    return data
  },
  updateVendor: async (id: number, vendor: Pick<Vendor, 'name' | 'fullName'>): Promise<Vendor> => {
    const { data } = await config.put<Vendor>(`/vendors/${id}`, vendor)
    return data
  },
  deleteVendor: async (id: number): Promise<void> => {
    await config.delete(`/vendors/${id}`)
  },
  getByName: async (name: string): Promise<ApiResponse<Vendor[]>> => {
    const { data } = await config.get(`/vendors?name=${name}`)
    return data
  }
}
