/* eslint-disable no-console */
import React, { FC, useEffect } from 'react'
import './App.css'
import { ChakraProvider, extendTheme, Container } from '@chakra-ui/react'
import { AppProvider } from './store'
import { DefaultLayout } from './components/layouts/Default'
import { LineChart } from './components/LineChart'
import { Details } from './components/Details'
import { theme } from './theme'

const defaultTheme = extendTheme(theme)

// Note: This is just for example purposes
// should be replaced with real data from the server
const tempData = {
    xAxis: [0, 1, 2, 3, 4, 7],
    yAxis: [100, 150, 180, 210, 240, 350],
}

export const App: FC = () => {
    // const initialState = {
    //     currentPage: 1,

    // }
    // const [pageDetails, setPageDetails] = useState({
    //     currentPage: 1,

    // })

    const postCalculation = async () => {
        const response = await fetch('http://localhost:3001/api', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                initialSavings: 500,
                interestRate: 0.2,
                compoundingFrequency: 4,
                monthlyContributions: 100,
            }),
        })
        return response.json()
    }

    useEffect(() => {
        postCalculation()
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
    }, [])
    return (
        <AppProvider>
            <ChakraProvider theme={defaultTheme}>
                <DefaultLayout>
                    <Details />
                    {/* <Card> */}
                    {/* <Input label="First Name" error="hello"/>
                    <Container pt={6}>
                        <LineChart
                            title='Savings Over time'
                            xAxisData={tempData.xAxis}
                            yAxisData={tempData.yAxis}
                            xLabel='Years'
                            yLabel='Amount'
                        />
                    </Container> */}
                    {/* </Card> */}
                </DefaultLayout>
            </ChakraProvider>
        </AppProvider>
    )
}
