interface Props {
  options?: number[]
  onChange?: (showingItems: number) => void
}

export const ShowItems: React.FC<Props> = function ({ options = [5, 10, 15], onChange }) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = e.target

    if (onChange !== undefined) onChange(Number(value))
  }

  return (
    <select
      name='numberOfItems'
      aria-label='number of items selector'
      className='border rounded-md p-1 dark:text-neutral-200 border-divider'
      onChange={handleChange}
    >
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
