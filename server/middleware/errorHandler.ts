import type { Request, Response, NextFunction } from 'express'
import { ValidationError } from '../validation/projectionParams.js'

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof ValidationError) {
        return res.status(400).json({
            error: 'ValidationError',
            field: err.field,
            message: err.message,
        })
    }

    // eslint-disable-next-line no-console
    console.error(err)
    res.status(500).json({ error: 'InternalServerError' })
}
