import { Router, type Request, type Response, type NextFunction } from 'express'
import { projectFiftyYearSavings } from '../services/compoundInterest.js'
import { parseProjectionParams } from '../validation/projectionParams.js'

const router = Router()

// Returns a fixed 50-year investment projection. Callers only supply the
// savings inputs (initialSavings, monthlyDeposit, annualInterestRate); the
// projection horizon is not client-configurable.
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const params = parseProjectionParams(req.query as Record<string, unknown>)
        const projection = projectFiftyYearSavings(params)
        res.json(projection)
    } catch (err) {
        next(err)
    }
})

export default router
