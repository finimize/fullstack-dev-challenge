/**
 * Shared projection contract used by both the client and the server.
 * Keep this file to pure data shapes only — no validation, framework, or
 * runtime code — so it can be safely imported from either side.
 */

export type ProjectionParams = {
    initialSavings: number
    monthlyDeposit: number
    annualInterestRate: number
}

export type ProjectionPoint = {
    month: number
    balance: number
    contributions: number
    interest: number
}

export type Projection = {
    params: ProjectionParams
    points: ProjectionPoint[]
}
