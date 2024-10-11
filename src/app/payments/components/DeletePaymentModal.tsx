import { useEffect } from 'react'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'

interface Props {
  isModalOpen: boolean
  onDelete?: () => void
  onCloseModal?: () => void
}

export const DeletePaymentModal: React.FC<Props> = function ({ isModalOpen, onDelete, onCloseModal }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const handleDelete = (): void => {
    (onDelete !== undefined) && onDelete()
  }

  useEffect(() => {
    (isModalOpen) ? onOpen() : onClose()
  }, [isModalOpen, onClose, onOpen])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseModal}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {
          () => (
            <>
              <ModalHeader>
                <h3 className='font-semibold'>Estás seguro de eliminar este pago?</h3>
              </ModalHeader>

              <ModalBody>
                <p className='text-neutral-600'>Esta acción no se puede revertir.</p>
              </ModalBody>

              <ModalFooter className='flex justify-between'>
                <Button variant='light' onPress={onCloseModal}>No, cancelar</Button>
                <Button color='danger' onPress={handleDelete}>Sí, eliminar</Button>
              </ModalFooter>
            </>
          )
        }
      </ModalContent>
    </Modal>
  )
}
