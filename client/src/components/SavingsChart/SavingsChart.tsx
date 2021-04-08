import React, { FC, useContext, useMemo } from 'react'
import { Text } from '@chakra-ui/react'
import { AppContext } from '../../store'
import { Card } from '../Card'
import { LineChart } from './LineChart'

export const SavingsChart: FC = () => {
    const { state } = useContext(AppContext)

    const monthsAxes = useMemo(() => Array.from({ length: 601 }, (_, i) => i / 12), [])

    return (
        <Card>
            <Text
                fontSize='sm'
                marginBottom='4'
                color='blueHeader'
                fontWeight='700'
                textAlign='center'
            >
                Overview
            </Text>
            <LineChart
                title='Savings Over time'
                xAxisData={monthsAxes}
                yAxisData={state.data.value?.yearlySavings || []}
                xLabel='Years'
                yLabel='Amount (£)'
            />
        </Card>
    )
}
