import { Router, NextFunction } from 'express'
import { validationResult } from 'express-validator'

import { projectionsService } from '../../../services/projections'

import { QUERY_VALIDATORS } from './validators'
import type { GetProjectionsAPIRequest, GetProjectionsAPIResponse } from './types'

export class Projections {
    public router = Router()

    constructor() {
        this.router.get('/getProjections', QUERY_VALIDATORS, this.getProjections)
    }

    private async getProjections(
        req: GetProjectionsAPIRequest,
        res: GetProjectionsAPIResponse,
        next: NextFunction
    ) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        const {
            monthly_deposit,
            initial_savings,
            start_year = 0,
            end_year = 50,
            start_interest = 0,
            end_interest = 15,
        } = req.query

        try {
            const projections = projectionsService.getYearlyProjectionsByInterestRateRange(
                initial_savings,
                monthly_deposit,
                [start_year, end_year],
                [start_interest, end_interest]
            )

            return res.json({ projections }).status(200)
        } catch (error) {
            next(error)
        }
    }
}
