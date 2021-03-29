import { UPDATE_DETAILS } from './types'

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
}

export type UpdateDetailsTypeInterface = {
    type: typeof UPDATE_DETAILS
    field: 'firstName' | 'lastName' | 'email'
    payload: TextInputInterface
}
export type AppProps = {
    children: React.ReactNode
}
