import { Request, Response } from 'express'
import { createMonthlyCIProjection } from '../libs/calculation'

const DEFAULT_YEARS = 50
const MONTHS_IN_YEAR = 12

export const getCompoundInterest = (req: Request, res: Response) => {
  const { body } = req

  const { 
    principal,
    monthlyDeposit,
    interestRate,
    period = DEFAULT_YEARS * MONTHS_IN_YEAR
  } = body

  const monthlyRate = interestRate / 100 / MONTHS_IN_YEAR

  const requestData = {
    principalDeposit: principal,
    monthlyDeposit,
    monthlyRate,
    period
  }

  const projection = createMonthlyCIProjection(requestData)

  return res.send({ projection })
}