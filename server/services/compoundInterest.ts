import type { ProjectionParams, ProjectionPoint, Projection } from '../../shared/projection.js'

const round2 = (value: number): number => Math.round(value * 100) / 100

/**
 * Future value with monthly compounding and end-of-month deposits.
 * FV = P·(1+i)^n + PMT·((1+i)^n − 1)/i  (reduces to P + PMT·n when i = 0)
 *
 * @param principal - Starting balance (P).
 * @param monthlyDeposit - Amount added at the end of each month (PMT).
 * @param monthlyRateDecimal - Interest rate per month, as a decimal (6% annual → 0.06/12 = 0.005).
 * @param months - Number of whole months (n), non-negative integer.
 * @returns Balance after `months` months, unrounded.
 *
 * @example futureValue(1000, 100, 0.06 / 12, 120) // ≈ 18207.33
 */
const futureValue = (
    principal: number,
    monthlyDeposit: number,
    monthlyRateDecimal: number,
    months: number,
): number => {
    if (months === 0) {
        return principal
    } else if (monthlyRateDecimal === 0) {
        return principal + monthlyDeposit * months
    }

    const growth = Math.pow(1 + monthlyRateDecimal, months)
    return principal * growth + monthlyDeposit * ((growth - 1) / monthlyRateDecimal)
}

// Every projection runs over a fixed 50-year horizon.
const PROJECTION_YEARS = 50

export const projectFiftyYearSavings = (params: ProjectionParams): Projection => {
    const { initialSavings, monthlyDeposit, annualInterestRate } = params
    const monthlyRate = annualInterestRate / 12 / 100
    const totalMonths = Math.round(PROJECTION_YEARS * 12)

    const points: ProjectionPoint[] = new Array(totalMonths + 1)
    for (let month = 0; month <= totalMonths; month++) {
        const balance = futureValue(initialSavings, monthlyDeposit, monthlyRate, month)
        const contributions = initialSavings + monthlyDeposit * month
        points[month] = {
            month,
            balance: round2(balance),
            contributions: round2(contributions),
            interest: round2(balance - contributions),
        }
    }

    return { params, points }
}
