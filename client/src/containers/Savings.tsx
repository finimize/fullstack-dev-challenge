import React from 'react'
import { Container, Heading, VStack } from '@chakra-ui/react'
import Input from '../components/Input'
import Slider from '../components/Slider'
import LineChart from '../components/LineChart'
import DefaultLayout from '../components/layouts/Default'

// Note: This is just for example purposes
// should be replaced with real data from the server
const tempData = {
    xAxis: [0, 1, 2, 3, 4, 5],
    yAxis: [100, 150, 180, 210, 240, 350],
}

const Savings = () => (
    <DefaultLayout>
        <Container pt={6}>
            <VStack spacing={4}>
                <Heading as="h1">Interest Rate Calculator</Heading>
                <Input label="Initial Savings amount" name="Initial Savings" placeholder="5000" />
                <Input label="Monthly Deposit" name="Monthly Deposit" placeholder="100" />
                <Slider
                    label="Interest Rate"
                    name="Interest Rate"
                    defaultValue={2}
                    min={0}
                    max={15}
                />
                <LineChart
                    title="Savings Over time"
                    xAxisData={tempData.xAxis}
                    yAxisData={tempData.yAxis}
                    xLabel="Years"
                    yLabel="Amount"
                />
            </VStack>
        </Container>
    </DefaultLayout>
)

export default Savings
