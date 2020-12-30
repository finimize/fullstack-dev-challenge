import React from 'react'
import {
    NumberInput as ChakraNumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Text,
    Box,
    NumberInputProps,
} from '@chakra-ui/react'
import theme from '../theme'

interface Props extends Omit<NumberInputProps, 'isInvalid'> {
    label?: string
    errorMessage?: string
}

export const NumberInput = ({ label, errorMessage, ...rest }: Props) => (
    <Box width="100%">
        {!!label && <Text align="left">{label}</Text>}
        <ChakraNumberInput
            errorBorderColor={theme.colors.danger}
            isInvalid={!!errorMessage}
            {...rest}
        >
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </ChakraNumberInput>
        {!!errorMessage && (
            <Text align="left" fontSize="xs" color={theme.colors.danger}>
                {errorMessage}
            </Text>
        )}
    </Box>
)
