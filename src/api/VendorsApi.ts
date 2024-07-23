import { config } from '.'
import type { ApiResponse, Vendor } from '@/types'

export const VendorsApi = {
  getVendors: async (page: number = 0, offset: number = 5): Promise<ApiResponse<Vendor[]>> => {
    if (page < 0) throw new Error('The page cannot be less than zero.')

    const res = (page === 0)
      ? await config.get<ApiResponse<Vendor[]>>('/vendors')
      : await config.get<ApiResponse<Vendor[]>>(`/vendors?page=${page}&offset=${offset}`)

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

  getByName: async (name: string, page: number = 1, offset: number = 1): Promise<ApiResponse<Vendor[]>> => {
    const { data } = await config.get(`/vendors?name=${name}&page=${page}&offset=${offset}`)
    return data
  }
}
