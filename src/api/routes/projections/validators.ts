import { query } from 'express-validator'

import type { GetRequestHandler } from './types'

const DEFAULT_QUERY_VALUES = {
    start_year: 0,
    end_year: 50,
    start_interest: 0,
    end_interest: 15,
}

const addDefaultQueryValues: GetRequestHandler = (req, _, next) => {
    req.query = { ...DEFAULT_QUERY_VALUES, ...req.query }
    next()
}

export const QUERY_VALIDATORS: GetRequestHandler[] = [
    addDefaultQueryValues,
    query('initial_savings', 'is required').exists(),
    query('initial_savings', 'must be a numeric value greater than or equal to zero')
        .custom((value) => Number(value) >= 0)
        .toFloat(),
    query('monthly_deposit', 'is required').exists(),
    query('monthly_deposit', 'must be a numeric value greater than or equal to zero')
        .custom((value) => Number(value) >= 0)
        .toFloat(),
    query('start_year', 'must be an integer').optional().isInt(),
    query('start_year', 'must be greater than or equal to zero')
        .optional()
        .custom((value) => Number(value) >= 0)
        .toInt(),
    query('end_year', 'must be an integer').optional().isInt(),
    query('end_year', "must be greater than or equal to 'start_year'")
        .optional()
        .custom((end_year, { req: { query } }) => {
            const start_year = query?.['start_year']

            if (start_year) {
                return Number(end_year) >= Number(start_year)
            }

            return true
        })
        .toInt(),
    query('start_interest', 'must be an integer').optional().isInt(),
    query('start_interest', 'must be greater than or equal to zero')
        .optional()
        .custom((value) => Number(value) >= 0)
        .toInt(),
    query('end_interest', 'must be an integer').optional().isInt(),
    query('end_interest', "must be greater than or equal to 'start_interest'")
        .optional()
        .custom((end_interest, { req: { query } }) => {
            const start_interest = query?.['start_interest']

            if (start_interest) {
                return Number(end_interest) >= Number(start_interest)
            }

            return true
        })
        .toInt(),
]
