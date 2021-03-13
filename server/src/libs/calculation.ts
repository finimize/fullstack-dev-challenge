import { roundValue } from "./numbers"

interface MonthlyCIRequest {
  principalDeposit: number;
  monthlyDeposit: number;
  monthlyRate: number;
  period: number;
}

export const calculateValueOnMonthlyCI = (request: MonthlyCIRequest): number => {
  const { principalDeposit, monthlyDeposit, monthlyRate, period } = request

  const valueOfRecurring = monthlyDeposit * (Math.pow(1 + monthlyRate, period) - 1) / monthlyRate
  const valueOfPrincipal = principalDeposit * Math.pow(1 + monthlyRate, period)

  const totalValue = valueOfPrincipal + valueOfRecurring

  const roundedTotal = roundValue(totalValue)

  return roundedTotal
}

interface ProjectionData {
  month: number;
  deposit: number;
  interest: number;
  totalDeposit: number;
  totalInterest: number;
  balance: number;
}

export const createMonthlyCIProjection = (request: MonthlyCIRequest): Array<ProjectionData> => {
  const { principalDeposit, monthlyDeposit, period } = request

  const projection: Array<ProjectionData> = []

  for (let i: number = 0; i <= period; i ++ ) {
    const balance = calculateValueOnMonthlyCI({
      ...request,
      period: i
    })

    const totalDeposit = principalDeposit + monthlyDeposit * i

    const totalInterest = roundValue(balance - totalDeposit)
    const interest = i ? roundValue(totalInterest - projection[i - 1].totalInterest) : 0

    const monthlyData: ProjectionData = {
      month: i,
      deposit: i ? monthlyDeposit : principalDeposit,
      totalDeposit,
      totalInterest,
      interest,
      balance
    }

    projection.push(monthlyData)
  }

  return projection
}