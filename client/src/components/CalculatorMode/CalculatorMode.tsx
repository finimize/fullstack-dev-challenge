import React, { FC, useContext } from 'react'
import { Box, Text, useRadio, UseRadioProps, useRadioGroup } from '@chakra-ui/react'
import { AppContext } from '../../store'
import { TOGGLE_MODE, NEXT_PAGE, PREVIOUS_PAGE } from '../../store/types'
import { Card } from '../Card'
import { PageControls } from '../PageControls'

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
                    bg: 'blue600',
                    color: 'white',
                    borderColor: 'white',
                    borderWidth: '2px',
                }}
                _focus={{
                    boxShadow: 'outline',
                }}
                px={5}
                py={3}
                width='150px'
                textAlign='center'
                fontSize='sm'
                fontWeight='700'
            >
                {props.children}
            </Box>
        </Box>
    )
}

export const CalculatorMode: FC = () => {
    const { state, dispatch } = useContext(AppContext)
    const options = ['Simple', 'Advanced']

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'framework',
        defaultValue: state.calculatorMode,
        onChange: (value) => dispatch({ type: TOGGLE_MODE, payload: String(value) }),
    })

    const group = getRootProps()

    const nextPage = () => dispatch({ type: NEXT_PAGE })
    const prevPage = () => dispatch({ type: PREVIOUS_PAGE })
    return (
        <Box>
            <Card>
                <Text
                    fontSize='sm'
                    marginBottom='4'
                    color='blueHeader'
                    fontWeight='700'
                    textAlign='center'
                >
                    Choose how you want to see your savings
                </Text>
                <Text fontSize='xs' marginBottom='4' color='grey5' textAlign='center'>
                    Hi <em>{state.details.firstName.value}</em> Choose one of the options below to
                    to see how much money you can save:
                </Text>
                <Box backgroundColor='blue200' padding='8' margin='0 100px' borderRadius='8px'>
                    <Box {...group} display='flex' justifyContent='space-evenly' width='100%'>
                        {options.map((value) => {
                            const radio = getRadioProps({ value })
                            return (
                                <RadioCard key={value} {...radio}>
                                    {value}
                                </RadioCard>
                            )
                        })}
                    </Box>
                    <Box padding='2'>
                        <Text fontSize='sm' margin='4' color='blue800'>
                            {state.calculatorMode === 'Simple'
                                ? 'This will allow you to see excatly how much your money will grow over time as soon as you make your first deposit.'
                                : 'This advanced setting will let you picture how much you could posssibly make if you were contributing regularly to your account'}
                        </Text>
                    </Box>
                </Box>
            </Card>
            <PageControls prevPage={prevPage} nextPage={nextPage} />
        </Box>
    )
}
