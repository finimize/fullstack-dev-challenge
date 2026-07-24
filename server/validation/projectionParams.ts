import type { ProjectionParams } from '../../shared/projection.js'

export class ValidationError extends Error {
    readonly field: string
    constructor(field: string, message: string) {
        super(message)
        this.name = 'ValidationError'
        this.field = field
    }
}

const INPUT_BOUNDARIES: Record<keyof ProjectionParams, { min: number; max: number }> = {
    initialSavings: { min: 0, max: 100_000 },
    monthlyDeposit: { min: 0, max: 5_000 },
    annualInterestRate: { min: 0, max: 100 },
}

const parsePositiveNumber = (raw: unknown, field: string): number => {
    // Query params arrive as strings, so coerce before validating.
    const value = typeof raw === 'string' ? Number(raw) : raw
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
        throw new ValidationError(field, `${field} field must be a positive finite number`)
    }
    return value
}

const enforceBounds = (value: number, field: keyof typeof INPUT_BOUNDARIES): number => {
    const { min, max } = INPUT_BOUNDARIES[field]
    if (value < min || value > max) {
        throw new ValidationError(field, `${field} must be between ${min} and ${max}`)
    }
    return value
}

export const parseProjectionParams = (source: Record<string, unknown>): ProjectionParams => {
    const initialSavings = enforceBounds(
        parsePositiveNumber(source.initialSavings, 'initialSavings'),
        'initialSavings',
    )
    const monthlyDeposit = enforceBounds(
        parsePositiveNumber(source.monthlyDeposit, 'monthlyDeposit'),
        'monthlyDeposit',
    )
    const annualInterestRate = enforceBounds(
        parsePositiveNumber(source.annualInterestRate, 'annualInterestRate'),
        'annualInterestRate',
    )

    return { initialSavings, monthlyDeposit, annualInterestRate }
}
