import React, { useEffect, useState } from 'react'
import { Flex, Heading, VStack } from '@chakra-ui/react'
import debounce from 'lodash/debounce'

import LineChart from '../components/LineChart'
import DefaultLayout from '../components/layouts/Default'
import SavingsSelectors from '../components/SavingsSelectors'
import SavingsResults from '../components/SavingsResults'
import {
    fetchData,
    createQueryString,
    appendYearsQuery,
    extractYearlyData,
    SAVINGS_DEFAULTS,
} from '../lib'
import type { ISavingsInputs } from '../lib'

const SavingsProjections = () => {
    const [data, setData] = useState<{ xAxis: number[]; yAxis: number[] }>({
        xAxis: [],
        yAxis: [],
    })
    const [savingsInputs, setSavingsInputs] = useState({
        initialSavings: SAVINGS_DEFAULTS.INITIAL_DEFAULT,
        monthlyDeposit: SAVINGS_DEFAULTS.MONTHLY_DEFAULT,
        interestRate: SAVINGS_DEFAULTS.INTEREST_DEFAULT,
    })
    const [savingsTotals, setSavingsTotals] = useState({
        totalSaved: 0,
        totalInvested: 0,
        interestEarned: 0,
    })

    const getProjectionsData = async (values?: ISavingsInputs): Promise<void> => {
        const savingsValues = values || savingsInputs
        const queryString = appendYearsQuery(createQueryString(savingsValues))
        try {
            const data = await fetchData(`/v1/projections?${queryString}`)
            const { savings, totalInvested, interestEarned } = data
            const yearlyProjections = extractYearlyData(savings)
            setData({ xAxis: [...yearlyProjections.keys()], yAxis: yearlyProjections })
            setSavingsTotals({
                totalSaved: savings[savings.length - 1],
                totalInvested,
                interestEarned,
            })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getProjectionsData()
    }, [])

    const [stateDebounceGetProjectionsData] = useState(() => debounce(getProjectionsData, 300))

    const handleChangeUsingStateDebounce =
        (savingsInput: string) => (newValue: number | string) => {
            // We don't want to fetch data if the user is still typing after using a decimal point e.g. "1."
            if (newValue !== 'string' || !newValue.endsWith('.')) {
                setSavingsInputs({ ...savingsInputs, [savingsInput]: newValue })
                stateDebounceGetProjectionsData({ ...savingsInputs, [savingsInput]: newValue })
            }
        }

    return (
        <DefaultLayout>
            <Flex
                flexWrap="wrap"
                justifyContent="space-evenly"
                width="100%"
                my={20}
                marginX="auto"
                marginY="auto"
            >
                <Flex flexGrow={2}>
                    <VStack spacing={4} ml={20}>
                        <Heading as="h1" variant="h1" paddingBottom="20px">
                            Compound interest projections
                        </Heading>
                        <SavingsSelectors
                            savingsInputs={savingsInputs}
                            handleChange={handleChangeUsingStateDebounce}
                        />
                        <SavingsResults savingsTotals={savingsTotals} />
                    </VStack>
                </Flex>
                <Flex flexGrow={3} minW={500}>
                    <LineChart
                        title="Savings Over time"
                        xAxisData={data.xAxis}
                        yAxisData={data.yAxis}
                        xLabel="Years"
                        yLabel="Amount [£]"
                    />
                </Flex>
            </Flex>
        </DefaultLayout>
    )
}

export default SavingsProjections
