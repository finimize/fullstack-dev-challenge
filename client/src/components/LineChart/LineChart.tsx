import { ChartLegendOptions, ChartOptions } from 'chart.js'
import React from 'react'
import { Line } from 'react-chartjs-2'
import theme from '../../theme'
import { getTooltipTitle, getTooltipLabel } from '../../lib'

type Props = {
    xAxisData: number[] | string[]
    yAxisData: number[]
    title?: string
    xLabel?: string
    yLabel?: string
}

const LineChart = ({ xAxisData, yAxisData, title, xLabel, yLabel }: Props) => {
    const legendOptions: ChartLegendOptions = {
        display: false,
    }

    const options: ChartOptions = {
        title: {
            display: !!title,
            text: title,
            fontSize: 16,
        },
        scales: {
            gridLines: { display: false },
            yAxes: [
                {
                    scaleLabel: { display: !!yLabel, labelString: yLabel },
                    gridLines: { display: false },
                },
            ],
            xAxes: [
                {
                    scaleLabel: { display: !!xLabel, labelString: xLabel },
                    ticks: { display: true },
                    gridLines: { display: false },
                },
            ],
        },
        tooltips: {
            titleFontSize: 16,
            bodyFontSize: 14,
            callbacks: {
                title: (tooltipItems) => getTooltipTitle(tooltipItems),
                label: (tooltipItem) => getTooltipLabel(tooltipItem),
            },
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
