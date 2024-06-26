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
    <select className='border rounded-md p-1' onChange={handleChange}>
      {
        options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))
      }
    </select>
  )
}
