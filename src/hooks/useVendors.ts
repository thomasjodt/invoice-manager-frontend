import { VendorsApi } from '@/api'
import type { ApiResponse, Vendor, VendorContextType } from '@/types'

export const useVendors = (): VendorContextType => {
  const createVendor = async (vendor: Pick<Vendor, 'name' | 'fullName'>): Promise<Vendor> => {
    return await VendorsApi.createVendor(vendor)
  }

  const getAllVendors = async (page: number = 0, offset: number = 5): Promise<ApiResponse<Vendor[]>> => {
    return await VendorsApi.getVendors(page, offset)
  }

  const getVendorByName = async (name: string, page?: number, offset?: number): Promise<ApiResponse<Vendor[]>> => {
    return await VendorsApi.getByName(name, page, offset)
  }

  const getVendor = async (id: number): Promise<Vendor> => {
    return await VendorsApi.getVendorById(id)
  }

  const updateVendor = async (id: number, vendor: Pick<Vendor, 'name' | 'fullName'>): Promise<Vendor> => {
    return await VendorsApi.updateVendor(id, vendor)
  }

  const deleteVendor = async (id: number): Promise<void> => {
    await VendorsApi.deleteVendor(id)
  }

  return {
    createVendor,
    getAllVendors,
    getVendor,
    deleteVendor,
    updateVendor,
    getVendorByName
  }
}
