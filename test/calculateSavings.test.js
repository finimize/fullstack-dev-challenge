const { calculateSavings } = require('../server/api')
var assert = require('assert')

const {
  CALCULATE_SAVINGS_RESULT,
} = require('../client/src/api/stubs/calculateSavings')

describe('calculateSavings', () => {
  it('calculates the correct interest rate', () => {
    assert.equal(
      calculateSavings({
        initialSavings: 0,
        monthlySavings: 0,
        yearlyInterest: 0,
        interestRecurrency: 'Monthly',
      }),
      CALCULATE_SAVINGS_RESULT,
    )
  })
})
