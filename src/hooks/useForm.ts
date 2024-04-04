import { UseForm } from '@/types'
import React, { useState } from 'react'

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

  return { form, handleChange, reset }
}
