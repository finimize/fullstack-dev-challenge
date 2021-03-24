import React, { FC } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { StepButton } from '../StepButton'

export const Header: FC = () => (
    <Box backgroundColor='white' padding='6'>
        <Box display='flex' width='100%' justifyContent='space-evenly' padding='6'>
            {Array.from({ length: 3 }).map((e, i) => (
                <StepButton key={i} label={i} selected={false} />
            ))}
        </Box>
        <Text fontSize='xxl' marginLeft='8' marginBottom='4' color='blueHeader' fontWeight='500'>
            Let&apos;s start the savings...
        </Text>
    </Box>
)
