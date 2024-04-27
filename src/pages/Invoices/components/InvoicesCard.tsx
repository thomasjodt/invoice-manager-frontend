import {
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  CardFooter,
  CardHeader
} from '@nextui-org/react'
import { useState } from 'react'

import { type Invoice } from '@/types'
import { getDays, getStatus } from '../utils'
import { currencyFormat, dateFormat } from '@/utils'
import { StatusChip } from './StatusChip'
import { VendorTag } from '@/components/ui'
import { DeleteModal } from './DeleteModal'

interface Props {
  item?: string
  invoice: Invoice
  onEdit?: () => void
  onDelete?: () => void
  onViewDetails?: () => void
}

export const InvoicesCard: React.FC<Props> = function ({ invoice, onDelete, onEdit, onViewDetails, item }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (invoice.payments === undefined) invoice.payments = []
  const paid = invoice.payments.reduce((amount, current) => amount + current.amount, 0)
  const balance = invoice.amount - paid
  const status = getStatus(new Date(invoice.dueDate + 'T00:00'), balance)
  const days: number = getDays(invoice.emissionDate, invoice.dueDate)

  const showModal = (): void => {
    setIsModalOpen(true)
  }

  return (
    <>
      <DeleteModal isModalOpen={isModalOpen} onDelete={onDelete} />
      <Card>
        <CardHeader className='flex items-center justify-between pb-0'>
          <VendorTag vendor={invoice.vendor} />
          <StatusChip
            item={item}
            status={status}
            invoice={invoice}
            onDelete={showModal}
            onEdit={onEdit}
            onViewDetails={onViewDetails}
          />
        </CardHeader>

        <CardBody className='py-1'>
          <div className='grid grid-cols-2'>
            <div>
              <p className='text-sm text-primary-500 font-bold'>
                {invoice.invoiceNumber}
                <span className='ml-2 text-neutral-600'>({days})</span>
              </p>
              <p className='text-lg font-semibold text-neutral-600'>{currencyFormat(invoice.amount)}</p>
            </div>

            <div className='flex text-neutral-500 flex-col place-self-end pr-5'>
              <p>{dateFormat(invoice.emissionDate)}</p>
              <p>{dateFormat(invoice.dueDate)}</p>
            </div>
          </div>
        </CardBody>

        <CardFooter className='py-0'>
          <Accordion isCompact className='mt-3'>
            <AccordionItem subtitle={'Balance: ' + currencyFormat(balance)} textValue='List of payments'>
              <div>
                {
                  invoice.payments.map((payment, index) => (
                    <div
                      key={payment.id}
                      className={
                        `flex items-center justify-between px-8 py-1 ${index === invoice.payments.length - 1 ? '' : 'border-b'}`
                      }
                    >
                      <h4 className='font-semibold'>{currencyFormat(payment.amount)}</h4>
                      <p>{dateFormat(payment.paymentDate)}</p>
                    </div>
                  ))
                }
              </div>
            </AccordionItem>
          </Accordion>
        </CardFooter>
      </Card>
    </>
  )
}
