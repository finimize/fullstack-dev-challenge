// @ts-nocheck
import React, { useState } from 'react'
import { SliderProps, Text, Box, Flex } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import Slider from './Slider'
import NumberInput from './NumberInput'

type Props = SliderProps & {
    label?: string
}

const SliderWithOverride = ({ label, ...rest }: Props) => {
    const [override, setOverride] = useState(false)
    const handleClick = () => setOverride(!override)

    return (
        <Box width="100%">
            <Flex justify="space-between" py="2">
                {!!label && <Text align="left">{label}</Text>}
                <EditIcon w={5} h={5} onClick={handleClick} />
            </Flex>
            {!override && <Slider {...rest} />}
            {override && <NumberInput {...rest} />}
        </Box>
    )
}

export default SliderWithOverride
