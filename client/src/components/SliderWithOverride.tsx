// @ts-nocheck
import React, { useState } from 'react'
import { SliderProps, Box, Flex } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import Slider from './Slider'
import NumberInput from './NumberInput'
import TextWithTag from './TextWithTag'

type Props = SliderProps & {
    label?: string
    valueText?: string
}

const SliderWithOverride = ({ label, valueText, ...rest }: Props) => {
    const [override, setOverride] = useState(false)
    const handleClick = () => setOverride(!override)

    return (
        <Box width="100%">
            <Flex justify="space-between" py="2">
                {!!label && !!valueText && <TextWithTag label={label} valueText={valueText} />}
                <EditIcon w={5} h={5} onClick={handleClick} />
            </Flex>
            {!override && <Slider {...rest} />}
            {override && <NumberInput {...rest} />}
        </Box>
    )
}

export default SliderWithOverride
