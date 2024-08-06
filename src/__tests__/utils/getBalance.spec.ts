import { getBalance } from '@/utils'

describe('Tests on getBalance.ts', () => {
  it('Should have been launched', () => {
    const amount = 2000
    const payments = 1500
    const balance = getBalance(amount, payments)

    expect(balance).toBe(500)
  })
})
