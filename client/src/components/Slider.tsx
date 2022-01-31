import React from 'react'
import {
    Slider as ChakraSlider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderProps,
} from '@chakra-ui/react'

const Slider = (props: SliderProps) => (
    <ChakraSlider {...props} colorScheme="primary">
        <SliderTrack>
            <SliderFilledTrack bg="primary" />
        </SliderTrack>
        <SliderThumb />
    </ChakraSlider>
)

export default Slider
