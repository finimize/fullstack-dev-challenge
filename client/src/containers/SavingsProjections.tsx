import React, { useEffect, useState } from 'react'

import { Container, Flex, Heading, VStack } from '@chakra-ui/react'

import SliderWithOverride from '../components/SliderWithOverride'
import LineChart from '../components/LineChart'
import DefaultLayout from '../components/layouts/Default'
import { fetchData, createQueryString } from '../lib'

/*
<Input
                        label="Initial Savings amount"
                        name="initialSavings"
                        placeholder="5000"
                        value={formInput.initialSavings}
                        onChange={handleChange}
                    />
                    <Input
                        label="Monthly Deposit"
                        name="monthlyDeposit"
                        placeholder="100"
                        value={formInput.monthlyDeposit}
                        onChange={handleChange}
                    />
                    
                    */

const SavingsProjections = () => {
    const [data, setData] = useState<{ xAxis: number[]; yAxis: number[] }>({
        xAxis: [],
        yAxis: [],
    })
    const [formInput, setFormInput] = useState({
        initialSavings: 5000,
        monthlyDeposit: 100,
        interestRate: 2,
    })
    const getProjectionsData = async (): Promise<void> => {
        const queryString = createQueryString(formInput)
        const projections = await fetchData(`/v1/projections?${queryString}`)
        // @ts-ignore:next-line
        setData({ xAxis: [...Array(projections.length).keys()], yAxis: projections })
    }

    useEffect(() => {
        // fetch new data when formInput changes
        getProjectionsData()
    }, [formInput])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Handle change of text input
        setFormInput({
            ...formInput,
            [event.target.name]: parseInt(event.target.value) || 0,
        })
    }
    return (
        <DefaultLayout>
            <Flex
                flexWrap="wrap"
                flexDir="row"
                justifyContent="space-around"
                alignItems="center"
                width="100%"
                maxW="1400px"
                marginX="auto"
                marginY="auto"
            >
                <VStack spacing={4} mx="30px" my="50px">
                    <Heading as="h1" paddingBottom="20px" color="#094067">
                        Interest Rate Calculator
                    </Heading>
                    <SliderWithOverride
                        value={formInput.interestRate * 100}
                        label={
                            'Monthly Interest Rate    ' + formInput.interestRate.toString() + '%'
                        }
                        name="interestRate"
                        min={0}
                        max={100}
                        onChange={(value) => {
                            setFormInput({ ...formInput, interestRate: value / 100 })
                        }}
                    />
                </VStack>
                <Container w="100%" maxW="900px" mx="20px">
                    <LineChart
                        title="Savings Over time"
                        xAxisData={data.xAxis}
                        yAxisData={data.yAxis}
                        xLabel="Years"
                        yLabel="Amount"
                    />
                </Container>
            </Flex>
        </DefaultLayout>
    )
}

export default SavingsProjections
