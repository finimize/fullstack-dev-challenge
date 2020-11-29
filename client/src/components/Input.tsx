import React from 'react'
import { Input as ChakraInput, InputProps, Text, Box } from '@chakra-ui/react'
import theme from '../theme'

type Props = InputProps & {
    label?: string
}

/*

    Used to collect user text input

    Can be connected to state variables if required: https://chakra-ui.com/docs/form/input#controlled-input

*/

const Input = ({ label, ...rest }: Props) => (
    <Box width="100%">
        {!!label && <Text align="left">{label}</Text>}
        <ChakraInput errorBorderColor={theme.colors.danger} {...rest} />
    </Box>
)

export default Input
