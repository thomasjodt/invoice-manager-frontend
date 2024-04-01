import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'

import { Invoice } from '@/types'
import { RenderCell } from './utils/RenderCell'
import { Header } from '@/components/ui/Header'
import { PlusIcon, SearchIcon } from '@/components/icons'

const columns = [
  { name: 'VENDOR', uid: 'vendor' },
  { name: 'INVOICE NUMBER', uid: 'invoice_number' },
  { name: 'EMISSION DATE', uid: 'emission_date' },
  { name: 'DUE DATE', uid: 'due_date' },
  { name: 'DAYS', uid: 'days' },
  { name: 'STATUS', uid: 'status' },
  { name: 'AMOUNT', uid: 'amount' },
  { name: 'ON ACCOUNT', uid: 'on_account' },
  { name: 'BALANCE', uid: 'balance' },
  { name: 'ACTIONS', uid: 'actions' }
]

export const Invoices: React.FC = function () {
  const [invoices, setInvoices] = useState<Invoice[]>([])

  useEffect(() => {
    const getInvoices = async () => {
      const { data } = await axios.get('http://localhost:8080/invoices/api/invoices')
      setInvoices(data)
    }

    getInvoices()
  }, [])

  return (
    <section>
      <Header title='Invoices' actionButton={
        <Button color='primary' variant='solid'>
            Add Invoice
          <PlusIcon size={18} />
        </Button>
        }
      />

      <div className='px-8 mt-5'>
        <Input
          label='Vendor'
          labelPlacement='inside'
          startContent={<SearchIcon />}
          className='max-w-[300px] text-neutral-400 mb-3'
          placeholder='Search by vendor name...'
        />

        <div className='mb-3 text-neutral-400 font-medium'>Total {invoices.length} invoices</div>
        <Table removeWrapper aria-label='Table that shows a list of all invoices.' className='mx-auto'>
          <TableHeader columns={columns} className=''>
            {(column) => (
              <TableColumn key={column.uid} className='font-bold'>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>

          <TableBody items={invoices} emptyContent='No invoices found'>
            {(invoice) => (
              <TableRow key={invoice.id}>
                {
                  (columnKey) =>
                  <TableCell>
                    <RenderCell
                      invoice={invoice}
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
