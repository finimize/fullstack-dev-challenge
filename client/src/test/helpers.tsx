import React from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import theme from '../theme'
import LineChart from '../components/LineChart'

const defaultTheme = extendTheme(theme)

export const renderForTest = (component: JSX.Element) =>
    render(<ChakraProvider theme={defaultTheme}>{component}</ChakraProvider>)

export const mockLineChart = () => {
    const LineChartMock = LineChart as jest.Mock
    LineChartMock.mockImplementation(() => null)

    const getLastLineChartProps = () => {
        return LineChartMock.mock.calls[LineChartMock.mock.calls.length - 1][0]
    }

    const initialLineChartProps: Parameters<typeof LineChart>[0] = {
        title: 'Savings Over Time',
        xAxisData: [],
        yAxisData: [],
        xLabel: 'Years',
        yLabel: 'Amount [£]',
    }

    return { getLastLineChartProps, initialLineChartProps }
}
