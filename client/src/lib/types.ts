export interface ISavingsInputs {
    initialSavings: number
    monthlyDeposit: number
    interestRate: number
}

export interface ISavingsResults {
    totalSaved: number
    totalInvested: number
    interestEarned: number
}
