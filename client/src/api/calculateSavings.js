import { apolloClient } from '../apolloClient'
import gql from 'graphql-tag'

export const calculateSavings = variables => {
  const query = gql`
    {
      calculations: calculateSavings(
        initialSavings: 0
        monthlySavings: 0
        yearlyInterest: 0
        interestRecurrency: Monthly
      ) {
        month
        amount
      }
    }
  `
  return apolloClient.query({ query, variables }).then(res => res.data)
}
