import { useEffect, useState } from 'react'
import { Autocomplete, AutocompleteItem, Card } from '@nextui-org/react'

import { type Vendor } from '@/types'
import { useVendorContext } from '@/context'
import { SearchIcon } from '@/components/icons'
import { VendorTag } from '@/components/ui'
import { useSearchParams } from 'react-router-dom'

interface Props {
  onSearch?: () => void
}

export const FilterBar: React.FC<Props> = function ({ onSearch }) {
  const { getAll } = useVendorContext()
  const [search, setSearParams] = useSearchParams()

  const [vendors, setVendors] = useState<Vendor[]>([])
  const [vendorKey, setVendorKey] = useState<React.Key | null>(null)

  useEffect(() => {
    const getAllVendors = async (): Promise<void> => {
      const { data } = await getAll(0)
      setVendors(data)
    }

    getAllVendors().catch(console.error)
  }, [getAll])

  useEffect(() => {
    setSearParams(
      (vendorKey !== null)
        ? { vendorId: vendorKey.toString() }
        : {}
    )

    if (onSearch !== undefined) onSearch()
  }, [vendorKey, onSearch, setSearParams, search])

  return (
    <Card shadow='none' radius='none' className='p-5 border-b border-divider'>
      <Autocomplete
        placeholder='Select a vendor'
        label='Search by vendor'
        labelPlacement='outside'
        defaultItems={vendors}
        startContent={<SearchIcon />}
        className='max-w-[300px] [&_[data-slot=main-wrapper]]:border [&_[data-slot=main-wrapper]]:rounded-xl [&_[data-slot=main-wrapper]]:border-divider'
        onSelectionChange={setVendorKey}
        selectedKey={vendorKey?.toString()}
        classNames={{ base: 'font-semibold' }}
      >
        {(vendor) => (
          <AutocompleteItem key={vendor.id} textValue={vendor.name}>
            <VendorTag vendor={vendor} />
          </AutocompleteItem>
        )}
      </Autocomplete>
    </Card>
  )
}
