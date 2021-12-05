export function calculateSavingsOverTime(periodInYears: number, initialDeposit: number, monthlySavings: number, interestRate: number): Array<number> {
    let savingsOverTime: Array<number> = []

    for (let i = 1; i <= periodInYears; i++) {
        const totalMonths = 12 * i
        const monthlyInterestRate = interestRate / 12
        const compoundPrincipal = initialDeposit * ((1 + monthlyInterestRate)**totalMonths)
        const compoundSavings = monthlySavings * (((1 + monthlyInterestRate)**totalMonths - 1) / monthlyInterestRate)
        savingsOverTime[i-1] = Math.round(compoundPrincipal + compoundSavings)
    }
    return savingsOverTime
}
