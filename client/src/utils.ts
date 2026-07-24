const currencyFormatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
})
export const formatCurrency = (value: number): string => currencyFormatter.format(value)

// 'compact' abbreviates large numbers with a scale suffix, keeping up to 1 decimal
const compactFormatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    notation: 'compact',
    maximumFractionDigits: 1,
})
export const formatCompactCurrency = (value: number): string => compactFormatter.format(value)

export const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max)
