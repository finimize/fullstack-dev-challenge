import React from 'react'
import { FinancialInput } from './FinancialInput'
import { Header } from './Header'
import { FinancialDisplay } from './FinancialDisplay'
import { debounce } from '../utils/debounce'

export class FinimizeInterestRateCalculator extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <FinancialInput
          onVariablesUpdated={debounce(variables => {
            console.log('debounce', variables)
          }, 1000)}
        />
        <FinancialDisplay />
      </div>
    )
  }
}
