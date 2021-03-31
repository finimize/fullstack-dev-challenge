import React, { FC, useContext, useEffect, useState } from 'react'
import { Box, Text, Grid } from '@chakra-ui/react'
import { AppContext } from '../../store'
import { UPDATE_CALCULATIONS, UPDATE_DATA } from '../../store/types'
import { Card } from '../Card'
import { Input } from '../Input'
import { InterestRateSlider } from '../InterestRateSlider'
import { PageControls } from '../PageControls'

// type DetailsProps = {
//     // children: React.ReactNode
// }

export const Savings: FC = () => {
    const { state, dispatch } = useContext(AppContext)
    const { calculations } = state
    // const [sliderInterestRate, setSliderInterestRate] = useState(calculations.interestRate)

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
            1,
            Number(calculations.monthlyContributions.value),
        )
            .then((data: number[]) =>
                dispatch({
                    type: UPDATE_DATA,
                    payload: data,
                }),
            )
            .catch((err) => console.log(err))
    }, [
        calculations.interestRate,
        calculations.initialSavings.value,
        calculations.monthlyContributions.value,
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
                <Grid gridTemplateColumns={{ base: '1fr', md: 'repeat(2,350px)' }}>
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
                    <InterestRateSlider />
                </Grid>
            </Card>
            <PageControls prevPage={() => null} nextPage={() => null} />
        </Box>
    )
}
