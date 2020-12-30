import React from 'react'
import useHttpFetch from 'use-http'
import { render, fireEvent, screen } from '@testing-library/react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import LineChart from '../../components/LineChart'
import theme from '../../theme'
import { GetProjectionsResponseData } from '../../api'

import { Savings, INITIAL_FORM_VALUES } from './Savings'

const defaultTheme = extendTheme(theme)

jest.mock('../../components/LineChart')
jest.mock('use-http')

describe('<Savings /> component', () => {
    const setupUseHttpFetchMock = (resultOverride?: Partial<ReturnType<typeof useHttpFetch>>) => {
        const useHttpFetchMock = useHttpFetch as jest.Mock
        const mockGet = jest.fn()

        useHttpFetchMock.mockImplementation(() => ({
            get: mockGet,
            loading: false,
            data: undefined,
            error: undefined,
            ...resultOverride,
        }))

        return { mockGet }
    }

    const setupLineChartMock = () => {
        const LineChartMock = LineChart as jest.Mock
        LineChartMock.mockImplementation(() => null)

        const getLastLineChartProps = () => {
            return LineChartMock.mock.calls[LineChartMock.mock.calls.length - 1][0]
        }

        const initialLineChartProps: Parameters<typeof LineChart>[0] = {
            title: 'Savings Over Time',
            xAxisData: new Array(51).fill(null).map((_, idx) => idx),
            yAxisData: new Array(51).fill(100),
            xLabel: 'Years',
            yLabel: 'Amount [£]',
            loading: false,
            error: false,
        }

        return { getLastLineChartProps, initialLineChartProps }
    }

    const getMockProjections = () => {
        const projections: Exclude<GetProjectionsResponseData['projections'], undefined> = {}

        for (let interest = 0; interest <= 16; interest++) {
            const projectionsForYear: typeof projections[number] = (projections[interest] = {})
            for (let year = 0; year <= 50; year++) {
                projectionsForYear[year] = 100
            }
        }
        return projections
    }

    const getInitialSavingsInput = () =>
        screen.getByTestId('initial-savings-input-wrapper').querySelector('input')!

    beforeEach(() => {
        jest.restoreAllMocks()
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.runOnlyPendingTimers()
        jest.useRealTimers()
    })

    it('makes debounced requests as expected', () => {
        const { mockGet } = setupUseHttpFetchMock()
        setupLineChartMock()

        render(
            <ChakraProvider theme={defaultTheme}>
                <Savings />
            </ChakraProvider>
        )

        expect(getInitialSavingsInput().value).toBe(INITIAL_FORM_VALUES.initialSavingsAmount)

        expect(mockGet).toHaveBeenCalledTimes(1)

        // trigger multiple changes in a row
        fireEvent.change(getInitialSavingsInput(), {
            target: { value: '52000' },
        })

        fireEvent.change(getInitialSavingsInput(), {
            target: { value: '54000' },
        })

        fireEvent.change(getInitialSavingsInput(), {
            target: { value: '56000' },
        })

        jest.runAllTimers()

        expect(mockGet).toHaveBeenCalledTimes(2)
    })

    it('does not make invalid requests when form values are invalid', () => {
        const { mockGet } = setupUseHttpFetchMock()
        setupLineChartMock()

        render(
            <ChakraProvider theme={defaultTheme}>
                <Savings />
            </ChakraProvider>
        )

        expect(getInitialSavingsInput().value).toBe(INITIAL_FORM_VALUES.initialSavingsAmount)

        expect(mockGet).toHaveBeenCalledTimes(1)

        fireEvent.change(getInitialSavingsInput(), {
            target: { value: '-52000' },
        })

        jest.runAllTimers()

        expect(mockGet).toHaveBeenCalledTimes(1)
    })

    it('handles failed requests as expected', () => {
        setupUseHttpFetchMock({ data: { projections: getMockProjections() } })
        const { getLastLineChartProps, initialLineChartProps } = setupLineChartMock()

        render(
            <ChakraProvider theme={defaultTheme}>
                <Savings />
            </ChakraProvider>
        )

        expect(getLastLineChartProps()).toEqual(initialLineChartProps)

        setupUseHttpFetchMock({ data: undefined, error: new TypeError('failed to fetch') })

        // trigger a new request
        fireEvent.change(getInitialSavingsInput(), {
            target: { value: '52000' },
        })

        jest.runAllTimers()

        expect(getLastLineChartProps()).toEqual({
            ...initialLineChartProps,
            yAxisData: new Array(51).fill(0),
            error: true,
        })
    })
})
