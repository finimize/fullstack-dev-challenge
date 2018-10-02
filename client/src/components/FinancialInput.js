import React from 'react'
import PropTypes from 'prop-types'
import { CurrencyInput } from './CurrencyInput'
import { SliderInput } from './SliderInput'
import { SelectInput } from './SelectInput'

export class FinancialInput extends React.PureComponent {
  state = {
    initialSavings: 0,
    monthlySavings: 0,
    yearlyInterest: 4,
    interestMonthlyRecurrency: 'Monthly',
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState !== this.state) {
      this.props.onVariablesUpdated(this.state)
    }
  }

  componentDidMount = () => {
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
        <SliderInput
          value={this.state.yearlyInterest}
          onChange={yearlyInterest => this.setState({ yearlyInterest })}
        />

        <p className="input-label">How often is the interest rate paid?</p>
        <SelectInput
          value={this.state.interestMonthlyRecurrency}
          values={['Monthly', 'Quarterly', 'Yearly']}
          onChange={interestMonthlyRecurrency =>
            this.setState({ interestMonthlyRecurrency })
          }
        />
      </div>
    )
  }
}

FinancialInput.propTypes = {
  onVariablesUpdated: PropTypes.func,
}
