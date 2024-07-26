import { useCallback, useEffect, useState } from 'react'
import { Button, Card, Pagination } from '@nextui-org/react'

import { Header, ShowItems } from '@/components/ui'
import type { Payment } from '@/types'
import { PlusIcon } from '@/components/icons'
import { useAppContext } from '@/context'
import { NewPaymentModal, PaymentCard } from '../app/payments/components'
import { DeletePaymentModal } from '../app/payments/components/DeletePaymentModal'

export const Payments: React.FC = function () {
  const { createPayment, getAllPayments, deletePayment } = useAppContext()
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [count, setCount] = useState(0)
  const [payments, setPayments] = useState<Payment[]>([])

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletingPaymentId, setDeletingPaymentId] = useState<number | null>(null)

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const openCreateModal = (): void => {
    setIsCreateModalOpen(true)
  }

  const closeCreateModal = (): void => {
    setIsCreateModalOpen(false)
  }

  const handleCreate = (form: { amount: string, invoiceId: string, paymentDate: string, vendor: string }): void => {
    createPayment({
      amount: Number(form.amount),
      paymentDate: form.paymentDate,
      invoice: {
        id: Number(form.invoiceId)
      }
    })
      .then(() => {
        getPayments().catch(console.error)
      })
      .catch(console.error)
  }

  const openDeleteModal = (paymentId: number) => {
    return () => {
      setDeletingPaymentId(paymentId)
      setIsDeleteModalOpen(true)
    }
  }

  const closeDeleteModal = (): void => {
    setDeletingPaymentId(null)
    setIsDeleteModalOpen(false)
  }

  const handleDeletePayment = (): void => {
    if (deletingPaymentId === null) return
    deletePayment(deletingPaymentId)
      .then(() => { closeDeleteModal() })
      .then(() => { getPayments().catch(console.error) })
      .catch(console.error)
  }

  const getPayments = useCallback(async (): Promise<void> => {
    const res = await getAllPayments(page, itemsPerPage)

    const div = res.count / itemsPerPage
    const extraPage = Number.isInteger(div) ? 0 : 1

    setPages(Math.floor(div) + extraPage)
    setPayments(res.data)
    setCount(res.count)
  }, [getAllPayments, itemsPerPage, page])

  useEffect(() => {
    getPayments().catch(console.error)
  }, [getPayments])

  return (
    <>
      <Header title='Payments'>
        <Button
          color='primary'
          endContent={<PlusIcon />}
          onPress={openCreateModal}
        >
          Add Payment
        </Button>
      </Header>

      <NewPaymentModal
        isOpenModal={isCreateModalOpen}
        onCloseModal={closeCreateModal}
        onCreate={handleCreate}
      />

      <DeletePaymentModal
        isModalOpen={isDeleteModalOpen}
        onDelete={handleDeletePayment}
        onCloseModal={closeDeleteModal}
      />

      <div>
        {(count > 0) && (
          <div className='text-neutral-500 dark:text-neutral-200 font-semibold text-sm mx-5 my-4 flex justify-between'>
            <p>Total {count} payments</p>

            <div className='flex items-center gap-3'>
              <p>Vendors per page</p>
              <ShowItems onChange={setItemsPerPage} />
            </div>
          </div>
        )}

        <Card
          shadow='none'
          className={
            (payments.length > 0)
              ? 'max-w-xl  mx-auto gap-3 p-5 lg:p-8 2xl:p-15 min-h-[500px] justify-between mt-5 border-divider border'
              : 'max-w-xl mx-auto flex justify-center items-center min-h-[500px] mt-5 border-divider border'
          }
        >
          <div>
            {
              (payments.length > 0)
                ? (payments.map((payment) => (
                  <PaymentCard
                    key={payment.id}
                    payment={payment}
                    onDelete={openDeleteModal(payment.id)}
                  />
                  )))
                : <p className='font-semibold text-default-400'>No se encuentran pagos realizados</p>
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
