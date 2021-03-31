import React, { FC, useContext } from 'react'
import {
    Box,
    Text,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    FormLabel,
} from '@chakra-ui/react'
import { AppContext } from '../../store'
import { UPDATE_INTEREST } from '../../store/types'

export const InterestRateSlider: FC = () => {
    const { state, dispatch } = useContext(AppContext)
    const { calculations } = state

    return (
        <Box padding='2' maxWidth='72' marginBottom='2' marginRight='4'>
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
                    focusThumbOnChange={false}
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
            <Text fontSize='xs' color='grey5' fontWeight='700'>
                Current interest rate: {state.calculations.interestRate}%
            </Text>
        </Box>
    )
}
