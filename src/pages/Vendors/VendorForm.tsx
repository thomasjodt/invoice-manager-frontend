import { Vendor } from '@/types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from '@/components/ui'
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import { useForm } from '@/hooks/useForm'
import { http } from '@/data'

export const VendorForm: React.FC = function () {
  const [vendor, setVendor] = useState<Vendor>()
  const [isEditing, toggleEditing] = useState(false)

  const params = useParams()
  const { form, handleChange, reset } = useForm({ name: '', fullName: '' })

  const id = Number(params.id ?? 0)

  const getVendor = async () => {
    const { data } = await http.get<Vendor>(`/vendors/${id}`)
    setVendor(data)
  }

  const handleEdit = (): void => {
    if (vendor === undefined) return

    if (!isEditing) {
      form.name = vendor.name
      form.fullName = vendor.fullName
    }

    toggleEditing(e => !e)
  }

  const handleSaveVendor = (): void => {
    http.put(
      `/vendors/${id}`,
      form,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        getVendor().then(() => {
          toggleEditing(false)
        })
        reset()
      }).catch(console.log)

  }

  useEffect(() => {
    getVendor()
  }, [])

    return (
      <section>
        <Header title='Edit Vendor' />
        <Card className='m-5 border' shadow='none'>
          <CardHeader className='flex justify-between items-center'>
            <article>
              <h3 className='text-lg font-medium text-neutral-800'>Vendor Details</h3>
              <p className='text-sm text-neutral-500'>Manage the vendor information</p>
            </article>
            {
              (isEditing) && (
                <div className='flex gap-3'>
                  <Button onClick={handleEdit} color='danger' variant='light'>Cancel</Button>
                  <Button color='primary' onClick={handleSaveVendor}>Save</Button>
                </div>
              )
            }

            {(!isEditing) && <Button onClick={handleEdit} color='primary'>Edit</Button>}
          </CardHeader>

          <CardBody className='px-8'>
            <div className='grid md:grid-cols-[100px_1fr] mb-5'>
              <p className='font-medium text-neutral-600'>Name</p>
              {
                (isEditing)
                  ? <Input name='name' value={form.name} onChange={handleChange}/>
                  : <p className='font-normal text-start md:text-end'>{vendor?.name}</p>
              }
            </div>

            <div className='grid md:grid-cols-[100px_1fr] mb-5'>
              <p className='font-medium text-neutral-600'>Full Name</p>
              {
                (isEditing)
                  ? <Input name='fullName' value={form.fullName} onChange={handleChange} />
                  : <p className='font-normal text-start md:text-end'>{vendor?.fullName}</p>
              }
            </div>
          </CardBody>
        </Card>
      </section>
    )
}
