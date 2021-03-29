import React, { FC } from 'react'
import { Box, Text } from '@chakra-ui/react'

type CardProps = {
    children: React.ReactNode
}

export const Card: FC<CardProps> = ({ children }) => (
    <Box margin='8' backgroundColor='white' borderRadius='8px' padding='8'>
        {children}
    </Box>
)
