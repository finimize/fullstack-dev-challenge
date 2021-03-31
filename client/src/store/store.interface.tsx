import {
    UPDATE_DETAILS,
    UPDATE_CALCULATIONS,
    UPDATE_INTEREST,
    UPDATE_DATA,
    VALIDATE_DETAILS,
    NEXT_PAGE,
    TOGGLE_MODE,
    PREVIOUS_PAGE,
} from './types'

export interface TextInputInterface {
    value: string
    error: string
}

interface DetailsInterface {
    firstName: TextInputInterface
    lastName: TextInputInterface
    email: TextInputInterface
}

interface DataInterface {
    value?: number[]
    error: string
    isLoading: boolean
}

export interface CalculationsInterface {
    initialSavings: TextInputInterface
    interestRate: number
    compoundingFrequency: number
    monthlyContributions: TextInputInterface
}

export interface StateInterface {
    details: DetailsInterface
    data: DataInterface
    currentPage: number
    calculatorMode: string
    calculations: CalculationsInterface
}

export type UpdateDetailsTypeInterface = {
    type: typeof UPDATE_DETAILS
    field: 'firstName' | 'lastName' | 'email'
    payload: Partial<TextInputInterface>
}
export type UpdateCalculationsTypeInterface = {
    type: typeof UPDATE_CALCULATIONS
    field: 'initialSavings' | 'monthlyContributions'
    payload: Partial<TextInputInterface>
}

export type UpdateInterestRateInterface = {
    type: typeof UPDATE_INTEREST
    payload: number
}

export type AppProps = {
    children: React.ReactNode
}

export type ValidateDetailsTypeInterface = {
    type: typeof VALIDATE_DETAILS
    payload: {
        firstName: string
        lastName: string
        email: string
    }
}

export type NextPageTypeInterface = {
    type: typeof NEXT_PAGE
}

export type PreviousPageTypeInterface = {
    type: typeof PREVIOUS_PAGE
}

export type ToggleModeInterface = {
    type: typeof TOGGLE_MODE
    payload: string
}

export type UpdateDataInterface = {
    type: typeof UPDATE_DATA
    payload: number[]
}
