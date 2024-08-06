import { currencyFormat } from '@/utils'

describe('Test on currencyFormat.ts', () => {
  it('Should return a string that contains the same value', () => {
    const value = 365
    const formatted = currencyFormat(value)

    expect(typeof formatted).toBe('string')
  })

  it('Should contain the same value', () => {
    const value = 365
    const formatted = currencyFormat(value)
    expect(formatted).toContain(value)
  })
})
