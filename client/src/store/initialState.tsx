import { StateInterface, CompoundingFrequency } from './store.interface'

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
        value: null,
        error: '',
        isLoading: false,
    },
    calculations: {
        initialSavings: {
            value: '10',
            error: '',
        },
        interestRate: 20,
        compoundingFrequency: CompoundingFrequency.annually,
        monthlyContributions: {
            value: '0',
            error: '',
        },
    },
    calculatorMode: 'Simple',
    currentPage: 1,
}
