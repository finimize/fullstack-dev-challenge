export interface APIValidationError {
    msg: string
    param: string
}

export const toUserFriendlyString = (validationErrors: APIValidationError[] | undefined) =>
    !!validationErrors
        ? validationErrors.reduce(
              (userFriendlyString, { param, msg }) => userFriendlyString + `${param}: ${msg}\n`,
              ''
          )
        : 'Ups, something has gone wrong, please try again later'
