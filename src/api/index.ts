import { Express } from 'express'
import { Projections } from './routes/projections/projections'

export const initRoutes = (apiVersion: string, app: Express) => {
    app.use(apiVersion, new Projections().router)
}
