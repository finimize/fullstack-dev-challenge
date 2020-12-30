export interface Validator {
    message: string
    checker: (value: unknown) => boolean
}

export interface ValidationError {
    key: string
    message: string
}

export const getFormValidator = <
    FormValidators extends Record<string, Validator>,
    FormValues extends Record<keyof FormValidators, any>
>(
    formValidators: FormValidators
) => (formValues: FormValues) => {
    const formValueKeys = Object.keys(formValidators) as (keyof FormValidators)[]

    const isInvalidValue = (formValueKey: keyof FormValidators) =>
        !formValidators[formValueKey]?.checker(formValues[formValueKey])

    const toValidationError = (formValueKey: keyof FormValidators): ValidationError => ({
        key: formValueKey as string,
        message: formValidators[formValueKey]?.message || '',
    })

    return formValueKeys.filter(isInvalidValue).map(toValidationError)
}

export const isGTE = (value: unknown, num: number) => {
    const numValue = Number(value)
    return !isNaN(numValue) && numValue >= num
}
