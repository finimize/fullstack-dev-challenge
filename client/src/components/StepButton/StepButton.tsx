import React, { FC } from 'react'
import { Button } from '@chakra-ui/react'
import { StepButtonInterface } from './StepButton.interface'

export const StepButton: FC<StepButtonInterface> = ({ selected, label }) => (
    <Button
        borderRadius='50%'
        height='40px'
        width='40px'
        border='4px'
        borderColor={selected ? 'blueHeader' : 'primary'}
        color='blueHeader'
        fontSize='lg'
        cursor='pointer'
        margin='10px'
        _hover={{
            borderColor: 'blueHeader',
            transform: `scale(1.1)`,
        }}
    >
        {label}
    </Button>
)
