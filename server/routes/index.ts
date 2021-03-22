import express from 'express';
import calculations from './calculations.route';

const routes = express.Router();

routes.use('/', calculations);

export {
    routes
}