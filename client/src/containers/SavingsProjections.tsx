import React, { useEffect, useState } from 'react'
import { Container, Flex, Heading, VStack } from '@chakra-ui/react'
import debounce from 'lodash/debounce'

import SliderWithOverride from '../components/SliderWithOverride'
import LineChart from '../components/LineChart'
import DefaultLayout from '../components/layouts/Default'
import { fetchData, createQueryString } from '../lib'

const SavingsProjections = () => {
    const [data, setData] = useState<{ xAxis: number[]; yAxis: number[] }>({
        xAxis: [],
        yAxis: [],
    })
    const [formInputs, setFormInputs] = useState({
        initialSavings: 5000,
        monthlyDeposit: 100,
        interestRate: 2.0,
    })
    // @ts-ignore:next-line
    const getProjectionsData = async (values): Promise<void> => {
        const queryString = createQueryString(values)
        try {
            const projections = await fetchData(`/v1/projections?${queryString}`)
            // @ts-ignore:next-line
            setData({ xAxis: [...Array(projections.length).keys()], yAxis: projections })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        // We don't want to fetch data if the user is still typing the rate e.g. "1."
        // @ts-ignore:next-line
        if (typeof formInputs.interestRate !== 'string' || !formInputs.interestRate.endsWith('.')) {
            getProjectionsData(formInputs)
        }
    }, [])

    const [stateDebounceGetProjectionsData] = useState(() =>
        debounce(getProjectionsData, 300, {
            leading: false,
            trailing: true,
        })
    )
    // @ts-ignore:next-line
    const handleChangeUsingStateDebounce = (formInput) => (newValue) => {
        setFormInputs({ ...formInputs, [formInput]: newValue })
        // @ts-ignore:next-line
        stateDebounceGetProjectionsData({ ...formInputs, [formInput]: newValue })
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
                        value={formInputs.initialSavings}
                        label={`Initial savings £${formInputs.initialSavings}`}
                        name="initialSavings"
                        min={0}
                        max={200000}
                        step={1000}
                        onChange={handleChangeUsingStateDebounce('initialSavings')}
                    />
                    <SliderWithOverride
                        value={formInputs.monthlyDeposit}
                        label={`Monthly deposit £${formInputs.monthlyDeposit}`}
                        name="monthlyDeposit"
                        min={0}
                        max={1000}
                        step={10}
                        onChange={handleChangeUsingStateDebounce('monthlyDeposit')}
                    />
                    <SliderWithOverride
                        value={formInputs.interestRate}
                        label={`Monthly Interest Rate ${formInputs.interestRate}%`}
                        name="interestRate"
                        min={0.0}
                        max={20.0}
                        step={0.1}
                        onChange={handleChangeUsingStateDebounce('interestRate')}
                    />
                </VStack>
                <Container w="100%" maxW="900px" mx="20px">
                    <LineChart
                        title="Savings Over time"
                        xAxisData={data.xAxis}
                        yAxisData={data.yAxis}
                        xLabel="Months"
                        yLabel="Amount"
                    />
                </Container>
            </Flex>
        </DefaultLayout>
    )
}

export default SavingsProjections
