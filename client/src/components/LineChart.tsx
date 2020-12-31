import React from 'react'
import { Line } from 'react-chartjs-2'
import { format } from 'd3-format'

import theme from '../theme'
import { useLoadingColor } from '../utils'

type Props = {
    xAxisData: number[] | string[]
    yAxisData: number[]
    title?: string
    xLabel?: string
    yLabel?: string
    loading?: boolean
    error?: boolean
}

const LineChart = ({ xAxisData, yAxisData, title, xLabel, yLabel, loading, error }: Props) => {
    const loadingColor = useLoadingColor(loading)

    const legendOptions = {
        display: false,
    }

    const options = {
        title: {
            display: !!title,
            text: title,
        },
        scales: {
            gridlines: { display: false },
            yAxes: [
                {
                    scaleLabel: { display: !!yLabel, labelString: yLabel },
                    gridlines: { display: false },
                    ticks: {
                        callback: format(',.0f'),
                    },
                },
            ],
            xAxes: [
                {
                    scaleLabel: { display: !!xLabel, labelString: xLabel },
                    ticks: { display: true },
                },
            ],
        },
    }

    return (
        <Line
            data={{
                labels: xAxisData,
                datasets: [
                    {
                        backgroundColor: theme.colors.blue100,
                        borderColor: error ? theme.colors.danger : loadingColor,
                        data: yAxisData,
                    },
                ],
            }}
            options={options}
            legend={legendOptions}
        />
    )
}

export default LineChart
