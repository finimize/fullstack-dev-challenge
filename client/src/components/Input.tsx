import React from 'react'
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Text,
} from '@chakra-ui/react'

type Props = {
    defaultValue: string
    onChange: (val: string) => void
    title: string
    testId: string
}

export const Input = ({ defaultValue, onChange, title, testId }: Props) => {
    return (
        <>
            <Text>{title}</Text>
            <NumberInput defaultValue={defaultValue} onChange={onChange}>
                <NumberInputField data-testid={testId} />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
        </>
    )
}
