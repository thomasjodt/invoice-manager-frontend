import { useEffect, useState } from 'react'
import { Button, Pagination, useDisclosure } from '@nextui-org/react'

import { Header } from '@/components/ui'
import type { FullPayment } from '@/types'
import { PlusIcon } from '@/components/icons'
import { usePaymentsContext } from './context'
import { NewPaymentModal, PaymentCard } from './components'

export const Payments: React.FC = function () {
  const { getAll } = usePaymentsContext()
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [itemsPerPage/* , setItemsPerPage */] = useState(5)
  const [payments, setPayments] = useState<FullPayment[]>([])

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    const getAllPayments = async (): Promise<void> => {
      const { count, data } = await getAll(page, itemsPerPage)

      const div = count / itemsPerPage
      const extraPage = Number.isInteger(div) ? 0 : 1

      setPages(Math.floor(div) + extraPage)
      setPayments(data)
    }
    getAllPayments().catch(console.error)
  }, [page, getAll, itemsPerPage])

  return (
    <>
      <Header title='Payments'>
        <Button color='primary' endContent={<PlusIcon />} onPress={onOpen}>Add Payment</Button>
      </Header>

      <NewPaymentModal isOpen={isOpen} onOpenChange={onOpenChange} />

      <section className='grid gap-3 p-5 lg:grid-cols-2 2xl:grid-cols-3'>
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
