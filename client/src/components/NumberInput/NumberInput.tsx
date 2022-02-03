import React from 'react'
import {
    NumberInput as ChakraNumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    NumberInputProps,
} from '@chakra-ui/react'
import theme from '../../theme'

const NumberInput = (props: NumberInputProps) => (
    <ChakraNumberInput errorBorderColor={theme.colors.danger} {...props}>
        <NumberInputField />
        <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
        </NumberInputStepper>
    </ChakraNumberInput>
)

export default NumberInput
