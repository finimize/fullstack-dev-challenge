import React from 'react'
import PropTypes from 'prop-types'
import './CurrencyInput.css'

export class CurrencyInput extends React.PureComponent {
  render() {
    return (
      <div className="currency-input">
        <span>£</span>
        <input
          type="text"
          value={this.props.value}
          onChange={e => this.props.onChange(parseFloat(e.target.value))}
        />
      </div>
    )
  }
}

CurrencyInput.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
}
