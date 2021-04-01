import React, { FC, useContext, useEffect, useMemo } from 'react'
import { Box, Text, Grid } from '@chakra-ui/react'
import { AppContext } from '../../store'
import { UPDATE_CALCULATIONS, UPDATE_DATA } from '../../store/types'
import { DataValueInterface } from '../../store/store.interface'
import { Card } from '../Card'
import { Input } from '../Input'
import { LineChart } from '../LineChart'
import { InterestRateSlider } from '../InterestRateSlider'
import { PageControls } from '../PageControls'
import { CompoundFrequencyRadio } from '../CompoundFrequencyRadio'

export const Savings: FC = () => {
    const { state, dispatch } = useContext(AppContext)
    const { calculations } = state

    const monthsAxes = useMemo(() => Array.from({ length: 601 }, (_, i) => i / 12), [])

    const postCalculation = async (
        initialSavings: number,
        interestRate: number,
        compoundingFrequency: number,
        monthlyContributions: number,
    ) => {
        const response = await fetch('http://localhost:3001/api', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                initialSavings,
                interestRate,
                compoundingFrequency,
                monthlyContributions,
            }),
        })
        return response.json()
    }

    useEffect(() => {
        postCalculation(
            Number(calculations.initialSavings.value),
            Number(calculations.interestRate),
            calculations.compoundingFrequency,
            Number(calculations.monthlyContributions.value),
        )
            .then((data: DataValueInterface) =>
                dispatch({
                    type: UPDATE_DATA,
                    payload: {
                        value: { ...data },
                        error: '',
                        isLoading: false,
                    },
                }),
            )
            .catch((err) =>
                dispatch({
                    type: UPDATE_DATA,
                    payload: {
                        value: null,
                        error: String(err),
                        isLoading: false,
                    },
                }),
            )
    }, [
        calculations.interestRate,
        calculations.initialSavings.value,
        calculations.monthlyContributions.value,
        calculations.compoundingFrequency,
    ])

    const handleChange = (e: string, field: 'initialSavings' | 'monthlyContributions') => {
        const validateNonEmpty = (str: string): string =>
            str.length === 0 || !str.trim() ? 'Please enter a valid Number value' : ''
        const error = validateNonEmpty(e)
        return dispatch({
            type: UPDATE_CALCULATIONS,
            field,
            payload: {
                value: e,
                error,
            },
        })
    }
    return (
        <Box>
            <Card>
                <Text fontSize='sm' marginBottom='4' color='blueHeader' fontWeight='700'>
                    Savings Summary
                </Text>
                <Text fontSize='xs' marginBottom='4' color='grey5'>
                    Simply change the values below to see your results
                </Text>
                <Grid
                    width='fit-content'
                    padding='2'
                    gridTemplateColumns={{ base: '1fr', md: 'repeat(2,350px)' }}
                    backgroundColor='blue200'
                    borderRadius='8px'
                >
                    <InterestRateSlider />
                    <CompoundFrequencyRadio />
                    <Input
                        label='Initial Deposit'
                        isNumberInput
                        value={state.calculations.initialSavings.value}
                        error={state.calculations.initialSavings.error}
                        onChangeNumber={(e) => handleChange(e, 'initialSavings')}
                    />
                    <Input
                        label='Monthly Contributions'
                        isNumberInput
                        value={state.calculations.monthlyContributions.value}
                        error={state.calculations.monthlyContributions.error}
                        onChangeNumber={(e) => handleChange(e, 'monthlyContributions')}
                    />
                </Grid>
            </Card>
            <Card>
                <LineChart
                    title='Savings Over time'
                    xAxisData={monthsAxes}
                    yAxisData={state.data.value?.yearlySavings || []}
                    xLabel='Months'
                    yLabel='Amount'
                />
            </Card>
            <PageControls prevPage={() => null} nextPage={() => null} />
        </Box>
    )
}
