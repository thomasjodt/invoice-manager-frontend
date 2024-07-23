import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'

interface Props {
  isModalOpen?: boolean
  onDelete?: () => void
  onCloseModal?: () => void
}

export const DeleteModal: React.FC<Props> = function ({ isModalOpen, onDelete, onCloseModal }) {
  return (
    <Modal
      backdrop='opaque'
      isOpen={isModalOpen}
      onClose={onCloseModal}
    >
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
                <Button variant='light' onPress={onCloseModal}>No, cancel</Button>
                <Button color='danger' onPress={onDelete}>Yes, delete</Button>
              </ModalFooter>
            </>
          )
        }
      </ModalContent>
    </Modal>
  )
}
