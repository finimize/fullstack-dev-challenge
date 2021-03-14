import express from 'express'
import { getCompoundInterest } from '../handlers/interestHandler'

const router = express.Router()

router.post('/compound', getCompoundInterest)

export default router
