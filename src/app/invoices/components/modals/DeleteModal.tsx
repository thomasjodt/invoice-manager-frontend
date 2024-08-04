import { type ReactNode } from 'react'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'

interface Props {
  title?: ReactNode
  description?: ReactNode
  isModalOpen?: boolean
  classNames?: Partial<Record<'title' | 'description', string>>
  onDelete?: () => void
  onCloseModal?: () => void
}

export const DeleteModal: React.FC<Props> = function ({ title, description, isModalOpen, classNames, onDelete, onCloseModal }) {
  return (
    <Modal
      backdrop='opaque'
      isOpen={isModalOpen}
      onClose={onCloseModal}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className={`text-default-900 ${(classNames?.title !== undefined) ? classNames.title : ''}`.trim()}>
              {(title !== undefined) ? title : 'Are you absolutely sure?'}
            </ModalHeader>

            <ModalBody className={`text-default-600 ${(classNames?.description !== undefined) ? classNames.description : ''}`.trim()}>
              {(description !== undefined) ? description : 'This action cannot be undone and will be permanent.'}
            </ModalBody>

            <ModalFooter className='flex justify-between'>
              <Button variant='light' onPress={onCloseModal}>No, cancel</Button>
              <Button color='danger' onPress={onDelete}>Yes, delete</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
