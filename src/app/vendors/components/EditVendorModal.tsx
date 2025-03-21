import { useCallback, useState } from 'react'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react'

import type { Vendor } from '@/types'
import { VendorTag } from '@/components/ui'
import { useForm, useVendors } from '@/hooks'
import { DeletePopover } from './DeletePopover'

interface Props {
  vendor: Vendor
  isOpen: boolean
  onOpenChange: () => void
}

export const EditVendorModal: React.FC<Props> = function ({ isOpen, vendor, onOpenChange }) {
  const [isEditable, setIsEditable] = useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const { updateVendor } = useVendors()

  const { form, handleChange, reset } = useForm({
    name: vendor.name,
    fullName: vendor.fullName
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    updateVendor(vendor.id, form).catch(console.error)
    onOpenChange()
  }

  const resetForm = useCallback((): void => {
    setIsEditable(false)
    reset()
  }, [reset])

  return (
    <Modal onOpenChange={onOpenChange} isOpen={isOpen}>

      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              <VendorTag vendor={vendor} />
            </ModalHeader>
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <div className='grid md:grid-cols-[100px_1fr] mb-5'>
                  <p className='font-medium text-neutral-600'>Nombre</p>
                  {
                    (isEditable)
                      ? (
                        <Input
                          name='name'
                          placeholder='Nombre corto'
                          value={form.name}
                          onChange={handleChange}
                        />
                        )
                      : <p className='font-normal text-start md:text-end text-neutral-500'>{vendor.name}</p>
                  }
                </div>

                <div className='grid md:grid-cols-[100px_1fr] mb-5'>
                  <p className='font-medium text-neutral-600'>Nombre completo</p>
                  {
                    (isEditable)
                      ? (
                        <Input
                          name='fullName'
                          placeholder='Nombre completo'
                          value={form.fullName}
                          onChange={handleChange}
                        />
                        )
                      : <p className='font-normal text-start md:text-end text-neutral-500'>{vendor.fullName}</p>
                  }
                </div>
              </ModalBody>

              <ModalFooter>
                {
                  (isEditable) &&
                  (
                    <div className='flex justify-between w-full'>
                      <Button
                        color='danger'
                        variant='light'
                        onClick={resetForm}
                      >
                        Descartar cambios
                      </Button>
                      <Button color='primary' type='submit'>Guardar cambios</Button>
                    </div>
                  )
                }
              </ModalFooter>
            </form>

            {
              (!isEditable) && (
                <div className='flex justify-between w-full p-4'>
                  <DeletePopover
                    vendor={vendor}
                    isPopoverOpen={isPopoverOpen}
                    togglePopover={setIsPopoverOpen}
                  />

                  <Button color='primary' variant='solid' type='button' onPress={() => { setIsEditable(true) }}>Editar Proveedor</Button>
                </div>
              )
            }
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
