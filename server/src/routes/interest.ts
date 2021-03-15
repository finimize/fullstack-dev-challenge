import express from 'express'
import Joi from 'joi'
import joiValidate from '../middlewares/joi'

import { getCompoundInterest } from '../handlers/interestHandler'

const router = express.Router()

router.post('/compound', joiValidate({
  body: {
    principal: Joi.number().min(0).max(1000000).required(),
    interestRate: Joi.number().min(0).max(20).required(),
    monthlyDeposit: Joi.number().min(0).max(10000).required(),
    period: Joi.number().min(1).max(10000)
  }
}), getCompoundInterest)

export default router
