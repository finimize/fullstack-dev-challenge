import express, { type Express } from 'express'
import projectionsRouter from './routes/projections.js'
import { errorHandler } from './middleware/errorHandler.js'

export const createApp = (): Express => {
    const app = express()

    app.use(express.json())

    app.use('/api/projections', projectionsRouter)

    // Express only serves static assets in production
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static('client/build'))
    }

    app.use(errorHandler)

    return app
}
