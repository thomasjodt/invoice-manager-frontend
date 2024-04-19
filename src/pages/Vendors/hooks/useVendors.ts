import { useEffect, useState } from 'react'

import { VendorsApi } from '@/api'
import type { ApiResponse, Vendor, VendorContextType } from '@/types'

export const useVendors = (): VendorContextType => {
  const [vendors, setVendors] = useState<Vendor[]>([])

  const create = async (vendor: Omit<Vendor, 'balance' | 'id'>): Promise<void> => {
    const newVendor = await VendorsApi.createVendor(vendor)
    setVendors(v => [...v, newVendor])
  }

  const getAll = async (page: number = 0, offset: number = 5): Promise<ApiResponse<Vendor[]>> => {
    const response = await VendorsApi.getVendors(page, offset)
    setVendors(response.data)

    return response
  }

  const getOne = async (id: number): Promise<Vendor> => {
    return await VendorsApi.getVendorById(id)
  }

  const update = async (id: number, vendor: Omit<Vendor, 'id' | 'balance'>): Promise<void> => {
    const updatedVendor = await VendorsApi.updateVendor(id, vendor)
    setVendors(v => v.map(
      vendor => (vendor.id === updatedVendor.id) ? updatedVendor: vendor)
    )
  }

  const remove = async (id: number): Promise<void> => {
    await VendorsApi.deleteVendor(id)
    setVendors(vendors.filter(vendor => vendor.id !== id))
  }

  useEffect(() => {
    getAll().catch(console.log)
  }, [])

  return {
    vendors,
    create,
    getAll,
    getOne,
    remove,
    update
  }
}