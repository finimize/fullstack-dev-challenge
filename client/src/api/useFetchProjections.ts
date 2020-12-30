import { useHttpFetch, BaseApiResponse } from './useHttpFetch'

export interface GetProjectionsResponseData extends BaseApiResponse {
    projections?: { [instestRate: string]: { [year: string]: number } }
}

type YearRange = [start: number, end: number]

const toInt = (num: number) => Math.floor(num)

export const useFetchProjections = (interestRatePercentage: number, [start, end]: YearRange) => {
    start = toInt(start)
    end = toInt(end)

    const { get, data, error, ...rest } = useHttpFetch<GetProjectionsResponseData>()

    const getProjections = (initialSavings: string, monthlyDeposit: string) => {
        const searchParamsUrl = new URLSearchParams({
            initial_savings: initialSavings,
            monthly_deposit: monthlyDeposit,
            start_year: start.toString(),
            end_year: end.toString(),
        }).toString()

        return get(`/getProjections?${searchParamsUrl}`)
    }

    const projections = new Array(end - start + 1).fill(null).map((_, year) => {
        const value = data?.projections?.[interestRatePercentage]?.[year]

        if (error || value === undefined) {
            return 0
        }

        return value
    })

    return { getProjections, projections, error, ...rest }
}
