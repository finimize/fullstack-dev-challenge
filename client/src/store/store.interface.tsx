import { UPDATE_DETAILS, VALIDATE_DETAILS, NEXT_PAGE, TOGGLE_MODE, PREVIOUS_PAGE } from './types'

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

export interface StateInterface {
    details: DetailsInterface
    data: DataInterface
    currentPage: number
    calculatorMode: string
}

export type UpdateDetailsTypeInterface = {
    type: typeof UPDATE_DETAILS
    field: 'firstName' | 'lastName' | 'email'
    payload: Partial<TextInputInterface>
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
