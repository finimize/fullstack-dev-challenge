import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import interestRoutes from './routes/interest'
import error from './middlewares/error'

const app = express()

app.set("port", process.env.PORT || 3001)

app.use(bodyParser.json())

app.use(cors())

app.use('/interest', interestRoutes)

app.use(error())

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
}

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`) // eslint-disable-line no-console
})
