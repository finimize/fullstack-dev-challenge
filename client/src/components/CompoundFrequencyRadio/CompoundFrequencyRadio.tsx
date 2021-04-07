import React, { FC, useContext } from 'react'
import { Box, useRadio, UseRadioProps, useRadioGroup, FormLabel } from '@chakra-ui/react'
import { AppContext } from '../../store'
import { TOGGLE_COMPOUNDING_FREQUENCY } from '../../store/types'
import { CompoundingFrequency } from '../../store/store.interface'

interface RadioCardProps extends UseRadioProps {
    children: React.ReactNode
}

export const RadioCard: FC<RadioCardProps> = (props) => {
    const { getInputProps, getCheckboxProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getCheckboxProps()
    const { value } = props
    return (
        <Box display='grid' as='label' justifyContent='center'>
            <input {...input} data-testid={`cfr-${value as string}`} />
            <Box
                {...checkbox}
                cursor='pointer'
                borderWidth='1px'
                borderRadius='md'
                boxShadow='md'
                width='fit-content'
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
                fontSize='xs'
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
                display='grid'
                py='9px'
                height='auto'
                width='100%'
                backgroundColor='grey3'
                borderRadius='8px'
                justifyContent='space-evenly'
                alignItems='center'
                // height='72px'
                gridTemplateColumns={{
                    base: '1fr',
                    sm: 'repeat(3,1fr)',
                }}
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
