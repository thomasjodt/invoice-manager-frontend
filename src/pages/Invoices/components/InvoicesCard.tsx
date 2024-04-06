import { Accordion, AccordionItem, Card, CardBody, CardFooter, CardHeader, Chip, User } from '@nextui-org/react'

import { Invoice } from '@/types'
import { currencyFormat, dateFormat } from '@/utils'
import { statuses } from '@/data'
import { getDays, getStatus } from '../utils'

interface Props {
  invoice: Invoice
}

export const InvoicesCard: React.FC<Props> = function ({ invoice }) {
  const paid = invoice.payments.reduce((amount, current) => amount + current.amount, 0)
  const balance = invoice.amount - paid
  const status = getStatus(new Date(invoice.dueDate + 'T00:00'), balance)
  const days: number = getDays(invoice.emissionDate, invoice.dueDate)

  return (
    <Card shadow='none' className='border px-5 pt-2'>
      <CardHeader className='flex items-center justify-between'>
        <User
          name={invoice.vendor.name}
          description={invoice.vendor.fullName}
          className='text-start place-self-start font-normal'
        />
        <Chip
          color={statuses[status]}
          variant='flat'
          radius='sm'
          className={`min-w-[80px] text-center border border-${statuses[status]}-200`}
        >
          {status}
        </Chip>
      </CardHeader>

      <CardBody>
        <div className='grid grid-cols-2'>
          <div>
            <p className='text-sm text-primary-500 font-bold'>
              {invoice.invoiceNumber}
              <span className='ml-2 text-neutral-600'>({days})</span>
            </p>
            <p className='text-lg font-semibold text-neutral-600'>{currencyFormat(invoice.amount)}</p>
          </div>

          <div className='flex text-neutral-500 flex-col place-self-end'>
            <p>{dateFormat(invoice.emissionDate)}</p>
            <p>{dateFormat(invoice.dueDate)}</p>
          </div>
        </div>
      </CardBody>

      <CardFooter>
        <Accordion isCompact className='mt-3'>
          <AccordionItem subtitle={'Balance: ' + currencyFormat(balance)} textValue='List of payments'>
            <div>
              {
                invoice.payments.map((payment, index) => (
                  <div
                    key={payment.id}
                    className={
                      `flex items-center justify-between px-8 py-1 ${index === invoice.payments.length - 1 ? '' :  'border-b'}`
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
  )
}
