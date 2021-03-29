import { UPDATE_DETAILS } from './types'
import { StateInterface, UpdateDetailsTypeInterface } from './store.interface'

export const reducer = (
    initialState: StateInterface,
    action: UpdateDetailsTypeInterface,
): StateInterface => {
    switch (action.type) {
        case UPDATE_DETAILS:
            return {
                ...initialState,
                details: {
                    ...initialState.details,
                    [action.field]: action.payload,
                },
            }
        default:
            return initialState
    }
}
