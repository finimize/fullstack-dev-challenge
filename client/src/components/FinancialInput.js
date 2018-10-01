import React from 'react'
import PropTypes from 'prop-types'
import { CurrencyInput } from './CurrencyInput'
import SliderInput from './SliderInput'

export class FinancialInput extends React.PureComponent {
  state = {
    initialSavings: 0,
    monthlySavings: 0,
    yearlyInterest: 4,
    interestMonthlyRecurrency: 1,
  }

  componentDidUpdate = () => {
    this.props.onVariablesUpdated(this.state)
  }

  render() {
    return (
      <div className="financial-inputs">
        <p className="input-label">How much have you saved?</p>
        <CurrencyInput
          value={this.state.initialSavings}
          onChange={initialSavings => this.setState({ initialSavings })}
        />

        <p className="input-label">How much will you save each month?</p>
        <CurrencyInput
          value={this.state.monthlySavings}
          onChange={monthlySavings => this.setState({ monthlySavings })}
        />

        <p className="input-label">How much interest will you earn per year?</p>
        <SliderInput defaultValue={4} />
      </div>
    )
  }
}

FinancialInput.propTypes = {
  onVariablesUpdated: PropTypes.func,
}
