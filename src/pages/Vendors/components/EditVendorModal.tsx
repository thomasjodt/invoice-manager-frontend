import { useEffect, useState } from 'react'
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
import { VendorsApi } from '@/api'
import type { Vendor } from '@/types'
import { VendorTag } from '@/components/ui'

interface Props {
  vendor: Vendor
  isOpen: boolean
  onOpenChange: () => void
  update: (vendor: Vendor) => void
}

export const EditVendorModal: React.FC<Props> = function ({ isOpen, onOpenChange, update, vendor }) {
  const [isEditable, setIsEditable] = useState(false)

  const { form, handleChange, reset } = useForm({
    name: vendor.name,
    fullName: vendor.fullName
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, close: () => void): Promise<void> => {
    event.preventDefault()

    const updatedVendor = await VendorsApi.updateVendor(vendor.id, form)
    update(updatedVendor)
    close()
  }

  const resetForm = (): void => {
    setIsEditable(false)
    reset()
  }

  useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
  }, [isOpen])

  return (
    <Modal onOpenChange={onOpenChange} isOpen={isOpen}>

      <ModalContent>
        {(close) => (
          <>
            <ModalHeader>
              {<VendorTag vendor={vendor} />}
            </ModalHeader>
            <form onSubmit={(e) => { handleSubmit(e, close) }}>
              <ModalBody>
                <div className='grid md:grid-cols-[100px_1fr] mb-5'>
                  <p className='font-medium text-neutral-600'>Name</p>
                  {
                    (isEditable)
                      ? (
                        <Input
                          name='name'
                          placeholder='Short Name'
                          value={form.name}
                          onChange={handleChange}
                        />
                      )
                      : <p className='font-normal text-start md:text-end'>{vendor.name}</p>
                  }
                </div>

                <div className='grid md:grid-cols-[100px_1fr] mb-5'>
                  <p className='font-medium text-neutral-600'>Full Name</p>
                  {
                    (isEditable)
                      ? (
                        <Input
                          name='fullName'
                          placeholder='Full Name'
                          value={form.fullName}
                          onChange={handleChange}
                        />
                      )
                      : <p className='font-normal text-start md:text-end'>{vendor.fullName}</p>
                  }
                </div>
              </ModalBody>

              <ModalFooter>
                {
                  (isEditable)
                    ? (
                      <div className='flex justify-between w-full'>
                        <Button
                          color='danger'
                          variant='light'
                          onClick={resetForm}
                        >
                          Cancel Editing
                        </Button>
                        <Button color='primary' variant='solid' type='submit'>Save Vendor</Button>
                      </div>
                    )
                    : <Button color='primary' variant='solid' onClick={() => { setIsEditable(true) }}>Edit Vendor</Button>
                }
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}