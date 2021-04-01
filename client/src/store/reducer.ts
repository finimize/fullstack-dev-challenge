import {
    UPDATE_DETAILS,
    UPDATE_CALCULATIONS,
    UPDATE_INTEREST,
    UPDATE_DATA,
    VALIDATE_DETAILS,
    NEXT_PAGE,
    TOGGLE_MODE,
    TOGGLE_COMPOUNDING_FREQUENCY,
    PREVIOUS_PAGE,
} from './types'
import {
    StateInterface,
    UpdateDetailsTypeInterface,
    UpdateCalculationsTypeInterface,
    UpdateInterestRateInterface,
    UpdateDataInterface,
    ValidateDetailsTypeInterface,
    NextPageTypeInterface,
    ToggleModeInterface,
    ToggleCompoundingFrequencyInterface,
    PreviousPageTypeInterface,
    CompoundingFrequency,
} from './store.interface'

export const reducer = (
    initialState: StateInterface,
    action:
        | UpdateDetailsTypeInterface
        | UpdateCalculationsTypeInterface
        | UpdateInterestRateInterface
        | UpdateDataInterface
        | ValidateDetailsTypeInterface
        | NextPageTypeInterface
        | PreviousPageTypeInterface
        | ToggleModeInterface
        | ToggleCompoundingFrequencyInterface,
): StateInterface => {
    switch (action.type) {
        case NEXT_PAGE: {
            return {
                ...initialState,
                currentPage: initialState.currentPage + 1,
            }
        }
        case PREVIOUS_PAGE: {
            return {
                ...initialState,
                currentPage: initialState.currentPage - 1,
            }
        }
        case TOGGLE_MODE: {
            return {
                ...initialState,
                calculatorMode: action.payload,
            }
        }
        case TOGGLE_COMPOUNDING_FREQUENCY: {
            return {
                ...initialState,
                calculations: {
                    ...initialState.calculations,
                    compoundingFrequency:
                        CompoundingFrequency[action.payload as keyof typeof CompoundingFrequency],
                },
            }
        }
        case UPDATE_DETAILS:
            return {
                ...initialState,
                details: {
                    ...initialState.details,
                    [action.field]: action.payload,
                },
            }
        case UPDATE_CALCULATIONS:
            return {
                ...initialState,
                calculations: {
                    ...initialState.calculations,
                    [action.field]: action.payload,
                },
            }
        case UPDATE_INTEREST:
            return {
                ...initialState,
                calculations: {
                    ...initialState.calculations,
                    interestRate: action.payload,
                },
            }
        case UPDATE_DATA:
            return {
                ...initialState,
                data: {
                    ...initialState.data,
                    ...action.payload,
                },
            }
        case VALIDATE_DETAILS:
            return {
                ...initialState,
                details: {
                    ...initialState.details,
                    firstName: {
                        ...initialState.details.firstName,
                        error: action.payload.firstName,
                    },
                    lastName: {
                        ...initialState.details.lastName,
                        error: action.payload.lastName,
                    },
                    email: {
                        ...initialState.details.email,
                        error: action.payload.email,
                    },
                },
            }
        default:
            return initialState
    }
}
