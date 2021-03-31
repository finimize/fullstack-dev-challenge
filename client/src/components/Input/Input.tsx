import React, { FC } from 'react'
import {
    Box,
    Input as ChakraInput,
    FormLabel,
    Text,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'

type InputProps = {
    value?: string
    label: string
    placeholder?: string
    error?: string
    type?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onChangeNumber?: (str: string) => void
    isNumberInput?: boolean
    min?: number
}

export const Input: FC<InputProps> = ({
    label,
    placeholder,
    error,
    onChange,
    value,
    type,
    isNumberInput,
    onChangeNumber,
    min,
}) => {
    const inputProps = {
        placeholder,
        isInvalid: !!error,
        value,
        onChange,
        type,
    }
    return (
        <Box padding='2' maxWidth={isNumberInput ? '72' : '96'} marginBottom='2'>
            <FormLabel fontSize='sm' marginBottom='2' color='grey5' fontWeight='500'>
                {label}
            </FormLabel>
            {isNumberInput ? (
                <NumberInput
                    isInvalid={!!error}
                    onChange={onChangeNumber}
                    value={value}
                    min={min || 0}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            ) : (
                <ChakraInput {...inputProps} />
            )}
            <Text fontSize='sm' marginBottom='2' color='danger' fontWeight='500'>
                {error}
            </Text>
        </Box>
    )
}
