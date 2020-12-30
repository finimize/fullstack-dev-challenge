import 'source-map-support/register'
import express from 'express'
import serverless from 'serverless-http'

const app = express()

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/client'))
}

export const handler = serverless(app)
