import { VendorsApi } from '@/api'
import type { ApiResponse, Vendor, VendorContextType } from '@/types'

export const useVendors = (): VendorContextType => {
  const create = async (vendor: Pick<Vendor, 'name' | 'fullName'>): Promise<Vendor> => {
    return await VendorsApi.createVendor(vendor)
  }

  const getAll = async (page: number = 0, offset: number = 5): Promise<ApiResponse<Vendor[]>> => {
    return await VendorsApi.getVendors(page, offset)
  }

  const getByName = async (name: string, page?: number, offset?: number): Promise<ApiResponse<Vendor[]>> => {
    return await VendorsApi.getByName(name, page, offset)
  }

  const getOne = async (id: number): Promise<Vendor> => {
    return await VendorsApi.getVendorById(id)
  }

  const update = async (id: number, vendor: Pick<Vendor, 'name' | 'fullName'>): Promise<Vendor> => {
    return await VendorsApi.updateVendor(id, vendor)
  }

  const remove = async (id: number): Promise<void> => {
    await VendorsApi.deleteVendor(id)
  }

  return {
    create,
    getAll,
    getOne,
    remove,
    update,
    getByName
  }
}
