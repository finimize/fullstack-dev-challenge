import React, { FC, useContext } from 'react'
import { Box, Text, Grid } from '@chakra-ui/react'
import { AppContext } from '../../store'
import { UPDATE_DETAILS, VALIDATE_DETAILS, NEXT_PAGE } from '../../store/types'
import { useValidateDetails } from '../Hooks/useValidateDetails'
import { Card } from '../Card'
import { Input } from '../Input'
import { PageControls } from '../PageControls'

// type DetailsProps = {
//     // children: React.ReactNode
// }

export const Details: FC = () => {
    const { state, dispatch } = useContext(AppContext)
    const validationData = useValidateDetails()

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: 'firstName' | 'lastName' | 'email',
    ) => {
        const validateNonEmpty = (str: string): string =>
            str.length === 0 || !str.trim() ? 'Please enter a value' : ''
        const error = validateNonEmpty(e.target.value)
        return dispatch({
            type: UPDATE_DETAILS,
            field,
            payload: {
                value: e.target.value,
                error,
            },
        })
    }

    //     const validateNonEmpty = (str: string):string => str.length === 0 || !str.trim() ? 'Please enter a value': ''
    //     const validateEmail = (email: string) => {
    //     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     return re.test(email.toLowerCase()) ? '': 'Add a valid email';
    // }

    const nextPage = () =>
        validationData.valid
            ? dispatch({ type: NEXT_PAGE })
            : dispatch({
                  type: VALIDATE_DETAILS,
                  payload: {
                      firstName: validationData.error.firstName,
                      lastName: validationData.error.lastName,
                      email: validationData.error.email,
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
                        error={state.details.firstName.error}
                        onChange={(e) => handleChange(e, 'firstName')}
                    />
                    <Input
                        label='Last Name'
                        value={state.details.lastName.value}
                        error={state.details.lastName.error}
                        onChange={(e) => handleChange(e, 'lastName')}
                    />
                    <Input
                        label='Email'
                        value={state.details.email.value}
                        error={state.details.email.error}
                        onChange={(e) => handleChange(e, 'email')}
                    />
                </Grid>
            </Card>
            <PageControls nextPage={nextPage} />
        </Box>
    )
}
