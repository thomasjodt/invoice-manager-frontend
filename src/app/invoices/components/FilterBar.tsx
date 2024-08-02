import { useEffect, useState, type Key } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Autocomplete, AutocompleteItem, Card } from '@nextui-org/react'

import { useVendors } from '@/hooks'
import { type Vendor } from '@/types'
import { SearchIcon } from '@/components/icons'
import { VendorTag } from '@/components/ui'

interface Props {
  onSearch?: () => void
}

export const FilterBar: React.FC<Props> = function () {
  const { getAllVendors } = useVendors()
  const [search, setSearchParams] = useSearchParams()

  const [vendors, setVendors] = useState<Vendor[]>([])
  const [vendorKey, setVendorKey] = useState<React.Key | null>(null)

  const handleSelectionChange = (key: Key): void => {
    setVendorKey(key)

    if (key === null) {
      const query = new URLSearchParams(search)
      query.delete('vendorId')
      setSearchParams(query)
    } else {
      setSearchParams(p => ({ ...p, vendorId: key.toString() }))
    }
  }

  useEffect(() => {
    getAllVendors(0)
      .then(({ data }) => { setVendors(data) })
      .catch(console.error)
  }, [getAllVendors])

  return (
    <Card shadow='none' radius='none' className='p-5 border-b border-divider'>
      <Autocomplete
        placeholder='Select a vendor'
        label='Search by vendor'
        labelPlacement='outside'
        items={vendors}
        startContent={<SearchIcon />}
        className='max-w-[300px] [&_[data-slot=main-wrapper]]:border [&_[data-slot=main-wrapper]]:rounded-xl [&_[data-slot=main-wrapper]]:border-divider'
        onSelectionChange={handleSelectionChange}
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
