import { SearchIcon } from '@/components/icons'
import { Card, Input } from '@nextui-org/react'

interface Props {}

export const FilterBar: React.FC<Props> = function () {
  return (
    <Card shadow='none' className='rounded-none border-b-1 p-3'>
      <Input
        className='max-w-[300px] ml-3'
        startContent={<SearchIcon />}
        placeholder='Search vendor'
        classNames={{
          inputWrapper: 'border bg-neutral-50 shadow-none'
        }}
      />
    </Card>
  )
}