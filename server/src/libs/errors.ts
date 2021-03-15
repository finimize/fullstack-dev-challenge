function createError (errorType: string) {
  class BaseError extends Error {
    constructor (...params: string[]) {
      super(...params)
      this.name = errorType
    }
  }
  return BaseError
}

export const ValidationError = createError('ValidationError')
