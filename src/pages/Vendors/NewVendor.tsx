import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react'

import { Header } from '@/components/ui'
import { http } from '@/data'
import { useForm } from '@/hooks'
import { Vendor } from '@/types'

export const NewVendor: React.FC = function () {
  const { form, handleChange, reset } = useForm({ name: '', fullName: '' })

  const handleCreateVendor = async () => {
    if (Object.values(form).includes('')) return
    await http.post('/vendors', form)
    const { data } = await http.get<Vendor>(`/vendors?name=${form.fullName}`)

    reset()

    console.log(data)
  }

  return (
    <section>
      <Header title='Create New Vendor' />
      <Card className='m-5 border' shadow='none'>
        <CardHeader className='flex justify-between items-center gap-3'>
          <article>
            <h3 className='text-lg font-medium text-neutral-800'>Vendor Details</h3>
            <p className='text-sm text-neutral-500'>Add the following information to create a vendor</p>
          </article>
              <div className='flex gap-3'>
                <Button color='primary' onClick={handleCreateVendor}>Create</Button>
              </div>

        </CardHeader>

        <CardBody className='px-8'>
          <div className='grid md:grid-cols-[100px_1fr] mb-5'>
            <p className='font-medium text-neutral-600'>Name</p>
              <Input
                name='name'
                placeholder='Name'
                value={form.name}
                onChange={handleChange}
              />
          </div>

          <div className='grid md:grid-cols-[100px_1fr] mb-5'>
            <p className='font-medium text-neutral-600'>Full Name</p>
            <Input
              name='fullName'
              placeholder='Full Name'
              value={form.fullName}
              onChange={handleChange}
            />
          </div>
        </CardBody>
      </Card>
    </section>
  )
}
