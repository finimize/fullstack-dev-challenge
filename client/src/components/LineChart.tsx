import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend,
    type ChartOptions,
} from 'chart.js'
import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import theme from '../theme'
import { formatCompactCurrency, formatCurrency } from '../utils'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend,
)

export type LineChartDataset = {
    label: string
    data: number[]
    colour: string
    fillColour?: string
}

type Props = {
    xAxisData: string[]
    datasets: LineChartDataset[]
    title?: string
    xLabel?: string
    yLabel?: string
}

const LineChart = ({ xAxisData, datasets, title, xLabel, yLabel }: Props) => {
    const options = useMemo<ChartOptions<'line'>>(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: { display: false },
                title: { display: !!title, text: title },
                tooltip: {
                    callbacks: {
                        label: (ctx) =>
                            `${ctx.dataset.label}: ${formatCurrency(Number(ctx.parsed.y ?? 0))}`,
                    },
                },
            },
            scales: {
                y: {
                    title: { display: !!yLabel, text: yLabel },
                    ticks: {
                        callback: (value) => formatCompactCurrency(Number(value)),
                    },
                },
                x: {
                    title: { display: !!xLabel, text: xLabel },
                },
            },
            elements: {
                point: { radius: 0, hitRadius: 10 },
                line: { tension: 0.25, borderWidth: 2 },
            },
        }),
        [title, xLabel, yLabel, datasets.length],
    )

    const data = useMemo(
        () => ({
            labels: xAxisData,
            datasets: datasets.map((d) => ({
                label: d.label,
                data: d.data,
                borderColor: d.colour,
                backgroundColor: d.fillColour ?? theme.colors.blue100,
                fill: !!d.fillColour,
            })),
        }),
        [xAxisData, datasets],
    )

    return <Line data={data} options={options} />
}

export default LineChart
