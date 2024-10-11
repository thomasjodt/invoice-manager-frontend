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
              {(title !== undefined) ? title : 'Estás completamente seguro?'}
            </ModalHeader>

            <ModalBody className={`text-default-600 ${(classNames?.description !== undefined) ? classNames.description : ''}`.trim()}>
              {(description !== undefined) ? description : 'Esta acción no se puede deshacer y será permanente.'}
            </ModalBody>

            <ModalFooter className='flex justify-between'>
              <Button variant='light' onPress={onCloseModal}>No, cancelar</Button>
              <Button color='danger' onPress={onDelete}>Sí, eliminar</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
