import { Request, Response, NextFunction } from 'express'

export const setupErrorHandling = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    console.error(err)
    res.status(500).send('Unexpected Server Error')
}
