import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './SliderInput.css'

export class SliderInput extends Component {
  render() {
    return (
      <div className="fmz-slider">
        <p>{this.props.value}%</p>
        <input
          type="range"
          value={this.props.value}
          min={0}
          max={10}
          step={0.25}
          onChange={e => this.props.onChange(parseFloat(e.target.value))}
        />
      </div>
    )
  }
}

SliderInput.propTypes = {
  value: PropTypes.number,
}
