import React, { Fragment } from 'react'
import { FinancialInput } from './FinancialInput'
import { Header } from './Header'
import { FinancialDisplay } from './FinancialDisplay'

export class FinimizeInterestRateCalculator extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <FinancialInput />
        <FinancialDisplay />
      </div>
    )
  }
}
