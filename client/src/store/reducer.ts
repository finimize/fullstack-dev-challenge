import { UPDATE_DETAILS, VALIDATE_DETAILS, NEXT_PAGE, TOGGLE_MODE, PREVIOUS_PAGE } from './types'
import {
    StateInterface,
    UpdateDetailsTypeInterface,
    ValidateDetailsTypeInterface,
    NextPageTypeInterface,
    ToggleModeInterface,
    PreviousPageTypeInterface,
} from './store.interface'

export const reducer = (
    initialState: StateInterface,
    action:
        | UpdateDetailsTypeInterface
        | ValidateDetailsTypeInterface
        | NextPageTypeInterface
        | PreviousPageTypeInterface
        | ToggleModeInterface,
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
        case UPDATE_DETAILS:
            return {
                ...initialState,
                details: {
                    ...initialState.details,
                    [action.field]: action.payload,
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
