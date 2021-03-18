import React, { FC } from 'react'
import './App.css'
import { ChakraProvider, extendTheme, Container } from '@chakra-ui/react'
import { DefaultLayout } from './components/layouts/Default'
import { LineChart } from './components/LineChart'
import { theme } from './theme'

const defaultTheme = extendTheme(theme)

// Note: This is just for example purposes
// should be replaced with real data from the server
const tempData = {
    xAxis: [0, 1, 2, 3, 4, 7],
    yAxis: [100, 150, 180, 210, 240, 350],
}

export const App: FC = () => (
    <ChakraProvider theme={defaultTheme}>
        <DefaultLayout>
            <Container pt={6}>
                <LineChart
                    title='Savings Over time'
                    xAxisData={tempData.xAxis}
                    yAxisData={tempData.yAxis}
                    xLabel='Years'
                    yLabel='Amount'
                />
            </Container>
        </DefaultLayout>
    </ChakraProvider>
)
