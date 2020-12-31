import { getFormValidator, isGTE } from '../../form'

export const INITIAL_FORM_VALUES = {
    initialSavingsAmount: '50000',
    monthlyDeposit: '100',
}
export const INITIAL_INTEREST_RATE = 2
export const YEAR_RANGE_TO_FETCH = [0, 50] as [number, number]

export type FormValues = typeof INITIAL_FORM_VALUES

export const FORM_VALIDATORS = getFormValidator({
    initialSavingsAmount: [
        {
            message: 'Initial savings amount is required',
            condition: (val) => String(val).length === 0,
        },
        {
            message: 'Initial savings amount should be equal or greater than zero',
            condition: (val) => !isGTE(val, 0),
        },
        {
            message: 'Initial savings amount too big',
            condition: (val) => !Number.isSafeInteger(Number(val)),
        },
    ],
    monthlyDeposit: [
        {
            message: 'Monthly deposit amount is required',
            condition: (val) => String(val).length === 0,
        },
        {
            message: 'Monthly deposit amount should be equal or greater than zero',
            condition: (val) => !isGTE(val, 0),
        },
        {
            message: 'Monthly deposit amount too big',
            condition: (val) => !Number.isSafeInteger(Number(val)),
        },
    ],
})
