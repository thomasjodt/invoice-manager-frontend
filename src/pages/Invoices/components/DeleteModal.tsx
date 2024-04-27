import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { useEffect } from 'react'

interface Props {
  isModalOpen: boolean
  onDelete?: () => void
}

export const DeleteModal: React.FC<Props> = function ({ isModalOpen, onDelete }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const handleDelete = (): void => {
    (onDelete !== undefined) && onDelete()
  }

  useEffect(() => {
    (isModalOpen) ? onOpen() : onClose()
  }, [isModalOpen, onClose, onOpen])

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='opaque'>
      <ModalContent>
        {
          () => (
            <>
              <ModalHeader>
                <h3 className='font-semibold'>Are you sure to delete this invoice?</h3>
              </ModalHeader>

              <ModalBody>
                <p className='text-neutral-600'>This action will delete this invoice and all its corresponding payments.</p>
              </ModalBody>

              <ModalFooter className='flex justify-between'>
                <Button variant='light' onPress={onClose}>No, cancel</Button>
                <Button color='danger' onPress={handleDelete}>Yes, delete</Button>
              </ModalFooter>
            </>
          )
        }
      </ModalContent>
    </Modal>
  )
}
