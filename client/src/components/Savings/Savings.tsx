import React, { FC, useContext, useEffect, useState } from 'react'
import {
    Box,
    Text,
    Grid,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    FormLabel,
} from '@chakra-ui/react'
import { AppContext } from '../../store'
import { UPDATE_CALCULATIONS, UPDATE_INTEREST } from '../../store/types'
import { Card } from '../Card'
import { Input } from '../Input'
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
            0.1,
            1,
            Number(calculations.monthlyContributions.value),
        )
            .then((data) => console.log(calculations))
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
        console.log(e)
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
                <Grid gridTemplateColumns={{ base: '1fr', md: 'repeat(2,1fr)' }}>
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
                    <Box padding='2' maxWidth='96' marginBottom='2'>
                        <FormLabel fontSize='sm' marginBottom='2' color='grey5' fontWeight='500'>
                            Interest Rate
                        </FormLabel>
                        <Box display='flex' alignItems='center'>
                            <Text fontSize='xs' color='grey5'>
                                0%
                            </Text>
                            <Slider
                                defaultValue={0}
                                value={calculations.interestRate}
                                min={0}
                                max={50}
                                step={5}
                                margin={4}
                                // onChange={setSliderInterestRate}
                                onChange={(e) =>
                                    dispatch({
                                        type: UPDATE_INTEREST,
                                        payload: Number(e),
                                    })
                                }
                            >
                                <SliderTrack bg='red.100'>
                                    <Box position='relative' right={10} />
                                    <SliderFilledTrack bg='tomato' />
                                </SliderTrack>
                                <SliderThumb boxSize={6} />
                            </Slider>
                            <Text fontSize='xs' color='grey5'>
                                50%
                            </Text>
                        </Box>
                    </Box>
                </Grid>
            </Card>
            <PageControls prevPage={() => null} nextPage={() => null} />
        </Box>
    )
}
