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
    calculations: {
        initialSavings: {
            value: '0',
            error: '',
        },
        interestRate: 20,
        compoundingFrequency: 1,
        monthlyContributions: {
            value: '0',
            error: '',
        },
    },
    calculatorMode: 'Simple',
    currentPage: 3,
}
