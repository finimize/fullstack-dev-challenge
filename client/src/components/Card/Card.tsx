import React, { FC } from 'react'
import { Box, Text } from '@chakra-ui/react'

type CardProps = {
    children: React.ReactNode
}

export const Card: FC<CardProps> = ({ children }) => (
    <Box margin='8' backgroundColor='white' borderRadius='8px' padding='8'>
        <Text fontSize='sm' marginBottom='4' color='blueHeader' fontWeight='700'>
            Tell us a little about yourself
        </Text>
        <Text fontSize='xs' marginBottom='4' color='grey5'>
            To help you get the most out of your savings and personalise this expereinces for you
            please provide us with a few details to really help you maximise your savings and help
            you get to a brighter fanciancial future!
        </Text>
        {children}
    </Box>
)
