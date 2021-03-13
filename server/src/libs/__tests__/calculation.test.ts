import { calculateValueOnMonthlyCI, createMonthlyCIProjection } from "../calculation"

const interestRate = 0.02
const details = {
  principalDeposit: 1000,
  monthlyDeposit: 100,
  monthlyRate: interestRate/12,
}

describe('Test the calculattion lib', () => {
  describe('WEHN calculateValueOnMonthlyCI()', () => {
    const monthlyValue = [
      [0, 1000],
      [1, 1101.67],
      [2, 1203.50],
      [3, 1305.51],
      [4, 1407.68],
      [5, 1510.03],
      [6, 1612.55],
      [7, 1715.23],
      [8, 1818.09],
      [9, 1921.12],
      [10, 2024.33],
      [11, 2127.70],
      [12, 2231.25],
      [13, 2334.96],
      [14, 2438.86],
      [15, 2542.92],
      [16, 2647.16],
      [17, 2751.57],
      [18, 2856.16],
      [19, 2960.92],
      [20, 3065.85],
      [21, 3170.96],
      [22, 3276.25],
      [23, 3381.71],
      [24, 3487.34]
    ]

    describe('AND principal = 1000, monthly deposit = 100, interest rate = 2%', () => {
      it.each(monthlyValue)('SHOULD return month %i = value %i', (period, expectedValue) => {
        const request = {
          ...details,
          period
        }
        const value = calculateValueOnMonthlyCI(request)
        expect(value).toBe(expectedValue)
      })
    })
  })

  describe('WHEN createMonthlyCIProjection', () => {
    describe('AND principal = 1000, monthly deposit = 100, interest rate = 2%', () => {
      const expected = [
        { month: 0,
          deposit: 1000,
          interest: 0, 
          totalDeposit: 1000,
          totalInterest: 0,
          balance: 1000
        },
        { month: 1,
          deposit: 100,
          interest: 1.67,
          totalDeposit: 1100,
          totalInterest: 1.67,
          balance: 1101.67
        },
        { month: 2,
          deposit: 100,
          interest: 1.83,
          totalDeposit: 1200,
          totalInterest: 3.50,
          balance: 1203.50
        },
        { month: 3,
          deposit: 100,
          interest: 2.01,
          totalDeposit: 1300,
          totalInterest: 5.51,
          balance: 1305.51
        },
        { month: 4,
          deposit: 100,
          interest: 2.17,
          totalDeposit: 1400,
          totalInterest: 7.68,
          balance: 1407.68
        },
        { month: 5,
          deposit: 100,
          interest: 2.35,
          totalDeposit: 1500,
          totalInterest: 10.03,
          balance: 1510.03
        }
      ]
      it('SHOULD return the expected value of projected balance', () => {
        const request = {
          ...details,
          period: 5
        }
        const value = createMonthlyCIProjection(request)
        expect(value).toEqual(expected)
      })
    })
  })
})
