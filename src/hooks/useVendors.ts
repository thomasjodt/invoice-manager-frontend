import { VendorsApi } from '@/api'
import type { ApiResponse, Vendor } from '@/types'
import { create } from 'zustand'

export const useVendors = create(() => ({
  createVendor: async (vendor: Pick<Vendor, 'name' | 'fullName'>): Promise<Vendor> => {
    return await VendorsApi.createVendor(vendor)
  },

  getAllVendors: async (page: number = 0, offset: number = 5): Promise<ApiResponse<Vendor[]>> => {
    return await VendorsApi.getVendors(page, offset)
  },

  getVendorByName: async (name: string, page?: number, offset?: number): Promise<ApiResponse<Vendor[]>> => {
    return await VendorsApi.getByName(name, page, offset)
  },

  getVendor: async (id: number): Promise<Vendor> => {
    return await VendorsApi.getVendorById(id)
  },

  updateVendor: async (id: number, vendor: Pick<Vendor, 'name' | 'fullName'>): Promise<Vendor> => {
    return await VendorsApi.updateVendor(id, vendor)
  },

  deleteVendor: async (id: number): Promise<void> => {
    await VendorsApi.deleteVendor(id)
  }
}))
