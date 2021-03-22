import express from 'express';
import { postCalculations } from '../controllers/calculations.controller';

const router = express.Router();

router.route('/')
  .post(
    postCalculations,
  );

export {
  router
};
