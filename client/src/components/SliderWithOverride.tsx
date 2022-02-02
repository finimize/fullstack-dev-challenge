import React, { useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import Slider from './Slider'
import NumberInput from './NumberInput'
import TextWithTag from './TextWithTag'

type Props = {
    value: number
    label?: string
    valueText?: string
    name: string
    min: number
    max: number
    step: number
    onChange: (newValue: number | string) => void
}

const SliderWithOverride = ({ value, label, valueText, name, min, max, step, onChange }: Props) => {
    const [override, setOverride] = useState(false)
    const handleClick = () => setOverride(!override)

    return (
        <Box width="100%">
            <Flex justify="space-between" py="2">
                {!!label && !!valueText && <TextWithTag label={label} valueText={valueText} />}
                <EditIcon w={5} h={5} onClick={handleClick} />
            </Flex>
            {!override && (
                <Slider
                    value={value}
                    name={name}
                    min={min}
                    max={max}
                    step={step}
                    onChange={onChange}
                />
            )}
            {override && (
                <NumberInput value={value} min={min} max={max} step={step} onChange={onChange} />
            )}
        </Box>
    )
}

export default SliderWithOverride
