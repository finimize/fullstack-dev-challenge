import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { projectFiftyYearSavings } from '../services/compoundInterest.js'

describe('projectFiftyYearSavings', () => {
    it('returns the initial balance at month 0', () => {
        const { points } = projectFiftyYearSavings({
            initialSavings: 1_000,
            monthlyDeposit: 100,
            annualInterestRate: 5,
        })
        assert.equal(points[0].month, 0)
        assert.equal(points[0].balance, 1_000)
        assert.equal(points[0].contributions, 1_000)
        assert.equal(points[0].interest, 0)
    })

    it('produces one point per month over the 50-year horizon', () => {
        const { points } = projectFiftyYearSavings({
            initialSavings: 500,
            monthlyDeposit: 50,
            annualInterestRate: 3,
        })
        assert.equal(points.length, 601)
        assert.equal(points[600].month, 600)
    })

    it('adds only linear deposits when interest is zero', () => {
        const initialData = {
            initialSavings: 1_000,
            monthlyDeposit: 100,
            annualInterestRate: 0,
        }
        const { points } = projectFiftyYearSavings(initialData)

        // Check an arbitrary month (2 years in) against the linear expectation.
        const months = 24
        const totalDeposits = initialData.monthlyDeposit * months
        assert.equal(points[months].balance, initialData.initialSavings + totalDeposits)
        assert.equal(points[months].interest, 0)
        assert.equal(points[months].contributions, initialData.initialSavings + totalDeposits)
    })

    it('matches the closed-form FV formula for a known case', () => {
        const initialData = {
            initialSavings: 1_000,
            monthlyDeposit: 100,
            annualInterestRate: 6,
        }

        const { points } = projectFiftyYearSavings(initialData)
        const months = 60
        const final = points[months]

        assert.ok(
            // £1000 principal, £100/month, 6% annual, 5 years (month 60).
            // FV = 1000·(1+0.005)^60 + 100·((1+0.005)^60 − 1)/0.005
            //    ≈ 1348.85 + 6977.00 ≈ 8325.86
            Math.abs(final.balance - 8_325.86) < 0.05,
            `expected ~8325.86, got ${final.balance}`,
        )

        const totalDeposits = initialData.monthlyDeposit * months
        assert.equal(final.contributions, initialData.initialSavings + totalDeposits)

        const roundedDiff = Math.round((final.balance - final.contributions) * 100) / 100
        assert.equal(roundedDiff, final.interest)
    })
})
