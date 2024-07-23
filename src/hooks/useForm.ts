import { useState } from 'react'
import type { UseForm } from '@/types'

type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
interface HandleChange {
  (event: React.ChangeEvent<HTMLInputElement>): void
  (event: React.ChangeEvent<HTMLSelectElement>): void
  (event: React.ChangeEvent<HTMLTextAreaElement>): void
}

export const useForm = <T>(initialForm: T): UseForm<T> => {
  const [form, setForm] = useState(initialForm)

  const handleChange: HandleChange = (event: React.ChangeEvent<FormElement>): void => {
    const { name, value, type } = event.target
    const { checked } = event.target as HTMLInputElement

    setForm(f => ({
      ...f,
      [name]: (type === 'checkbox') ? checked : value
    }))
  }

  const reset = (): void => {
    setForm(initialForm)
  }

  const fillForm = (form: T): void => {
    for (const key in form) {
      setForm(f => ({
        ...f,
        [key]: form[key]
      }))
    }
  }

  return { form, handleChange, reset, fillForm }
}
