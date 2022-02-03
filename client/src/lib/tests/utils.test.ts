import {
    createQueryString,
    appendYearsQuery,
    extractYearlyData,
    getTooltipTitle,
    getTooltipLabel,
} from '../utils'

describe('utility functions testing suite', () => {
    describe('createQueryString', () => {
        // Test cases for generating a query string
        const cases = [
            [
                { initialSavings: 10000, monthlyDeposit: 100, interestRate: 2 },
                'initialSavings=10000&monthlyDeposit=100&interestRate=2',
                { test: 'hello', test2: 'goodbye' },
                'test=hello&test2=goodbye',
                { test: 'encod ing', test2: 'sdrvkmfvkm43gsd23' },
                'test=encod%20ing&test2=sdrvkmfvkm43gsd23',
            ],
        ]

        test.each(cases)('with query string returns expected result', (queries, expectedResult) => {
            // @ts-ignore
            const result = createQueryString(queries)
            expect(result).toEqual(expectedResult)
        })
    })

    describe('appendYearsQuery', () => {
        it('adds years to the query string', () => {
            const queryString = 'initialSavings=10000&monthlyDeposit=100&interestRate=2'
            const expectedResult = 'initialSavings=10000&monthlyDeposit=100&interestRate=2&years=50'

            expect(appendYearsQuery(queryString)).toBe(expectedResult)
        })
    })

    describe('extractYearlyData', () => {
        it('takes an array of monthly data and extracts the first and then every 12th element', () => {
            const threeYearMonthlyData = [
                10, 3, 56, 67, 34, 56, 23, 4, 55, 97, 64, 43, 12, 34, 65, 75, 62, 3, 45, 67, 98, 23,
                55, 76, 1, 32, 54, 34, 77, 45, 23, 65, 5, 34, 4, 23,
            ]
            const expectedResult = [10, 12, 1]

            expect(extractYearlyData(threeYearMonthlyData)).toEqual(expectedResult)
        })
    })

    describe('getTooltipTitle', () => {
        it('takes an array of tooltip items and returns expected title', () => {
            const tooltipItems = [
                { label: '1', value: '23' },
                { label: '2', value: '26' },
                { label: '3', value: '30' },
            ]
            const expectedResult = 'Year 1'

            expect(getTooltipTitle(tooltipItems)).toBe(expectedResult)
        })
    })

    describe('getTooltipLabel', () => {
        it('takes a tooltip item with value and returns expected label', () => {
            const tooltipItem = { label: '1', value: '23000' }
            const expectedResult = '£23,000.00'

            expect(getTooltipLabel(tooltipItem)).toBe(expectedResult)
        })

        it('takes a tooltip item without a value and returns 0', () => {
            const tooltipItem = { label: '1' }
            const expectedResult = '£0.00'

            expect(getTooltipLabel(tooltipItem)).toBe(expectedResult)
        })
    })
})
