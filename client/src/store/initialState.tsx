import { StateInterface } from './store.interface'

export const initialState: StateInterface = {
    details: {
        firstName: {
            value: '',
            error: '',
        },
        lastName: {
            value: '',
            error: '',
        },
        email: {
            value: '',
            error: '',
        },
    },
    data: {
        value: [],
        error: '',
        isLoading: false,
    },
}
