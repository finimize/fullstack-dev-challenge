import { useState } from 'react'

import { ValidationError } from './validation'

type OnFormValidationFn<FormValues extends Record<string, any>> = (
    formIsValid: boolean,
    formValues: FormValues,
    validationErrors: ValidationError[]
) => void

export const useFormValues = <FormValues extends Record<string, any>>(
    INITIAL_FORM_VALUES: FormValues,
    formValidator: (formValues: FormValues) => ValidationError[],
    onFormUpdate: OnFormValidationFn<FormValues>
) => {
    const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES)
    const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])

    const updateFormValue = (valueKeyToUpdate: keyof FormValues) => (
        newValue: FormValues[keyof FormValues]
    ) => {
        const newFormValues = {
            ...formValues,
            [valueKeyToUpdate]: newValue,
        }

        setFormValues(newFormValues)

        const validationErrors = formValidator(newFormValues)

        setValidationErrors(validationErrors)

        const formIsValid = !validationErrors.length

        onFormUpdate(formIsValid, newFormValues, validationErrors)
    }

    const getErrorMessage = (formValueKey: keyof FormValues) =>
        validationErrors.find(({ key }) => key === formValueKey)?.message

    return { formValues, validationErrors, updateFormValue, getErrorMessage }
}
