type YearlyProjectionsByInterestRate = {
    [interestRate: number]: YearlyProjections
}

const toInteger = (num: number) => Math.floor(num)

export const getYearlyProjectionsByInterestRateRange = (
    initialAmount: number,
    monthlyDeposit: number,
    yearRange: [startYearYear: number, endYearYear: number],
    yearlyNominalInterestPercentageRange: [initialInterest: number, finalInterest: number]
): YearlyProjectionsByInterestRate => {
    const [initialInterest, finalInterest] = yearlyNominalInterestPercentageRange.map(toInteger)

    const yearlyProjectionsByInterestRate: YearlyProjectionsByInterestRate = {}

    for (let interestRate = initialInterest; interestRate <= finalInterest; interestRate++) {
        yearlyProjectionsByInterestRate[interestRate] = getYearlyProjections(
            initialAmount,
            monthlyDeposit,
            interestRate,
            yearRange
        )
    }

    return yearlyProjectionsByInterestRate
}

type YearlyProjections = { [year: number]: number }

const getYearlyProjections = (
    initialAmount: number,
    monthlyDeposit: number,
    yearlyNominalInterestPercentage: number,
    yearRange: [startYear: number, endYear: number]
): YearlyProjections => {
    const [startYear, endYear] = yearRange.map(toInteger)

    const yearlyProjections: YearlyProjections = {}

    for (let currentYear = startYear; currentYear <= endYear; currentYear++) {
        yearlyProjections[currentYear] = getProjectionForYear(
            initialAmount,
            monthlyDeposit,
            currentYear,
            yearlyNominalInterestPercentage
        )
    }

    return yearlyProjections
}

export class InvalidArgumentError extends Error {
    constructor() {
        super('arguments must be positive numbers')
    }
}

export const getProjectionForYear = (
    initialAmount: number,
    monthlyDeposit: number,
    year: number,
    yearlyNominalInterestPercentage: number
): number => {
    if (
        initialAmount < 0 ||
        monthlyDeposit < 0 ||
        year < 0 ||
        yearlyNominalInterestPercentage < 0
    ) {
        throw new InvalidArgumentError()
    }

    const monthlyInterestRate = yearlyNominalInterestPercentage / 100 / 12
    const monthNumber = toInteger(year) * 12

    const compoundingFactor = Math.pow(1 + monthlyInterestRate, monthNumber)

    const futureValueOfInitialAmount = initialAmount * compoundingFactor

    const futureValueOfMonthlyDeposits =
        monthlyInterestRate === 0
            ? monthlyDeposit * monthNumber
            : (monthlyDeposit * (compoundingFactor - 1)) / monthlyInterestRate

    return futureValueOfInitialAmount + futureValueOfMonthlyDeposits
}
