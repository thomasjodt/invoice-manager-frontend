import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react'

import { useForm, useVendors } from '@/hooks'

interface Props {
  isOpen: boolean
  onOpenChange: () => void
}

export const NewVendorModal: React.FC<Props> = function ({ isOpen, onOpenChange }) {
  const { createVendor } = useVendors()
  const { form, handleChange } = useForm({ name: '', fullName: '' })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, close: () => void): void => {
    event.preventDefault()
    createVendor(form).catch(console.error)
    close()
  }

  return (
    <Modal onOpenChange={onOpenChange} isOpen={isOpen}>

      <ModalContent>
        {(close) => (
          <>
            <ModalHeader className='text-default-600'>Crear un nuevo proveedor</ModalHeader>
            <form onSubmit={(e) => { handleSubmit(e, close) }}>
              <ModalBody>
                <div className='grid md:grid-cols-[100px_1fr] mb-5'>
                  <p className='font-medium text-default-500'>Nombre</p>
                  <Input
                    name='name'
                    label='Nombre'
                    placeholder='Nombre corte'
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div className='grid md:grid-cols-[100px_1fr] mb-5'>
                  <p className='font-medium text-default-500'>Nombre completo</p>
                  <Input
                    name='fullName'
                    label='Nombre completo'
                    placeholder='Nombre completo'
                    value={form.fullName}
                    onChange={handleChange}
                  />
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color='primary' variant='solid' type='submit'>Crear proveedor</Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
