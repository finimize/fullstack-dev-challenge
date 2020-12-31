export interface Validator {
    message: string
    condition: (value: unknown) => boolean
}

export interface ValidationError {
    key: string
    message: string
}

export const getFormValidator = <
    FormValidators extends Record<string, Validator[]>,
    FormValues extends Record<keyof FormValidators, any>
>(
    formValidators: FormValidators
) => (formValues: FormValues) => {
    const formValueKeys = Object.keys(formValidators) as (keyof FormValidators)[]

    return formValueKeys.reduce((validationErrors, formValueKey) => {
        const conditionIsMet = (validator: Validator) =>
            validator.condition(formValues[formValueKey])

        const toValidationError = (validator: Validator) => ({
            key: formValueKey as string,
            message: validator.message,
        })

        const formValueKeyErrors = formValidators[formValueKey]
            .filter(conditionIsMet)
            .map(toValidationError)

        return [...validationErrors, ...formValueKeyErrors]
    }, [] as ValidationError[])
}

export const isGTE = (value: unknown, num: number) => {
    const numValue = Number(value)
    return !isNaN(numValue) && numValue >= num
}
