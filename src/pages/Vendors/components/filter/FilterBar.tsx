import { SearchIcon } from '@/components/icons'
import { Card, Input } from '@nextui-org/react'
import { useState } from 'react'

interface Props {
  onChange?: () => void
}

export const FilterBar: React.FC<Props> = function () {
  const [input, setInput] = useState('')

  return (
    <Card shadow='none' className='rounded-none border-b-1 p-3'>
      <Input
        placeholder='Search vendor'
        className='max-w-[300px] ml-3'
        onChange={(e) => {
          setInput(e.target.value)
        }}
        value={input}
        startContent={<SearchIcon />}
        classNames={{
          inputWrapper: 'border bg-neutral-50 shadow-none'
        }}
      />
    </Card>
  )
}
