import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react'

import { useForm } from '@/hooks'
import { useVendorContext } from '../context/VendorContext'

interface Props {
  isOpen: boolean
  onOpenChange: () => void
}

export const NewVendorModal: React.FC<Props> = function ({ isOpen, onOpenChange }) {
  const { create } = useVendorContext()
  const { form, handleChange } = useForm({ name: '', fullName: '' })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, close: () => void): void => {
    event.preventDefault()
    create(form).catch(console.error)
    close()
  }

  return (
    <Modal onOpenChange={onOpenChange} isOpen={isOpen}>

      <ModalContent>
        {(close) => (
          <>
            <ModalHeader>Create a New Vendor</ModalHeader>
            <form onSubmit={(e) => { handleSubmit(e, close) }}>
              <ModalBody>
                <div className='grid md:grid-cols-[100px_1fr] mb-5'>
                  <p className='font-medium text-neutral-600'>Name</p>
                  <Input
                    name='name'
                    label='Name'
                    placeholder='Short Name'
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div className='grid md:grid-cols-[100px_1fr] mb-5'>
                  <p className='font-medium text-neutral-600'>Full Name</p>
                  <Input
                    name='fullName'
                    label='Full Name'
                    placeholder='Full Name'
                    value={form.fullName}
                    onChange={handleChange}
                  />
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color='primary' variant='solid' type='submit'>Create Vendor</Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
