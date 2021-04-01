import React, { FC, useContext, useEffect, useMemo } from 'react'
import { Box, Text, Grid } from '@chakra-ui/react'
import { AppContext } from '../../store'
import { UPDATE_CALCULATIONS, UPDATE_DATA, PREVIOUS_PAGE } from '../../store/types'
import { DataValueInterface } from '../../store/store.interface'
import { Card } from '../Card'
import { Input } from '../Input'
import { LineChart } from '../LineChart'
import { InterestRateSlider } from '../InterestRateSlider'
import { PageControls } from '../PageControls'
import { CompoundFrequencyRadio } from '../CompoundFrequencyRadio'
import { postCalculation } from '../../api'

export const Savings: FC = () => {
    const { state, dispatch } = useContext(AppContext)
    const { calculations } = state

    const monthsAxes = useMemo(() => Array.from({ length: 601 }, (_, i) => i / 12), [])

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

    const prevPage = () => dispatch({ type: PREVIOUS_PAGE })

    return (
        <Box>
            <Card>
                <Text
                    fontSize='sm'
                    marginBottom='4'
                    color='blueHeader'
                    fontWeight='700'
                    textAlign='center'
                >
                    Saving controls
                </Text>
                <Text fontSize='xs' marginBottom='4' color='grey5' textAlign='center'>
                    Simply change the values below to see your results
                </Text>
                <Box display='flex' justifyContent='center'>
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
                </Box>
            </Card>
            <Card>
                <Text
                    fontSize='sm'
                    marginBottom='4'
                    color='blueHeader'
                    fontWeight='700'
                    textAlign='center'
                >
                    Overview
                </Text>
                <LineChart
                    title='Savings Over time'
                    xAxisData={monthsAxes}
                    yAxisData={state.data.value?.yearlySavings || []}
                    xLabel='Months'
                    yLabel='Amount'
                />
            </Card>
            <PageControls prevPage={prevPage} nextPage={() => null} />
        </Box>
    )
}
