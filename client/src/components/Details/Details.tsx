import React, { FC, useContext } from 'react'
import { Box, Text, Grid, Button } from '@chakra-ui/react'
import { AppContext } from '../../store'
import { UPDATE_DETAILS } from '../../store/types'
import { Card } from '../Card'
import { Input } from '../Input'

// type DetailsProps = {
//     // children: React.ReactNode
// }

export const Details: FC = () => {
    const { state, dispatch } = useContext(AppContext)
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: 'firstName' | 'lastName' | 'email',
    ) =>
        dispatch({
            type: UPDATE_DETAILS,
            field,
            payload: {
                value: e.target.value,
                error: '',
            },
        })
    return (
        <Box>
            <Card>
                <Text fontSize='sm' marginBottom='4' color='blueHeader' fontWeight='700'>
                    Tell us a little about yourself
                </Text>
                <Text fontSize='xs' marginBottom='4' color='grey5'>
                    To help you get the most out of your savings and personalise this expereinces
                    for please provide us with a few details to really help you maximise your
                    savings and help you get to a brighter fanciancial future!
                </Text>
                <Grid gridTemplateColumns={{ base: '1fr', md: 'repeat(2,1fr)' }}>
                    <Input
                        label='First Name'
                        value={state.details.firstName.value}
                        onChange={(e) => handleChange(e, 'firstName')}
                    />
                    <Input label='Last Name' />
                    <Input label='Email' />
                </Grid>
            </Card>
            <Box justifyContent='flex-end' display='flex' padding='8'>
                <Button backgroundColor='primary' color='white'>
                    Next Page
                </Button>
            </Box>
        </Box>
    )
}
