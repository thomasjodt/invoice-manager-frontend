import { SearchIcon } from '@/components/icons'
import { Card, Input } from '@nextui-org/react'
import { useEffect, useState } from 'react'

interface Props {
  onSearch: (name: string) => void
}

export const FilterBar: React.FC<Props> = function ({ onSearch }) {
  const [input, setInput] = useState('')

  useEffect(() => {
    const debounceId = setTimeout(() => {
      onSearch(input)
    }, 300)

    return () => { clearTimeout(debounceId) }
  }, [input, onSearch])

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
