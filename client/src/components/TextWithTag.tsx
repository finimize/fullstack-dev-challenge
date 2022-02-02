import React from 'react'
import { Text, Tag } from '@chakra-ui/react'

type Props = {
    label: string
    valueText: string
}

const TextWithTag = ({ label, valueText }: Props) => (
    <Text align="left">
        {label} <Tag fontWeight={700}>{valueText}</Tag>
    </Text>
)

export default TextWithTag
