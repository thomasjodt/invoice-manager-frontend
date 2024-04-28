import { type UseForm } from '@/types'
import { useState } from 'react'

export const useForm = <T>(initialForm: T): UseForm<T> => {
  const [form, setForm] = useState(initialForm)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, checked, type } = e.target

    setForm(f => ({
      ...f,
      [name]: (type === 'checkbox') ? checked : value
    }))
  }

  const reset = (): void => {
    setForm(initialForm)
  }

  const populate = (form: T): void => {
    for (const key in form) {
      setForm(f => ({
        ...f,
        [key]: form[key]
      }))
    }
  }

  return { form, handleChange, reset, populate }
}
