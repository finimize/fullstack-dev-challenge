import type { ChartTooltipItem } from 'chart.js'
import { SAVINGS_DEFAULTS } from './constants'

export const createQueryString = (queries: { [key: string]: any }): string =>
    Object.keys(queries)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(queries[key]))
        .join('&')

export const appendYearsQuery = (queryString: string) =>
    `${queryString}&years=${SAVINGS_DEFAULTS.YEARS}`

export const extractYearlyData = (projections: number[]) =>
    projections.filter((item, index) => index % 12 === 0)

export const numberFormatter = new Intl.NumberFormat('gb-GB', {
    style: 'currency',
    currency: 'GBP',
})

export const getTooltipTitle = (tooltipItems: ChartTooltipItem[]) => `Year ${tooltipItems[0].label}`

export const getTooltipLabel = (tooltipItem: ChartTooltipItem) => {
    const value = tooltipItem.value ? parseFloat(tooltipItem.value) : 0
    return numberFormatter.format(value)
}
