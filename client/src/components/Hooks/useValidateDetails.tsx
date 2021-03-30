import { useContext } from 'react'
import { AppContext } from '../../store'
import { VALIDATE_DETAILS } from '../../store/types'

interface ValidationDetailsInterface {
    valid: boolean
    error: {
        firstName: string
        lastName: string
        email: string
    }
}

export const useValidateDetails: () => ValidationDetailsInterface = () => {
    const { state } = useContext(AppContext)

    const validateNonEmpty = (str: string): string =>
        str.length === 0 || !str.trim() ? 'Please enter a value' : ''
    const validateEmail = (email: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email.toLowerCase()) ? '' : 'Add a valid email'
    }

    const firstNameErrors = validateNonEmpty(state.details.firstName.value)
    const lastNameErrors = validateNonEmpty(state.details.lastName.value)
    const emailErrors = validateEmail(state.details.email.value)

    return {
        valid: !(!!firstNameErrors || !!lastNameErrors || !!emailErrors),
        error: {
            firstName: firstNameErrors,
            lastName: lastNameErrors,
            email: emailErrors,
        },
    }
}
