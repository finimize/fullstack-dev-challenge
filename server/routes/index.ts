import express from 'express';
import {router as calculationRoute} from './calculations.route';

const routes = express.Router();

routes.use('/', calculationRoute);

export {
    routes
}