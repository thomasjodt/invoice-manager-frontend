import axios from 'axios'
import type { Vendor } from '@/types'
import { useEffect, useState } from 'react'
import { SearchIcon, PlusIcon } from '@/components/icons'
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { RenderCell } from './utils/RenderCell'
import { Header } from '@/components/ui/Header'

const columns = [
  { name: 'VENDOR', uid: 'vendor' },
  { name: 'BALANCE', uid: 'balance' },
  { name: 'ACTIONS', uid: 'actions' }
]

export const Vendors: React.FC = function () {
  const [vendors, setVendors] = useState<Vendor[]>([])

  useEffect(() => {
    const getUsers = async (): Promise<void> => {
      const { data } = await axios.get<Vendor[]>('http://localhost:8080/invoices/api/vendors/balance')
      setVendors(data)
      console.log(vendors)
    }

    getUsers().catch(console.log)
  }, [])

  return (
    <section>
      <Header
        title='Vendors'
        actionButton={
          <Button color='primary' variant='solid'>
            Add Vendor
            <PlusIcon size={18} />
          </Button>
        }
      />

      <div className='px-8 mt-5'>
        <Input
          label='Vendor'
          labelPlacement='inside'
          isClearable
          startContent={<SearchIcon />}
          className='max-w-[300px] text-neutral-400 mb-3'
          placeholder='Search by name...'
        />

        <div className='mb-3 text-neutral-400 font-medium'>Total {vendors.length} vendors</div>
        <Table removeWrapper aria-label='Table that shows a list of all vendors.' className='max-w-[1000px] mx-auto'>
          <TableHeader columns={columns} className=''>
            {(column) => (
              <TableColumn key={column.uid} className='font-bold'>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>

          <TableBody items={vendors} emptyContent='No vendors found'>
            {(vendor) => (
              <TableRow key={vendor.id}>
                {
                  (columnKey) =>
                    <TableCell>
                      <RenderCell
                        vendor={vendor}
                        columnKey={columnKey}
                      />
                    </TableCell>
                }
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
