import React, { FC, useContext } from 'react'
import { Box, Text, Grid } from '@chakra-ui/react'
import { AppContext } from '../../store'
import { UPDATE_CALCULATIONS } from '../../store/types'
import { Card } from '../Card'
import { Input } from '../Input'
import { InterestRateSlider } from '../InterestRateSlider'
import { CompoundFrequencyRadio } from '../CompoundFrequencyRadio'

export const SavingsControls: FC = () => {
    const { state, dispatch } = useContext(AppContext)
    const { calculatorMode } = state
    const isSimpleMode = calculatorMode === 'Simple'

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
                    padding='4'
                    gridTemplateColumns={{
                        base: '1fr',
                        md: isSimpleMode ? '1fr' : 'repeat(2,350px)',
                    }}
                    backgroundColor='blue200'
                    borderRadius='8px'
                >
                    <InterestRateSlider />
                    {!isSimpleMode && <CompoundFrequencyRadio />}
                    <Input
                        label='Initial Deposit'
                        isNumberInput
                        value={state.calculations.initialSavings.value}
                        error={state.calculations.initialSavings.error}
                        onChangeNumber={(e) => handleChange(e, 'initialSavings')}
                    />
                    {!isSimpleMode && (
                        <Input
                            label='Monthly Contributions'
                            isNumberInput
                            value={state.calculations.monthlyContributions.value}
                            error={state.calculations.monthlyContributions.error}
                            onChangeNumber={(e) => handleChange(e, 'monthlyContributions')}
                        />
                    )}
                </Grid>
            </Box>
        </Card>
    )
}
