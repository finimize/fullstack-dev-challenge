import { ChartLegendOptions, ChartOptions } from 'chart.js'
import React, { FC } from 'react'
import { Line } from 'react-chartjs-2'
import { theme } from '../../theme'

type Props = {
    xAxisData: number[]
    yAxisData: number[]
    title?: string
    xLabel?: string
    yLabel?: string
}

export const LineChart: FC<Props> = ({ xAxisData, yAxisData, title, xLabel, yLabel }: Props) => {
    const legendOptions: ChartLegendOptions = {
        display: false,
    }

    /* istanbul ignore next */
    const options: ChartOptions = {
        tooltips: {
            callbacks: {
                title: (tooltipItem) => {
                    const year = Math.floor(Number(tooltipItem[0].xLabel))
                    const month = (Number(tooltipItem[0].xLabel) * 12) % 12
                    return `Year ${year}, Month ${month}`
                },
            },
        },
        title: {
            display: !!title,
            text: title,
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
                    ticks: {
                        display: true,
                        callback: (value) => (Number.isInteger(value) ? value : undefined),
                        stepSize: 12,
                        autoSkip: true,
                        maxTicksLimit: 20,
                    },
                    gridLines: { display: false },
                    distribution: 'series',
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
                        steppedLine: true,
                    },
                ],
            }}
            options={options}
            legend={legendOptions}
        />
    )
}
