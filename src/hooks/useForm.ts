import { useState } from 'react'
import type { HandleChange, UseForm } from '@/types'

export const useForm = <T>(initialForm: T): UseForm<T> => {
  const [form, setForm] = useState(initialForm)

  const handleChange: HandleChange = ((e) => {
    const { name, value, type } = e.target
    const checked = (e.target instanceof HTMLInputElement) ? e.target.checked : null

    setForm(f => ({
      ...f,
      [name]: (type === 'checkbox') ? checked : value
    }))
  }) as HandleChange

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
