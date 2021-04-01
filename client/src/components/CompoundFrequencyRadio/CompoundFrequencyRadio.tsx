import React, { FC, useContext } from 'react'
import { Box, useRadio, UseRadioProps, useRadioGroup, FormLabel } from '@chakra-ui/react'
import { AppContext } from '../../store'
import { TOGGLE_COMPOUNDING_FREQUENCY } from '../../store/types'
import { CompoundingFrequency } from '../../store/store.interface'
import { Card } from '../Card'

interface RadioCardProps extends UseRadioProps {
    children: React.ReactNode
}

const RadioCard = (props: RadioCardProps) => {
    const { getInputProps, getCheckboxProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <Box display='flex' as='label'>
            <input {...input} />
            <Box
                {...checkbox}
                cursor='pointer'
                borderWidth='1px'
                borderRadius='md'
                boxShadow='md'
                bg='white'
                _checked={{
                    bg: 'blue500',
                    color: 'white',
                    borderColor: 'white',
                    borderWidth: '2px',
                }}
                _focus={{
                    boxShadow: 'outline',
                }}
                px={2}
                py={2}
                textAlign='center'
                fontSize='sm'
                fontWeight='700'
                margin='2'
                height='fit-content'
            >
                {props.children}
            </Box>
        </Box>
    )
}

export const CompoundFrequencyRadio: FC = () => {
    const { state, dispatch } = useContext(AppContext)
    const options = [
        CompoundingFrequency[CompoundingFrequency.annually],
        CompoundingFrequency[CompoundingFrequency.quarterly],
        CompoundingFrequency[CompoundingFrequency.monthly],
    ]
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'framework',
        defaultValue: CompoundingFrequency[state.calculations.compoundingFrequency],
        onChange: (value: string) =>
            dispatch({ type: TOGGLE_COMPOUNDING_FREQUENCY, payload: value }),
    })

    const group = getRootProps()
    return (
        <Box padding='2' marginBottom='2'>
            <FormLabel fontSize='sm' marginBottom='2' color='text' fontWeight='500'>
                Interest Frequency
            </FormLabel>
            <Box
                {...group}
                display='flex'
                width='100%'
                backgroundColor='grey3'
                borderRadius='8px'
                justifyContent='space-evenly'
                alignItems='center'
                height='72px'
            >
                {options.map((value) => {
                    const radio = getRadioProps({ value })
                    return (
                        <RadioCard key={value} {...radio}>
                            {value}
                        </RadioCard>
                    )
                })}
            </Box>
        </Box>
    )
}
