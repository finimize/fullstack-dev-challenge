import express from 'express'
import { getCompoundInterest } from '../handlers/interestHandler'

const router = express.Router()

router.get('/compound', getCompoundInterest)

export default router
