import { dateFormat } from '@/utils'

describe('Tests on dateFormat', () => {
  it('Should return a string value', () => {
    const date = new Date()
    const formattedDate = dateFormat(date)

    expect(typeof formattedDate).toBe('string')
  })
})
