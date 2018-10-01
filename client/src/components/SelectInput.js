import React from 'react'
import PropTypes from 'prop-types'
import './SelectInput.css'

export class SelectInput extends React.PureComponent {
  render() {
    return (
      <div className="fmz-select">
        <select onChange={e => this.props.onChange(e.target.value)}>
          {this.props.values.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    )
  }
}

SelectInput.propTypes = {
  values: PropTypes.array,
  value: PropTypes.string,
}
