import 'source-map-support/register'
import express from 'express'
import { initRoutes } from './api'
import serverless from 'serverless-http'

import { setupErrorHandling } from './error/setupErrorHandling'

const app = express()

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/client'))
}

initRoutes('/api/v1', app)

app.use(setupErrorHandling)

export const handler = serverless(app)
