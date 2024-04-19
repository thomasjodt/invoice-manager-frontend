import { Button, Pagination, useDisclosure } from '@nextui-org/react'

import { Header } from '@/components/ui'
import { PlusIcon } from '@/components/icons'
import { usePaymentsContext } from './context'
import { NewPaymentModal, PaymentCard } from './components'
import { useEffect, useState } from 'react'

export const Payments: React.FC = function () {
  const { payments, getAll } = usePaymentsContext()
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    const getAllPayments = async () => {
      const response = await getAll(page)
      setPages(Math.floor(response.count / 5) + 1)
    }
    getAllPayments()
  }, [page])

  return (
    <>
      <Header title='Payments'>
        <Button color='primary' endContent={<PlusIcon />} onPress={onOpen}>Add Payment</Button>
      </Header>

      <NewPaymentModal isOpen={isOpen} onOpenChange={onOpenChange} />

      <section className='grid gap-3 p-5'>
        <div className='grid grid-cols-3 place-items-center bg-primary-100 rounded-md font-semibold p-1 text-neutral-600'>
          <p className='place-self-start pl-8'>Vendor</p>
          <p>Amount</p>
          <p>Payment Date</p>
        </div>

        {
          payments.map((payment) => (
            <PaymentCard key={payment.id} payment={payment} />
          ))
        }
      </section>

      {
        (pages > 1 && page !== 0) && (
          <Pagination
            page={page}
            showControls
            total={pages}
            onChange={setPage}
            className='max-w-fit mx-auto'
          />
        )
      }
    </>
  )
}

export default Payments
