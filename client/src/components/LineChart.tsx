import React from 'react'
import { Line } from 'react-chartjs-2'
import theme from '../theme'

type Props = {
    xAxisData: number[] | string[]
    yAxisData: number[]
    title?: string
    xLabel?: string
    yLabel?: string
}

const LineChart = ({ xAxisData, yAxisData, title, xLabel, yLabel }: Props) => {
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
                        borderColor: theme.colors.primary,
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
