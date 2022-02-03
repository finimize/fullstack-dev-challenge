import React, { useEffect, useState } from 'react'
import { Flex, Heading, VStack, useToast } from '@chakra-ui/react'
import debounce from 'lodash/debounce'

import LineChart from '../../components/LineChart'
import DefaultLayout from '../../components/layouts/Default'
import SavingsSelectors from '../../components/SavingsSelectors'
import SavingsResults from '../../components/SavingsResults'
import {
    fetchData,
    createQueryString,
    appendYearsQuery,
    extractYearlyData,
    SAVINGS_DEFAULTS,
} from '../../lib'
import type { ISavingsInputs, ISavingsResults } from '../../lib'

const SavingsProjections = () => {
    const [projections, setProjections] = useState<number[]>([])
    const [savingsInputs, setSavingsInputs] = useState<ISavingsInputs>({
        initialSavings: SAVINGS_DEFAULTS.INITIAL_DEFAULT,
        monthlyDeposit: SAVINGS_DEFAULTS.MONTHLY_DEFAULT,
        interestRate: SAVINGS_DEFAULTS.INTEREST_DEFAULT,
    })
    const [savingsTotals, setSavingsTotals] = useState<ISavingsResults>({
        totalSaved: 0,
        totalInvested: 0,
        interestEarned: 0,
    })

    const toast = useToast()
    const getProjectionsData = async (values?: ISavingsInputs): Promise<void> => {
        const savingsValues = values || savingsInputs
        const queryString = appendYearsQuery(createQueryString(savingsValues))
        try {
            const data = await fetchData(`/v1/projections?${queryString}`)
            const { savings, totalInvested, interestEarned } = data
            const yearlyProjections = extractYearlyData(savings)
            setProjections(yearlyProjections)
            setSavingsTotals({
                totalSaved: savings[savings.length - 1],
                totalInvested,
                interestEarned,
            })
        } catch (err) {
            toast({
                title: 'Error',
                description:
                    'Sorry, an error occured retrieving projection data. Please try again later.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }

    useEffect(() => {
        getProjectionsData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [stateDebounceGetProjectionsData] = useState(() => debounce(getProjectionsData, 300))

    const handleChangeUsingStateDebounce =
        (savingsInput: string) => (newValue: number | string) => {
            // We don't want to fetch data if the user is still typing after using a decimal point e.g. "1."
            if (typeof newValue !== 'string' || !newValue.endsWith('.')) {
                setSavingsInputs({ ...savingsInputs, [savingsInput]: newValue })
                stateDebounceGetProjectionsData({ ...savingsInputs, [savingsInput]: newValue })
            }
        }
    const xAxisData = [...projections.keys()]
    const yAxisData = projections

    return (
        <DefaultLayout>
            <Flex
                flexWrap="wrap"
                flexDirection={['column', null, null, 'row']}
                justifyContent={['center', null, null, 'space-evenly']}
                width="100%"
                my={20}
                marginX="auto"
                marginY="auto"
            >
                <Flex flex={1} m={10} justifyContent="center">
                    <VStack spacing={4}>
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
                <Flex flex={2} m={10} justifyContent="center">
                    <LineChart
                        title="Savings over time"
                        xAxisData={xAxisData}
                        yAxisData={yAxisData}
                        xLabel="Years"
                        yLabel="Amount [£]"
                    />
                </Flex>
            </Flex>
        </DefaultLayout>
    )
}

export default SavingsProjections
