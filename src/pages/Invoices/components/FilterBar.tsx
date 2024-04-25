import { useEffect, useState } from 'react'
import { Autocomplete, AutocompleteItem, Card } from '@nextui-org/react'

import { type Vendor } from '@/types'
import { useVendorContext } from '@/context'
import { SearchIcon } from '@/components/icons'
import { VendorTag } from '@/components/ui'

interface Props {
  onSearch: (vendorId?: number) => void
}

export const FilterBar: React.FC<Props> = function ({ onSearch }) {
  const { getAll } = useVendorContext()

  const [vendors, setVendors] = useState<Vendor[]>([])
  const [vendorKey, setVendorKey] = useState<React.Key>()

  useEffect(() => {
    const getAllVendors = async (): Promise<void> => {
      const { data } = await getAll(0)
      setVendors(data)
    }

    getAllVendors().catch(console.error)
  }, [getAll])

  useEffect(() => {
    const key = (vendorKey === undefined) ? undefined : Number(vendorKey)
    onSearch(key)
  }, [vendorKey, onSearch])

  return (
    <Card shadow='none' radius='none' className='p-5'>
      <Autocomplete
        placeholder='Select a vendor'
        label='Search by vendor'
        labelPlacement='outside'
        defaultItems={vendors}
        startContent={<SearchIcon />}
        className='max-w-[300px]'
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
