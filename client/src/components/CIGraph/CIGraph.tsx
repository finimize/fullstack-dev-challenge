import { Box } from '@chakra-ui/react'
import React from 'react'

import { IProjection } from '../../api/compoundInterest/calculateProjection'
import LineChart from '../../uicomponents/LineChart'

type Props = {
  projection: IProjection[]
}

const CIGraph = ({ projection }: Props) => {
  const yearlyProjection = projection.filter(({ month }) => {
    return !(month % 12)
  })

  return (
    <Box >
      <LineChart
        title="Savings Over time"
        xAxisData={yearlyProjection.map(({ month }) => month / 12 )}
        yAxisData={yearlyProjection.map(({ balance }) => balance)}
        xLabel="Years"
        yLabel="Amount"
      />
    </Box>
  )
}

export default CIGraph
