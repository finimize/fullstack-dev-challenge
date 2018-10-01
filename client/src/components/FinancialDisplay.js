import React from 'react'
import DisplayGraph from './DisplayGraph'

export class FinancialDisplay extends React.PureComponent {
  render() {
    return (
      <div className="financial-display">
        <DisplayGraph data={this.props.calculations} />
      </div>
    )
  }
}
