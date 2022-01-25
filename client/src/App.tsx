import React, { useState, useEffect } from 'react'
import './App.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import { Input } from './components/Input'
import DefaultLayout from './components/layouts/Default'
import LineChart from './components/LineChart'
import theme from './theme'

const defaultTheme = extendTheme(theme)

const initialData = {
    year: [],
    amount: [],
}

const App = () => {
    const [initialValue, setInitialValue] = useState('1000')
    const [monthlyDeposit, setMonthlyDeposit] = useState('100')
    const [interestRate, setInterestRate] = useState('3')
    const [data, setData] = useState(initialData)

    useEffect(() => {
        fetch(
            `http://localhost:3001/calculation?initial=${initialValue}&monthlyDeposit=${monthlyDeposit}&interestRate=${interestRate}`
        )
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson.data)
            })
    }, [initialValue, monthlyDeposit, interestRate])

    return (
        <ChakraProvider theme={defaultTheme}>
            <DefaultLayout>
                <Container pt={6}>
                    <Input
                        title="How much are you starting with?"
                        defaultValue={initialValue}
                        onChange={(val) => setInitialValue(val)}
                        testId="initialValueInput"
                    />
                    <Input
                        title="How much can you put aside monthly?"
                        defaultValue={monthlyDeposit}
                        onChange={(val) => setMonthlyDeposit(val)}
                        testId="monthlyDepositInput"
                    />
                    <Input
                        title="What percentage interest rate can you get?"
                        defaultValue={interestRate}
                        onChange={(val) => setInterestRate(val)}
                        testId="interestRateInput"
                    />
                    <LineChart
                        title="Savings Over time"
                        xAxisData={data.year}
                        yAxisData={data.amount}
                        xLabel="Years"
                        yLabel="Amount"
                    />
                </Container>
            </DefaultLayout>
        </ChakraProvider>
    )
}

export default App
