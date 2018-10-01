import React from 'react'
import DisplayGraph from './DisplayGraph'

export class FinancialDisplay extends React.PureComponent {
  render() {
    return (
      <div className="financial-display">
        {/*We have included some sample data here, you will need to replace this
    with your own. Feel free to change the data structure if you wish.*/}
        <DisplayGraph
          data={[
            {
              month: 1,
              amount: 500,
            },
            {
              month: 2,
              amount: 700,
            },
            {
              month: 3,
              amount: 1000,
            },
            {
              month: 4,
              amount: 1500,
            },
          ]}
        />
      </div>
    )
  }
}
