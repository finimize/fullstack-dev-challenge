import { CALCULATE_SAVINGS_RESULT } from './stubs/calculateSavings'

export const calculateSavings = ({
  initialSavings,
  monthlySavings,
  yearlyInterest,
  interestRecurrency,
}) => Promise.resolve(CALCULATE_SAVINGS_RESULT)
