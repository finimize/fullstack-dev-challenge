import React from 'react'
import { FinancialInput } from './FinancialInput'
import { Header } from './Header'
import { FinancialDisplay } from './FinancialDisplay'
import { debounce } from '../utils/debounce'
import { calculateSavings } from '../api/calculateSavings'

export class FinimizeInterestRateCalculator extends React.Component {
  state = {
    calculations: [],
  }

  render() {
    return (
      <div>
        <Header />
        <FinancialInput
          onVariablesUpdated={debounce(variables => {
            calculateSavings(variables).then(result =>
              this.setState({ calculations: result.calculations }),
            )
          }, 1000)}
        />
        <FinancialDisplay calculations={this.state.calculations} />
      </div>
    )
  }
}
