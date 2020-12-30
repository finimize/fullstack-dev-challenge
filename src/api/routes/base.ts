import { ValidationError } from 'express-validator'

export interface BaseAPIResponse {
    errors?: ValidationError[]
}
