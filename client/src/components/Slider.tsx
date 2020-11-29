import React from 'react'
import {
    Slider as ChakraSlider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderProps,
    Text,
    Box,
} from '@chakra-ui/react'

type Props = SliderProps & {
    label?: string
}

const Slider = ({ label, ...rest }: Props) => (
    <Box width="100%">
        {!!label && <Text align="left">{label}</Text>}
        <ChakraSlider {...rest} colorScheme="primary">
            <SliderTrack>
                <SliderFilledTrack bg="primary" />
            </SliderTrack>
            <SliderThumb />
        </ChakraSlider>
    </Box>
)

export default Slider
