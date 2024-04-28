import { useCallback, useEffect, useState } from 'react'
import { Button, Card, Pagination, useDisclosure } from '@nextui-org/react'

import { Header } from '@/components/ui'
import type { FullPayment } from '@/types'
import { PlusIcon } from '@/components/icons'
import { usePaymentsContext } from '@/context'
import { NewPaymentModal, PaymentCard } from './components'
import { DeletePaymentModal } from './components/DeletePaymentModal'

export const Payments: React.FC = function () {
  const { getAll, remove } = usePaymentsContext()
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [count, setCount] = useState(0)
  const [payments, setPayments] = useState<FullPayment[]>([])

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletingPaymentId, setDeletingPaymentId] = useState<number | null>(null)

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const openDeleteModal = (paymentId: number): void => {
    setDeletingPaymentId(paymentId)
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = (): void => {
    setDeletingPaymentId(null)
    setIsDeleteModalOpen(false)
  }

  const handleDeletePayment = (): void => {
    if (deletingPaymentId === null) return
    remove(deletingPaymentId)
      .then(() => { closeDeleteModal() })
      .then(() => { getAllPayments().catch(console.error) })
      .catch(console.error)
  }

  const getAllPayments = useCallback(async (): Promise<void> => {
    const res = await getAll(page, itemsPerPage)

    const div = res.count / itemsPerPage
    const extraPage = Number.isInteger(div) ? 0 : 1

    setPages(Math.floor(div) + extraPage)
    setPayments(res.data)
    setCount(res.count)
  }, [getAll, itemsPerPage, page])

  useEffect(() => {
    getAllPayments().catch(console.error)
  }, [getAllPayments])

  return (
    <>
      <Header title='Payments'>
        <Button color='primary' endContent={<PlusIcon />} onPress={onOpen}>Add Payment</Button>
      </Header>

      <NewPaymentModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <DeletePaymentModal isModalOpen={isDeleteModalOpen} onDelete={handleDeletePayment} onCloseModal={closeDeleteModal} />

      <div className='max-w-xl lg:max-w-4xl mx-auto'>
        {(count > 0) && (
          <div className='text-neutral-500 font-semibold text-sm mx-5 my-4 flex justify-between'>
            <p>Total {count} payments</p>

            <div className='flex items-center gap-3'>
              <p>Vendors per page</p>
              <select onChange={(e) => { setItemsPerPage(Number(e.target.value)) }} className='border rounded-md p-1'>
                <option value='5'>5</option>
                <option value='10'>10</option>
                <option value='15'>15</option>
              </select>
            </div>
          </div>
        )}

        <Card shadow='none' className='m-5 p-5 lg:p-8 2xl:p-15 gap-3 mx-auto min-h-[600px] border mt-5 justify-between'>
          <div className='flex flex-col gap-3'>
            {
              payments.map((payment) => (
                <PaymentCard key={payment.id} payment={payment} onDelete={() => { openDeleteModal(payment.id) }} />
              ))
            }
          </div>

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
        </Card>
      </div>
    </>
  )
}

export default Payments
