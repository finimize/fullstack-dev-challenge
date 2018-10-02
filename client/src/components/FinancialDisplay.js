import React from 'react'
import DisplayGraph from './DisplayGraph'
import './FinancialDisplay.css'

export class FinancialDisplay extends React.PureComponent {
  render() {
    return (
      <div className="fmz-display">
        <DisplayGraph data={this.props.calculations} />
        <h1>Savings by month </h1>
        <div className="months">
          {this.props.calculations.map(month => (
            <div key={month.month} className="month">
              <span>{month.month}</span>
              <span>:</span>
              <span>{month.amount}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
