import { useEffect, useState } from 'react'

import { VendorsApi } from '@/api'
import type { Vendor, VendorContextType } from '@/types'

export const useVendors = (): VendorContextType => {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [currentVendor, setCurrentVendor] = useState<Vendor | null>(null)

  const create = async (vendor: Omit<Vendor, 'balance' | 'id'>): Promise<void> => {
    const newVendor = await VendorsApi.createVendor(vendor)
    setVendors(v => [...v, newVendor])
  }

  const getAll = async (): Promise<void> => {
    const vendors = await VendorsApi.getVendors()
    setVendors(vendors)
  }

  const getOne = async (id: number): Promise<void> => {
    const vendor = await VendorsApi.getVendorById(id)
    setCurrentVendor(vendor)
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
    currentVendor,
    create,
    getAll,
    getOne,
    remove,
    update
  }
}