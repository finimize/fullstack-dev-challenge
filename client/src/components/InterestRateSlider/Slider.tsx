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
        <Box padding='2' marginBottom='2' marginRight='4'>
            <FormLabel fontSize='sm' marginBottom='2' color='text' fontWeight='500'>
                Interest Rate
            </FormLabel>
            <Box
                backgroundColor='grey3'
                borderRadius='8px'
                padding='2'
                display='flex'
                alignItems='center'
            >
                <Text fontSize='xs' color='text'>
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
                <Text fontSize='xs' color='text'>
                    50%
                </Text>
            </Box>
            <Text fontSize='xs' color='blue700' marginTop='2'>
                Current interest rate: <b>{state.calculations.interestRate}%</b>
            </Text>
        </Box>
    )
}
